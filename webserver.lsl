integer DBG = TRUE; // debugging switch

string srv_url;

string cfg_id = ""; // config webpage session id
integer last_cfg_time; // last activity from config webpage

string html = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<!DOCTYPE html PUBLIC \"XHTML 1.0 Strict//EN\" \"DTD/xhtml1-strict.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">
<head></head><body></body>
<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js\"></script>
<script src=\"https://www.youtube.com/iframe_api\"></script>
<script src=\"https://w.soundcloud.com/player/api.js\"></script>
<script src=\"https://longfluffdragon.github.io/LSL-SoundCloud-Webserver/musicplayer-injector.js?version=#VER\"></script>
<script src=\"https://longfluffdragon.github.io/LSL-SoundCloud-Webserver/musicplayer-main.js?version=#VER\"></script></html>";

// current playing track data
string current_playlist;
string current_track_id; // hash ID of current/next playing track
string current_track_uri; // uri of upcoming/currently playing track
string current_track_title;
string future_track_id; // hash ID of current/next playing track
string future_track_uri; // uri of upcoming/currently playing track
string future_track_title;
integer future_track_duration;
integer start_time;
integer end_time;
string cache_track_reply; // cached reply to track requests for the current track
list manual_queue;// = ["7f3f0977bbe256f4", "7f3f0977bbe256f4", "7f3f0977bbe256f4"];
//string track_waveform; // encoded waveform binary data for active soundcloud track

integer track_interval = 15; // seconds between finishing and starting tracks

integer player_state; // -1=off, 0=inactive, 1=active
integer is_anyone_home; // tracks if there are potential listeners in the parcel or sim
integer next_url_try = 0x7FFFFFFF; // time of next attempt at getting a URL
integer next_cleanup;

// client/network stuff
//list sessions; // strides of [str session, str pollId, int time, string track]
//list pending_update; // session request ids needing update for state change
//integer batchsz = 16;
//integer polltm = 60; // requests are timed out by the SL server in 25, but consider a client disconnected if a minute passes without polling

// playlist data
list playlists;// = ["Default"];
list playlist_track_keys; // URIs/LSD keys for current playlist
float playlist_randomness;
integer playlist_rnd_range; // range of the playlist that tracks can be selected from, resets at 0
//integer playlist_progress;

string saving_playlist; // name of current playlist data being received to save to LSD
list playlist_track_hash;

list reserved_lsdk = ["playlists", "current_playlist", "admins"];

// config/user data
list admins; // strides of [str key, str name, int accesslevel]
integer menu_page = 0;

// admin config request temp data
list rq_key_name; // [http request handle, key dataserver request, name dataserver request]

// no touch
integer cfg_channel = 0x6392B8E5;
integer media_link = LINK_THIS;
integer media_face = 3;

string sep = " "; // Unicode Character 8200 (U+2008) 0xE2 0x80 0x88, separator for serialized data

string OOS = "Error: no storage remaining to write playlist\n";
string ERR400 = "Invalid or unknown request";

float tms;
integer trqh;

/*integer Millisec()
{
    string Stamp = llGetTimestamp();
    return (integer)llGetSubString(Stamp, 8, 9) * 86400000 + // Days
        (integer)llGetSubString(Stamp, 11, 12) * 3600000 + // Hours
        (integer)llGetSubString(Stamp, 14, 15) * 60000 + // Minutes
        llRound(((float)llGetSubString(Stamp, 17, -2) * 1000.0)) // Seconds.Milliseconds
        - 617316353; // Offset to fit between [-617316353,2147483547]
}*/

string ToPadMinSec(integer t)
{
    integer m = t/60;
    integer s = t%60;
    string r = (string) m + ":";
    if(m < 10)
        r = "0" + r;
    if(s < 10)
        r += "0";
    return r += (string)s;
}

string StoreCheck(integer rembytes)
{
    string pcnt = (string)((float)rembytes * 0.000762939453125); // 100 / 128kb
    integer i = llSubStringIndex(pcnt, ".");
    return "Remaining storage: " + llGetSubString(pcnt, 0, i+1)+ "%";
}

