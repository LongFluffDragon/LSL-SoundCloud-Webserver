integer DBG = TRUE; // debugging switch

string srv_url;

string cfg_id = ""; // config webpage session id
integer last_cfg_time; // last activity from config webpage

string html_init = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<!DOCTYPE html 
     PUBLIC \"XHTML 1.0 Strict//EN\"
    \"DTD/xhtml1-strict.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">
  <head>
  </head>
  <body></body>
   <script>var page_type = '";

string html_init_tail = "';</script>
<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js\"></script>
<script src=\"https://www.youtube.com/iframe_api\"></script>
<script src=\"https://w.soundcloud.com/player/api.js\"></script>
<script src=\"https://longfluffdragon.github.io/LSL-SoundCloud-Webserver/musicplayer-injector.js?version=#VER\"></script>
<script src=\"https://longfluffdragon.github.io/LSL-SoundCloud-Webserver/musicplayer-main.js?version=#VER\"></script></html>";

// current playing track data
string current_playlist;
string current_track_id; // hash ID of current/next playing track
string current_track_uri; // uri of upcoming/currently playing track
string future_track_id; // hash ID of current/next playing track
string future_track_uri; // uri of upcoming/currently playing track
integer future_track_duration;
integer start_time;
integer end_time;
string cache_track_reply; // cached reply to track requests for the current track
//string track_waveform; // encoded waveform binary data for active soundcloud track

integer track_interval = 15; // seconds between finishing and starting tracks

integer player_state; // -1=off, 0=inactive, 1=active
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
float playlist_randomness = .2;
integer playlist_rnd_range; // range of the playlist that tracks can be selected from, resets at 0
//integer playlist_progress;

string saving_playlist; // name of current playlist data being received to save to LSD
list playlist_track_hash;

list reserved_lsdk = ["playlists", "current_playlist"];

// config/user data
list admins; // strides of [str key, int accesslevel, str name]
integer menu_page = 0;
integer cfg_channel = 0x6392B8E5;

string OOS = "Error: no storage remaining to write playlist\n";

float tms;
integer trqh;

integer Millisec()
{
    string Stamp = llGetTimestamp();
    return (integer)llGetSubString(Stamp, 8, 9) * 86400000 + // Days
        (integer)llGetSubString(Stamp, 11, 12) * 3600000 + // Hours
        (integer)llGetSubString(Stamp, 14, 15) * 60000 + // Minutes
        llRound(((float)llGetSubString(Stamp, 17, -2) * 1000.0)) // Seconds.Milliseconds
        - 617316353; // Offset to fit between [-617316353,2147483547]
}

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
    llSetPrimMediaParams(3, [ PRIM_MEDIA_CURRENT_URL, ""]);
    if(~player_state)
    {
        llSetPrimMediaParams(3, [
            PRIM_MEDIA_AUTO_PLAY, TRUE,
            PRIM_MEDIA_HEIGHT_PIXELS, 1024,
            PRIM_MEDIA_WIDTH_PIXELS, 1024,
            PRIM_MEDIA_CURRENT_URL, srv_url
        ]);
    }
}
/*
list parseTrackData(string body)
{
    integer pos = 0;
    list data;

    integer title_len = llOrd(body, pos) - 255;
    data += llGetSubString(body, pos + 1, pos + title_len);
    pos += title_len + 1;
    data += llOrd(body, pos) - 255;
    pos++;
    integer waveform_len =  llOrd(body, pos) - 255;
    data += llGetSubString(body, pos + 1, pos + waveform_len);

    return data;
}
*/

LoadPlaylists()
{
    playlists = llParseString2List(llLinksetDataRead(llList2String(reserved_lsdk, 0)), ["#|"], []); // get "playlists"
    current_playlist = llLinksetDataRead(llList2String(reserved_lsdk, 1)); // get "current_playlist"
    if(DBG)llOwnerSay("saved playlist = " + current_playlist);
    
    if(!llGetListLength(playlists))
    {
        playlists = ["Default"];
        current_playlist = "Default";
        //current_playlist_track_keys = [];
        //llLinksetDataWrite("");
    }
    
    if(current_playlist == "" || !~ llListFindList(playlists, [current_playlist]))
        current_playlist = llList2String(playlists, 0);
        
    ReadCurrentPlaylist();
    CleanupLinksetData();
}

WritePlaylists()
{
    llLinksetDataWrite(llList2String(reserved_lsdk, 0), llDumpList2String(playlists, "#|"));
}