RefreshURL()
{
    llReleaseURL(srv_url);
    srv_url = llRequestURL();
}

SetMedia()
{
    end_time = 0; // force a track refresh on next request
    llSetLinkMedia(media_link, media_face, [ PRIM_MEDIA_CURRENT_URL, ""]);
    
    if( ~player_state && is_anyone_home )
    {
        llSay(0, "Music player turning on..");
        llSetLinkMedia(media_link, media_face, [
            PRIM_MEDIA_AUTO_PLAY, TRUE,
            PRIM_MEDIA_HEIGHT_PIXELS, 1024,
            PRIM_MEDIA_WIDTH_PIXELS, 1024,
            PRIM_MEDIA_CURRENT_URL, srv_url
        ]);
        
    }
    else
        llSay(0, "Music player turning off");
}

LoadPlaylists()
{
    playlists = llParseString2List(llLinksetDataRead(llList2String(reserved_lsdk, 0)), [sep], []); // get "playlists"
    current_playlist = llLinksetDataRead(llList2String(reserved_lsdk, 1)); // get "current_playlist"
    if(DBG)llOwnerSay("saved playlist = " + current_playlist);
    
    if(!llGetListLength(playlists))
    {
        playlists = ["Default"];
        current_playlist = "Default";
    }
    else
    {
        if(current_playlist == "" || !~ llListFindList(playlists, [current_playlist]))
        current_playlist = llList2String(playlists, 0);
        ReadCurrentPlaylist();
    }
    CleanupLinksetData();
}

WritePlaylists()
{
    llLinksetDataWrite(llList2String(reserved_lsdk, 0), llDumpList2String(playlists, sep));
}

ReadCurrentPlaylist()
{
    playlist_track_keys = llParseString2List(llLinksetDataRead(current_playlist), [sep], []);
    playlist_randomness = llList2Float(playlist_track_keys, 0);
    playlist_track_keys = llDeleteSubList(playlist_track_keys, 0, 0);
}

ChangeTrack()
{
    integer t = llGetUnixTime();
    
    if( (t > end_time + 600))
    {
        if(DBG) llOwnerSay("Resetting tracks");
        ReadCurrentPlaylist();
    }
    if(future_track_id == "")
        ShuffleTracks();
        
    current_track_id = future_track_id;
    current_track_uri = future_track_uri;
    current_track_title = future_track_title;
    start_time = t + track_interval;
    end_time = start_time + future_track_duration;
    
    ShuffleTracks();
    cache_track_reply = llDumpList2String(
    [
        current_track_uri,
        start_time,
        future_track_uri,
        end_time + track_interval,
        current_track_title,
        future_track_title
    ], sep);
    /*cache_track_reply = current_track_uri + sep + (string)start_time + sep + 
                        future_track_uri + sep + (string)(end_time + track_interval) + sep +
                        current_track_title + sep + future_track_title; */
    
    if(DBG) llOwnerSay("Tracks changed; current=" + current_track_uri + ", future=" + future_track_uri); 
    llSetText("FreeMem=" + (string)llGetFreeMemory(), <1,1,1>, 1.0);
}

ShuffleTracks() // Selects the next track, sets it to future_track_ variables, shuffles track to end of playlist
{
    integer next;
    
    if(playlist_rnd_range < 1) // reset after playing all tracks
        playlist_rnd_range = llGetListLength(playlist_track_keys)-1;
    
    if(manual_queue) // are there any tracks queued in advance by user?
    {
        future_track_id = llList2String(manual_queue, 0);
        next = llListFindList(playlist_track_keys, llList2List(manual_queue, 0, 0)); // check index to shuffle this track if in current playlist
        if(DBG) llOwnerSay("Got next track from manual queue " + llList2CSV(manual_queue));
        manual_queue = llDeleteSubList(manual_queue, 0, 0);
    }
    else // use random selection
    {
        integer range = llRound((llGetListLength(playlist_track_keys) - 2) * playlist_randomness); // never select the last entry to avoid repeating tracks
        if(range > playlist_rnd_range)
            range = playlist_rnd_range;
        next = llRound(llFrand(range));
        future_track_id = llList2String(playlist_track_keys, next);
        if(DBG) llOwnerSay("Got next track from shuffle");
    }
    
    list track_data = llParseStringKeepNulls(llLinksetDataRead(future_track_id), [sep], []);
    future_track_uri = llList2String(track_data, 0);
    future_track_duration = llList2Integer(track_data, 2);
    
    if( ~next ) // shuffle track to the end if in current playlist
        playlist_track_keys = llDeleteSubList(playlist_track_keys, next, next) + [future_track_id];
        
    if(DBG) llOwnerSay("Post-shuffle: " + llList2CSV(playlist_track_keys));
    if(DBG) llOwnerSay("Future Track: " + future_track_uri);
    
    --playlist_rnd_range;
}

ChangePlaylist(integer pli)
{
    current_playlist = llList2String(playlists, pli);
    llLinksetDataWrite(llList2String(reserved_lsdk, 1), current_playlist); // save current playlist
    if(DBG) llOwnerSay("DEBUG set playlist to " + current_playlist);
    SetMedia();
}

CleanupLinksetData()
{
    list keys = llLinksetDataListKeys(0, -1);
    integer i;
    
    integer n = llGetListLength(reserved_lsdk);
    while( ~--n ) // remove all keys in reserved_lsdk
    {
        i = llListFindList(keys, llList2List(reserved_lsdk, n, n));
        if(~i)
            keys = llDeleteSubList(keys, i, i);
    }
    
    n = llGetListLength(playlists);
    while( ~--n ) // remove all playlist keys
    {
        string pl = llList2String(playlists, n);
        i = llListFindList(keys, [pl]);
        if(~i)
        {
            //llOwnerSay("Found playlist key " + pl);
            keys = llDeleteSubList(keys, i, i);
        
            list pl_track_keys = llDeleteSubList(llParseString2List(llLinksetDataRead(pl), [sep], []), 0, 0);
            integer n2 = llGetListLength(pl_track_keys);
            while( ~--n2 ) // remove all track keys that feature in this playlist
            {
                string tr = llList2String(pl_track_keys, n2);
                i = llListFindList(keys, [tr]);
                if(~i)
                {
                    //llOwnerSay("Found track key " + tr);
                    keys = llDeleteSubList(keys, i, i);
                }
            }
        }
    }
    // remainder should be orphaned tracks no longer used in a playlist + weird garbage data from who knows what
    if(DBG)llOwnerSay("Stray Keys: " + llList2CSV(keys));
    
    n = llGetListLength(keys);
    while( ~--n )
    {
        llLinksetDataDelete(llList2String(keys, n));
    }
    
}

BuildMenu(string agent, integer page, integer mode, integer channel)
{
    integer i = llListFindList(admins, [agent]);
    integer admin_lv = llList2Integer(admins, i+2);
    if(! admin_lv)
        return;
        
    list menu;
    string title = "Controls";
    
    if(mode == 0)
    {
        menu += ["Close Menu", "Music On", "Music Off", "Playlists"];
        if(admin_lv > 1)
            menu += ["Setup", "Print"];
    }
    
    else if(mode == 1)
    {
        title = "Playlist Selection\nCurrent: "+current_playlist;
        if(llGetListLength(playlists) > 9)
            menu += ["<<", "Back", ">>"];
        else
            menu += ["Back"];
        menu += llList2List(playlists, page*9, page*9+9);
    }
    
    llDialog(agent, "Streaming Player "+title, menu, channel);
}

AgentLookupReply()
{
    llHTTPResponse(llList2Key(rq_key_name, 0), 200, llDumpList2String(llList2List(rq_key_name, 1, 2), sep));
    rq_key_name = [];
}