ReadCurrentPlaylist()
{
    playlist_track_keys = llParseString2List(llLinksetDataRead(current_playlist), ["|"], []);
    playlist_randomness = llList2Float(playlist_track_keys, 0);
    playlist_track_keys = llDeleteSubList(playlist_track_keys, 0, 0);
    //if(DBG) llOwnerSay("ReadCurrentPlaylist randomness=" + (string)playlist_randomness);
}

ChangeTrack()
{
    integer t = llGetUnixTime();
    if( (t > end_time + 600))
    {
        if(DBG) llOwnerSay("Resetting tracks");
        ReadCurrentPlaylist();
    }
    
    //if(DBG) llOwnerSay("Changing track");
    /*
    integer ln = llGetListLength(playlist_track_keys) - 2; // never select the last entry to avoid repeating tracks
    integer next = llRound(llFrand(ln * playlist_randomness));
    current_track_id = llList2String(playlist_track_keys, next);
    list track_data = llParseStringKeepNulls(llLinksetDataRead(current_track_id), ["#|"], []);
    current_track_uri = llList2String(track_data, 0);//llList2String(playlist_track_keys, next);
    playlist_track_keys = llDeleteSubList(playlist_track_keys, next, next) + [current_track_id];
    if(DBG) llOwnerSay("Post-shuffle: " + llList2CSV(playlist_track_keys));
    start_time = t+15;
    end_time = start_time + llList2Integer(track_data, 2); // temp, parse duration of track from lsd value
    */
    if(future_track_id == "")
        ShuffleTracks();
        
    current_track_id = future_track_id;
    current_track_uri = future_track_uri;
    start_time = t + track_interval;
    end_time = start_time + future_track_duration;
    
    ShuffleTracks();
    if(DBG) llOwnerSay("Tracks changed; current=" + current_track_uri + ", future=" + future_track_uri);
    
    cache_track_reply = current_track_uri + "|" + (string)start_time + "|" + future_track_uri + "|" + (string)(end_time + track_interval); 
    
    /*
    list track_data = llParseStringKeepNulls(llLinksetDataRead(current_track_id), ["#|"], []);
    current_track_uri = llList2String(track_data, 0);//llList2String(playlist_track_keys, next);
    
    start_time = t+15;
    end_time = start_time + llList2Integer(track_data, 2); // temp, parse duration of track from lsd value*/
}