default
{
    state_entry()
    {
        llOwnerSay((string)llOrd(sep,0));
        RefreshURL();
        admins = llParseString2List(llLinksetDataRead("admins"), [sep], []);
        llListen(cfg_channel, "", "", "");
        LoadPlaylists();
        llSetTimerEvent(5);
        
        if( !~llListFindList(admins, [(string)llGetOwner()]) )
            admins += [(string)llGetOwner(), llGetUsername(llGetOwner()), 2];
            
        //llMessageLinked(LINK_THIS, 0, "tr"+sep+"p"+sep+"5786d44d9d40fe55"+sep+"fake title lol", NULL_KEY);
    }
    
    link_message(integer ln, integer v, string m, key k)
    {
        list args = llParseStringKeepNulls(m, [sep], []);
        string op = llList2String(args, 0);
        string a1 = llList2String(args, 1);
        string a2 = llList2String(args, 2);
        string a3 = llList2String(args, 3);
        
        if( op == "tr" )
        {
            if( llLinksetDataRead(a2) != "" )
            {
                llSay(0, "Queueing " + a3);
                manual_queue += [a2];
                if( a1 == "p" ) // play immediately; 'track/p/idnumber/title'
                    SetMedia();
            }
        }
        else if( op == "pl" )
        {
            integer i = llListFindList(playlists, [a1]);
            if( ~i )
                ChangePlaylist(i);
        }
    }

    touch_start(integer n)
    {
        if( ~ llListFindList(admins, [(string)llDetectedKey(0)]) )
            BuildMenu((string)llDetectedKey(0), -1, 0, cfg_channel);

    }
    
    listen(integer c, string n, key k, string m)
    {
        integer i = llListFindList(admins, [(string)k]);
        integer admin_lv = llList2Integer(admins, i+2);
        if(DBG) llOwnerSay("Admin level: "+(string)admin_lv);
        integer remenu = TRUE;
        integer page = menu_page; // temp global tracker
        integer mode;
       
        if( m == "Setup" && admin_lv > 1 )
        {
            cfg_id = llGetSubString(llGenerateKey(),0,7);
            last_cfg_time = llGetUnixTime();
            string desc = "Open streaming player web configuration page: ";
            string url = srv_url+"/cfg/"+cfg_id;
            llLoadURL(k, desc, url);
            llRegionSayTo(k, 0, desc+url);
            remenu = FALSE;
        }
        else if( m == "Print" && admin_lv > 0 )
        {
            integer pl = llGetListLength(playlists);
            while( ~--pl )
            {
                string pln = llList2String(playlists, pl);
                list tracks = llParseString2List(llLinksetDataRead(pln), [sep], []);
                llOwnerSay("Playlist: " + pln);
                integer tl = llGetListLength(tracks);
                integer n=1;
                integer tt; // total time of playlist
                for(; n < tl; ++n)
                {
                    list track_data = llParseStringKeepNulls(llLinksetDataRead(llList2String(tracks, n)), [sep], []);
                    integer tl = llList2Integer(track_data, 2);
                    tt += tl;
                    llOwnerSay("  [" + ToPadMinSec(tl) + "] " + llList2String(track_data, 1) + "  " + llList2String(track_data, 0));
                }
                llOwnerSay("Total: " + ToPadMinSec(tt) + ", " + StoreCheck(llLinksetDataAvailable()));
                
            }
        }
        else if(m == "Music Off")
        {
            player_state = -1;
            SetMedia();
        }
        else if(m == "Music On")
        {
            player_state = 0;
            SetMedia();
        }
        else if(m == "Playlists")
        {
            mode = 1;
            page=0;
        }
        else if(m == ">>")
        {
            mode = 1;
            ++page;
        }
        else if(m == "<<")
        {
            mode = 1;
            if(page)
                --page;
        }            
        else if(m == "Back")
        {
            page = -1;
        }
        else if( ~(i = llListFindList(playlists, [m])) ) // changing active playlist
        {
            ChangePlaylist(i);
            page = -1;
        }
        else
            remenu = FALSE;
        
        if(remenu)
            BuildMenu((string)k, page, mode, cfg_channel);
    }

    changed(integer c)
    {
        if( c & (CHANGED_REGION_START|CHANGED_REGION) )
            RefreshURL();
    }

    http_request(key rqid, string method, string body)
    {
        string header = llGetHTTPHeader(rqid, "x-query-string");
        string rawpath =  llGetHTTPHeader(rqid, "x-path-info");
        list path =  llParseString2List(rawpath, ["/"], []);
        string ip = llGetHTTPHeader(rqid, "x-remote-ip");
        string ua = llGetHTTPHeader(rqid, "user-agent");
        if(DBG) llOwnerSay("received " + method + " from ip=" + ip + " header=" + header + " path=" + llDumpList2String(path, "/") + " body=" + llUnescapeURL(body));

        string rndver = (string)((integer)llFrand(0xFFFFFFF)); // github caching bypass hack, remove in final build
        
        string p0 = llList2String(path, 0);
       
        if( (string)rqid == srv_url ) // URL request
        {
            if( method != URL_REQUEST_GRANTED )
            {
                next_url_try = llGetUnixTime()+120;
                srv_url = "err";
                llSetText("Error: server URL unavailable from simulator", <1,0,0>, 1.0);
            }
            else
            {
                llOwnerSay("Audio webserver operational at " + body + ", click to open setup");
                next_url_try = 0x7FFFFFFF;
                srv_url = body;
                llSetText("", ZERO_VECTOR, 0.0);
                
                SetMedia();
                return;
            }
        }
        else if( header == "" )
        {       
            llSetContentType(rqid, CONTENT_TYPE_XHTML);
            //if(DBG) llOwnerSay("\nPage request from " + ip + "\nuser-agent=" + llGetHTTPHeader(rqid, "user-agent") + "\nheader=" + header + "\npath=" + rawpath);
            string p1 = llList2String(path, 1);
            string p2 = llList2String(path, 2);
            string p3 = llList2String(path, 3);
            string p4 = llList2String(path, 4);

            if( !llGetListLength(path) && method == "GET" )
            {
                if( player_state > -1 && is_anyone_home )
                    //llHTTPResponse(rqid, 200, llDumpList2String(llParseStringKeepNulls(html, ["#VER"], []), rndver ));
                    llHTTPResponse(rqid, 200, llReplaceSubString(html, "#VER", rndver, 0));
                else
                    llHTTPResponse(rqid, 503, "Media server is currently turned off or nonfunctional");
                
                if(DBG) llOwnerSay("Load request from " + ip + " " + ua);
                //llHTTPResponse(rqid, 200, html_init + "player" + html_init_tail);
            }

            else if( cfg_id != "" && p1 == cfg_id ) // config page is being displayed
            {
                if(DBG) llOwnerSay("CfgPage");
                if( llGetUnixTime() < last_cfg_time + 3600 )
                {
                    last_cfg_time = llGetUnixTime();
                }
                else
                {
                    llHTTPResponse(rqid, 403, "Config page has expired"); 
                    return;
                }
                
                if( llGetListLength(path) == 2 )
                {
                    llOwnerSay("Sending config webpage");
                    //llHTTPResponse(rqid, 200, llDumpList2String(llParseStringKeepNulls(html, ["#VER"], []), rndver ));
                    llHTTPResponse(rqid, 200, llReplaceSubString(html, "#VER", rndver, 0));
                    
                   // llHTTPResponse(rqid, 200, html_init + "config" + html_init_tail);
                    return;
                }
               
                if( p2 == "save" )
                {
                    if( p3 == "start" ) // start saving a playlist
                    {
                        saving_playlist = p4;
                        if( saving_playlist == "" )
                        {
                            if(DBG) llOwnerSay("Error: playlist name is null");
                            return;
                        }
                        
                        if(DBG) llOwnerSay("Saving playlist " + saving_playlist);
                        playlist_track_hash = [body]; // shuffle randomness value
                        llHTTPResponse(rqid, 200, "NXT");
                        CleanupLinksetData();
                    }
                    else if( p3 == saving_playlist )
                    {
                        if( p4 == "uri" ) // save a track to playlist
                        {
                            header = "NXT";
                            list track = llParseStringKeepNulls(body, [sep], []); 
                            string hash = llGetSubString(llComputeHash(llList2String(track, 0), "sha256"),0,15);
                            playlist_track_hash += [hash];
                            integer rem = llLinksetDataAvailable();
                            
                            if( rem < (llStringLength(body) * 2 + 64 + llGetListLength(playlist_track_hash) * 32) ) // estimate size requirements + 32 extra bytes
                            {
                                header = OOS + StoreCheck(rem);
                            }
                            else
                                llLinksetDataWrite(hash, body);
                                
                            if(DBG) llOwnerSay("Saved " + llList2String(track, 0) + " with ID " + hash);
                            
                            llHTTPResponse(rqid, 200, header); // sus variable reuse
                        }
                        else if( p4 == "end" )
                        {
                            header = "END";
                            string dpl =  llDumpList2String(playlist_track_hash, sep);
                            llLinksetDataWrite(saving_playlist, dpl);
                            llOwnerSay("Saved playlist " + saving_playlist);
                            
                            if( !~llListFindList(playlists, [saving_playlist]) )
                            {
                                playlists += [saving_playlist];
                                if(saving_playlist == current_playlist)
                                    SetMedia();
                            }
                            integer rem = llLinksetDataAvailable();
                            if(rem < (32 + llGetListLength(playlist_track_hash) * 32)) // estimate size requirements + 32 extra bytes
                            {
                                header = OOS + StoreCheck(rem);
                            }
                            else
                            {
                                WritePlaylists();
                                header += sep + StoreCheck(rem);
                            }
                            
                            if(DBG) llOwnerSay("got final entry, confirming end");
                            llHTTPResponse(rqid, 200, header);
                        }
                    }
                    else
                    {
                        llHTTPResponse(rqid, 400, "Not a valid playlist save operation at this time");
                    }
                }
                
                else if( p2 == "admins" )
                {
                    if( p3 == "lookup" )
                    {
                        rq_key_name = [rqid];
                        string get;
                        integer await;
                        if( llStringLength(p4) == 36 && llSubStringIndex(p4, "-") == 8 )
                        {
                            rq_key_name += [p4]; // uuid
                            get = llGetUsername(p4);
                            if( get )
                            {
                                rq_key_name += [get]; // name retrieved locally
                            }
                            else
                            {
                                await = TRUE;
                                rq_key_name += [llRequestUsername(p4)]; // request name from server
                            }
                        }
                        else
                        {
                            get = llName2Key(p4);
                            if( get == NULL_KEY )
                            {
                                await = TRUE;
                                rq_key_name += [llRequestUserKey(p4)]; // uuid retrieved locally
                            }
                            else
                            {
                                rq_key_name += [get]; // request uuid from server
                            }
                            rq_key_name += [p4]; // name
                        }
                        if( !await )
                            AgentLookupReply();
                    }
                    else if( p3 == "get" )
                    {
                        llHTTPResponse(rqid, 200, llDumpList2String(admins, sep));
                    }
                    else if( p3 == "save" )
                    {
                        list agent = llParseStringKeepNulls(body, [sep], []);
                        integer i = llListFindList(admins, llList2List(agent, 0, 0));
                        
                        if( llList2Key(agent, 0) != llGetOwner())
                        {
                            if( p4 == "del" )
                            {
                                if( ~i )
                                    admins = llDeleteSubList(admins, i, i+2);
                            } 
                            else
                            {
                                if( ~i )
                                    admins = llListReplaceList(admins, agent, i, i+2);
                                else
                                    admins += agent;
                            }
                        
                            llLinksetDataWrite("admins",llDumpList2String(admins, sep));
                            if(DBG)llOwnerSay("Admins Saved: " + llList2CSV(admins));
                        }
                        llHTTPResponse(rqid, 200, "ok");
                    }
                }
                
                else if( p2 == "playlists" ) // load list of playlists
                {
                    llHTTPResponse(rqid, 200, llDumpList2String(playlists, sep));
                }
                
                else if( p2 == "playlist" ) // load a single playlist
                {
                    string gpl = llLinksetDataRead(llList2String(path, 3));
                    list playlist_track_keys;
                    if( gpl != "" )
                    {
                        playlist_track_keys = llParseStringKeepNulls(gpl, [sep], []);
                        integer n = llGetListLength(playlist_track_keys);
                        while( --n ) // ignore index 0, since it is the shuffle randomness float
                            //playlist_track_keys = llListReplaceList(playlist_track_keys, llList2List(llParseString2List(llLinksetDataRead(llList2String(playlist_track_keys, n)), [sep], []), 0, 0), n, n);
                            playlist_track_keys = llListReplaceList(playlist_track_keys, llList2List(llParseString2List(llLinksetDataRead(llList2String(playlist_track_keys, n)), [sep], []), 0, 1), n, n);
                        if(DBG) llOwnerSay("playlist = " + llList2CSV(playlist_track_keys));
                    }
                    llHTTPResponse(rqid, 200, llDumpList2String(playlist_track_keys, sep));
                }
                
                else if( p2 == "ren" )
                {
                    string status = "Error: playlist '" + p3 + "' does not exist";
                    string name = "err";
                    integer i = llListFindList(playlists, [p3]);
                    
                    if( ~llListFindList(playlists, [p4]) )
                    {
                        status = "Error: playlist '" + p4 + "' already exists, cannot rename '" + p3 + "'";
                    }
                    else if( ~i )
                    {
                        playlists = llListReplaceList(playlists, [p4], i, i);
                        string pl = llLinksetDataRead(p3);
                        llLinksetDataDelete(p3);
                        llLinksetDataWrite(p4, pl);
                        WritePlaylists();
                        status = "Renamed playlist '" + p3 + "' to '" + p4 + "'";
                        name = p4;
                    }
                    
                    llOwnerSay(status);
                    LoadPlaylists();
                    llHTTPResponse(rqid, 200, name+sep+status);
                }
                
                else if( p2 == "del" )
                {
                    //string pl = llList2String(path, 3);
                    string status = "Error: playlist '" + p3 + "' does not exist";
                    integer i = llListFindList(playlists, [p3]);
                    if(~i)
                    {
                        playlists = llDeleteSubList(playlists, i, i); // redundant with reload
                        WritePlaylists();
                        llLinksetDataDelete(p3);
                        status = "Deleted playlist " + p3;
                    }
                    
                    llOwnerSay(status);
                    LoadPlaylists();
                    llHTTPResponse(rqid, 200, status);
                }
                else
                    llHTTPResponse(rqid, 400, ERR400);
            }
            
            else if(p0  == "next-track")
            {
                //integer t = llGetUnixTime();
                if( llGetUnixTime() > end_time )
                    ChangeTrack();
                
                if(DBG) llOwnerSay("Sending track "+ cache_track_reply + " to " + ip);
                llHTTPResponse(rqid, 200, cache_track_reply);
            }
            else
            {
                //if(DBG) llOwnerSay("Unrecognized request!");
                llHTTPResponse(rqid, 400, ERR400);
            }
        }
        /*
        else
        {
            if(DBG) llOwnerSay("Header is sus");
        }
        */
        /*
        gt = Millisec() - gt;
        tms += gt;
        ++trqh;
        if(DBG) llOwnerSay("Complete in " + (string)(gt) + "ms, avg=" + (string)(tms/trqh));
        */

    }

    timer()
    {
        //llSetTimerEvent(0);
        //srv_url = llRequestURL();
        
        integer t = llGetUnixTime();
        
        if( srv_url == "err" && next_url_try < t )
        {
            next_url_try = llGetUnixTime()+300;
            srv_url = llRequestURL();
        }
        
        list agents = llGetAgentList(AGENT_LIST_PARCEL, []);
        integer an = llGetListLength(agents);
        if( is_anyone_home && !an)
        {
            is_anyone_home = FALSE;
            SetMedia();
        }
        else if( !is_anyone_home && an)
        {
            is_anyone_home = TRUE;
            SetMedia();
        }
    }
    
    dataserver(key rqid, string data)
    {
        integer i = llListFindList(rq_key_name, [rqid]);
        if( ~i )
        {
            llOwnerSay("dataserver got missing agent data: " + data);
            rq_key_name = llListReplaceList(rq_key_name, [data], i, i);
            AgentLookupReply();
        }
    }
}