ShuffleTracks() // Selects the next track, sets it to future_track_ variables, shuffles track to end of playlist
{
    if(playlist_rnd_range < 1) // reset after playing all tracks
        playlist_rnd_range = llGetListLength(playlist_track_keys)-1;
        
    integer range = llRound((llGetListLength(playlist_track_keys) - 2) * playlist_randomness); // never select the last entry to avoid repeating tracks
    if(range > playlist_rnd_range)
        range = playlist_rnd_range;
    integer next = llRound(llFrand(range));
    future_track_id = llList2String(playlist_track_keys, next);
    list track_data = llParseStringKeepNulls(llLinksetDataRead(future_track_id), ["#|"], []);
    future_track_uri = llList2String(track_data, 0);
    future_track_duration = llList2Integer(track_data, 2);
    
    playlist_track_keys = llDeleteSubList(playlist_track_keys, next, next) + [future_track_id];
    if(DBG) llOwnerSay("Post-shuffle: " + llList2CSV(playlist_track_keys));
    if(DBG) llOwnerSay("Future Track: " + future_track_uri);
    
    --playlist_rnd_range;
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
        
            list pl_track_keys = llDeleteSubList(llParseString2List(llLinksetDataRead(pl), ["|"], []), 0, 0);
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
/*
SetStateAndUpdate(integer s)
{
    if(DBG) llOwnerSay("SetStateAndUpdate " + (string)s);
    
    player_state = s;
    
    pending_update = llList2ListSlice(sessions, 0, -1, 4, 1);
    if(DBG) llOwnerSay("pending_update = " + llList2CSV(pending_update));
    llSetTimerEvent(1);
}

NotifySession(string rqid)
{
   
    string body;
     
    if(player_state == 1)
        body = "playtrack|" + current_track_uri + "|" + (string)start_time + "|" + current_track_id;
    
    llSetContentType(rqid, CONTENT_TYPE_XHTML);
    llHTTPResponse(rqid, 200, body);
    if(DBG) llOwnerSay("NotifySession: " + rqid + " " + body);
}
*/
BuildMenu(string agent, integer page, integer mode, integer channel)
{
    integer i = llListFindList(admins, [agent]);
    integer admin_lv = llList2Integer(admins, i+1);
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
    
    else if(mode == 2)
    {
        /*
        title = "User Authorization\nU: User; can turn on/off, change tracks\nA: Admin; can open web config, add users";
        
         if(llGetListLength(admins) > 24)
            menu += ["<<", "Back", ">>"];
        else
            menu += ["Back"];
        menu += ["Add User"];
        
        integer s = page * 24;
        integer n = 8;
        while(~--n)
        {
            string lv = llList2String(["U:","A:"], llList2Integer(admins, s + n * 3 + 1));
            menu += [llGetSubString(lv+llList2String(admins, s + n * 3 + 2), 0, 23)];
        }
        */
    }
    
    llDialog(agent, "Streaming Player "+title, menu, channel);
}

default
{
    state_entry()
    {
        RefreshURL();
        admins = llParseString2List(llLinksetDataRead("admins"), ["|"], []);
        llListen(cfg_channel, "", "", "");
        LoadPlaylists();
    }

    touch_start(integer n)
    {
        integer i = llListFindList(admins, [(string)llDetectedKey(0)]);
        if(~i)
        {
            
            BuildMenu((string)llDetectedKey(0), -1, 0, cfg_channel);
            /*
            cfg_id = llGetSubString(llGenerateKey(),0,7);
            last_cfg_time = llGetUnixTime();
            llLoadURL(llGetOwner(), "Soundcloud web player configuration page", srv_url+"/cfg/"+cfg_id);
            */
        }
        else if( llDetectedKey(0) == llGetOwner() )
        {
            admins += [(string)llGetOwner(), 2, llGetUsername(llGetOwner())];
            llOwnerSay("Registered owner as admin, setup menu available");
        }
    }
    
    listen(integer c, string n, key k, string m)
    {
        integer i = llListFindList(admins, [(string)k]);
        integer admin_lv = llList2Integer(admins, i+1);
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
                list tracks = llParseString2List(llLinksetDataRead(pln), ["|"], []);
                llOwnerSay("Playlist: " + pln);
                integer tl = llGetListLength(tracks);
                integer n=1;
                integer tt; // total time of playlist
                for(; n < tl; ++n)
                {
                    list track_data = llParseStringKeepNulls(llLinksetDataRead(llList2String(tracks, n)), ["#|"], []);
                    integer tl = llList2Integer(track_data, 2);
                    tt += tl;
                    llOwnerSay("  [" + ToPadMinSec(tl) + "] " + llList2String(track_data, 1) + "  " + llList2String(track_data, 0));
                }
                llOwnerSay("Total: " + ToPadMinSec(tt) + ", " + StoreCheck(llLinksetDataAvailable()));
                
            }
        }
        /*
        else if(m == "Users" && admin_lv > 1)
        {
            mode=1;
            page=0;
        }*/
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
            //mode = 0;
        }
        else if( ~(i = llListFindList(playlists, [m])) ) // changing active playlist
        {
            current_playlist = m;
            llLinksetDataWrite(llList2String(reserved_lsdk, 1), m);
            if(DBG) llOwnerSay("DEBUG set playlist");
            //mode=0;
            page = -1;
            SetMedia();
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
        integer gt = Millisec();
        
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
                next_url_try = llGetUnixTime()+300;
                llSetText("Error: server URL unavailable from simulator", <1,0,0>, 1.0);
                llSetTimerEvent(30);
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
            //if(DBG) llOwnerSay("NoHeader");
                
            llSetContentType(rqid, CONTENT_TYPE_XHTML);
            //if(DBG) llOwnerSay("\nPage request from " + ip + "\nuser-agent=" + llGetHTTPHeader(rqid, "user-agent") + "\nheader=" + header + "\npath=" + rawpath);
            string p1 = llList2String(path, 1);
            string p2 = llList2String(path, 2);
            string p3 = llList2String(path, 3);
            string p4 = llList2String(path, 4);

            if( !llGetListLength(path) && method == "GET" && player_state > -1 )
            {
                if(DBG) llOwnerSay("Load request from " + ip + " " + ua);
                llHTTPResponse(rqid, 200, llDumpList2String(llParseStringKeepNulls(html_init + "player" + html_init_tail, ["#VER"], []), rndver ));
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
                    llHTTPResponse(rqid, 200, llDumpList2String(llParseStringKeepNulls(html_init + "config" + html_init_tail, ["#VER"], []), rndver ));
                   // llHTTPResponse(rqid, 200, html_init + "config" + html_init_tail);
                    return;
                }
               
                if( p2 == "save" )
                {
                    if( p3 == "start" ) // start saving a playlist
                    {
                        saving_playlist = p4;
                        if(saving_playlist == "")
                        {
                            if(DBG) llOwnerSay("Error: playlist name is null");
                            return;
                        }
                        CleanupLinksetData();
                        
                        if(DBG) llOwnerSay("Saving playlist " + saving_playlist);
                        //llLinksetDataReset();
                        playlist_track_hash = [body]; // shuffle randomness value
                        //llLinksetDataDelete(saving_playlist);
                        llHTTPResponse(rqid, 200, "NXT");
                    }
                    else if( p3 == saving_playlist )
                    {
                        if( p4 == "uri" ) // save a track to playlist
                        {
                            header = "NXT";
                            list track = llParseStringKeepNulls(body, ["#|"], []); 
                            string hash = llGetSubString(llComputeHash(llList2String(track, 0), "sha256"),0,15);
                            //if(DBG) llOwnerSay(llList2String(track, 0) + " sha256 = " + hash);
                            playlist_track_hash += [hash];
                            
                            integer rem = llLinksetDataAvailable();
                            if(rem < (llStringLength(body) * 2 + 64 + llGetListLength(playlist_track_hash) * 32)) // estimate size requirements + 32 extra bytes
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
                            string dpl =  llDumpList2String(playlist_track_hash, "|");
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
                                header += "|" + StoreCheck(rem);
                            }
                            
                            if(DBG) llOwnerSay("got final entry, confirming end");
                            llHTTPResponse(rqid, 200, header);
                            //list lsdk = llLinksetDataListKeys(0,-1);
                            //if(DBG) llOwnerSay("Saved track URIs: " + llList2CSV(lsdk));
                        }
                    }
                    /*
                    else if(p3 == saving_playlist && p4 == "end") // finish saving a playlist
                    {
                        
                    }*/
                    else
                    {
                        llHTTPResponse(rqid, 400, "Not a valid playlist save operation at this time");
                    }
                }
                
                else if( p2 == "playlists" ) // load list of playlists
                {
                    llHTTPResponse(rqid, 200, llDumpList2String(playlists, "#|"));
                }
                
                else if( p2 == "playlist" ) // load a single playlist
                {
                    string gpl = llLinksetDataRead(llList2String(path, 3));
                    list playlist_track_keys;
                    if(gpl != "")
                    {
                        playlist_track_keys = llParseStringKeepNulls(gpl, ["|"], []);
                        integer n = llGetListLength(playlist_track_keys);
                        while(--n) // ignore index 0, since it is the shuffle randomness float
                            playlist_track_keys = llListReplaceList(playlist_track_keys, llList2List(llParseString2List(llLinksetDataRead(llList2String(playlist_track_keys, n)), ["#|"], []), 0, 0), n, n);
                        if(DBG) llOwnerSay("playlist = " + llList2CSV(playlist_track_keys));
                    }
                    llHTTPResponse(rqid, 200, llDumpList2String(playlist_track_keys, "|"));
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
                    llHTTPResponse(rqid, 200, name+"|"+status);
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
                /*
                else if(p2 == "tracks")
                {
                    list uris = llLinksetDataListKeys(0, -1);
                    llHTTPResponse(rqid, 200, llDumpList2String(uris, "|"));
                }
                */
                else
                {
                    llHTTPResponse(rqid, 400, "Invalid path/request syntax");
                }
                /*
                else if(p2 == "track")
                {
                    string p3 = llList2String(path, 3);
                    string body = llLinksetDataRead(p3);
                    llHTTPResponse(rqid, 200, body);
                }*/
            }
            /*
            else if(p0 == "poll") // save a http poll to respond to on demand
            {
                if(player_state == -1)
                {
                    llHTTPResponse(rqid, 503, "Media player server is currently offline");
                    return;
                }
                //string p1 = llList2String(path, 1); // look up session by identifier
                integer fsid = llListFindList(sessions, [p1]);
                integer t = llGetUnixTime();
                
                 // existing session updated
                if(~fsid)
                {
                    llHTTPResponse(llList2Key(sessions, fsid+1), 200, "exp"); // safely expire this poll
                    integer lsut = llList2Integer(sessions, fsid+2);
                    sessions = llListReplaceList(sessions, [(string)rqid, t], fsid+1, fsid+2);
                    if(DBG) llOwnerSay("Session updated: " + p1 + " after " + (string)(t - lsut) + ", ping=" + (string)(t - (integer)p3));
                    if(p2 != current_track_id)
                    {
                        if(DBG) llOwnerSay("Track ID " + p2 + "mismatches current track " + current_track_id + ", resending");
                        NotifySession(rqid);
                    }
                }
                // new session added
                else if(llGetListLength(sessions) < 99) // defense against vaguely intelligent people who think they are hackerman, do some more ip filtering later
                {
                    sessions += [p1, (string)rqid, t, ""];
                    if(DBG) llOwnerSay("Session recorded: " + p1);
                    if(t >= start_time && t < end_time)
                        NotifySession(rqid);
                }
                
                if(player_state == 0)
                {
                    player_state = 1;
                    ChangeTrack(); // triggers state update afterward
                }
            }
             */
            
            else if(p0  == "next-track")
            {
                integer t = llGetUnixTime();
                /*
                if( (t > end_time + 600))
                {
                    if(DBG) llOwnerSay("Resetting tracks");
                    
                    ReadCurrentPlaylist();
                }*/
                
                if(t > end_time)
                {
                    ChangeTrack();
                    /*
                    if(DBG) llOwnerSay("Changing track");
                    integer ln = llGetListLength(playlist_track_keys) - 2; // never select the last entry to avoid repeating tracks
                    integer next = llRound(llFrand(ln * playlist_randomness));
                    string next_track = llList2String(playlist_track_keys, next);
                    list track_data = llParseStringKeepNulls(llLinksetDataRead(next_track), ["#|"], []);
                    current_track_uri = llList2String(track_data, 0);//llList2String(playlist_track_keys, next);
                    playlist_track_keys = llDeleteSubList(playlist_track_keys, next, next) + [next_track];
                    if(DBG) llOwnerSay("Post-shuffle: " + llList2CSV(playlist_track_keys));
                    start_time = t+10;
                    end_time = start_time + llList2Integer(track_data, 2); // temp, parse duration of track from lsd value
                    */
                }
                
                if(DBG) llOwnerSay("Sending track "+ cache_track_reply + " to " + ip);
                llHTTPResponse(rqid, 200, cache_track_reply);
            }
            /*
            else if(p0  == "waveform")
            {
                //string uri = llGetSubString(rawpath, 10, -1);
                string track = llList2String(path, -1);
                if(DBG) llOwnerSay(track + " == " + current_track_uri);
                if(~llSubStringIndex(current_track_uri, track))
                {
                    track_waveform = body;
                    if(DBG) llOwnerSay("Saved waveform for current track");
                }
                llHTTPResponse(rqid, 200, "");
            }
            */

            else
            {
                if(DBG) llOwnerSay("Unrecognized request!");
                llHTTPResponse(rqid, 400, "LSL server has no idea what that was!");
            }
        }
        else
        {
            if(DBG) llOwnerSay("Header is sus");
        }
        gt = Millisec() - gt;
        tms += gt;
        ++trqh;
        if(DBG) llOwnerSay("Complete in " + (string)(gt) + "ms, avg=" + (string)(tms/trqh));

    }

    timer()
    {
        llSetTimerEvent(0);
        srv_url = llRequestURL();
        /*
        integer t = llGetUnixTime();
        if(next_url_try < t)
        {
            next_url_try = llGetUnixTime()+300;
            srv_url = llRequestURL();
        }
        /*
        else
        {
            
            if(pending_update)
            {
                integer n = llGetListLength(pending_update);
                integer i = 0;
                for(; i<batchsz && i<n; ++i)
                {
                     NotifySession(llList2Key(pending_update, i));
                }
                pending_update = llDeleteSubList(pending_update, 0, batchsz-1);
            }
            else if(player_state == -1) // nothing to do, for now
            {
                llSetTimerEvent(0);
            }
            
            if(next_cleanup < t)
            {
                // clean up expired sessions
                integer n = llGetListLength(sessions) / 4;
                if(!n && player_state)
                {
                    SetStateAndUpdate(0);
                }
                else while(~--n)
                {
                    if(llList2Integer(sessions, n*4+2) + polltm < t)
                    {
                        key rqid = llList2String(sessions, n*4+1);
                        //llSetContentType(rqid, CONTENT_TYPE_XHTML);
                        //llHTTPResponse(rqid, 200, "exp");
                        if(DBG) llOwnerSay("Session expired: " + llList2String(sessions, n*4));
                        sessions = llDeleteSubList(sessions, n*4, n*4+3);
                    }
                    //else n=0;
                }
                next_cleanup = t+polltm;
            }
            
            if(t > end_time+1 && player_state == 1)
            {
                ChangeTrack();
            }
            
        }*/
    }
}






