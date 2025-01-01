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
string current_playlist = "Default";
string current_track; // uri of upcoming/currently playing track
integer start_time;
integer end_time;
string track_waveform; // encoded waveform binary data for active soundcloud track

integer player_state; // -1=off, 0=inactive, 1=active
integer next_url_try = 0x7FFFFFFF; // time of next attempt at getting a URL
integer next_cleanup;

// client/network stuff
list sessions; // strides of [str session, str pollId, int time, string track]
list pending_update; // session request ids needing update for state change
integer batchsz = 16;
integer polltm = 360; // poll request timeout period

// playlist data
list playlists = ["Default"];
list playlist_keys; // URIs/LSD keys for current playlist
float playlist_randomness = .2;
//integer playlist_progress;

string saving_playlist; // name of current playlist data being received to save to LSD
list playlist_track_hash;

// config/user data
list admins; // strides of [str key, int accesslevel, str name]
integer menu_page = 0;
integer cfg_channel = 0x6392B8E5;

refreshURL()
{
    llReleaseURL(srv_url);
    srv_url = llRequestURL();
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


readCurrentPlaylist()
{
    playlist_keys = llParseString2List(llLinksetDataRead(current_playlist), ["|"], []);
    playlist_randomness = llList2Float(playlist_keys, 0);
    playlist_keys = llDeleteSubList(playlist_keys, 0, 0);
    llOwnerSay("readCurrentPlaylist randomness=" + (string)playlist_randomness);
}

changeTrack()
{
    integer t = llGetUnixTime();
    if( (t > end_time + 600))
    {
        llOwnerSay("Resetting tracks");
        readCurrentPlaylist();
    }
    
    llOwnerSay("Changing track");
    integer ln = llGetListLength(playlist_keys) - 2; // never select the last entry to avoid repeating tracks
    integer next = llRound(llFrand(ln * playlist_randomness));
    string next_track = llList2String(playlist_keys, next);
    list track_data = llParseStringKeepNulls(llLinksetDataRead(next_track), ["#|"], []);
    current_track = llList2String(track_data, 0);//llList2String(playlist_keys, next);
    playlist_keys = llDeleteSubList(playlist_keys, next, next) + [next_track];
    llOwnerSay("Post-shuffle: " + llList2CSV(playlist_keys));
    start_time = t+10;
    end_time = start_time + llList2Integer(track_data, 2); // temp, parse duration of track from lsd value
    
    setStateAndUpdate(1);
}

setStateAndUpdate(integer s)
{
    llOwnerSay("setStateAndUpdate " + (string)s);
    
    player_state = s;
    
    pending_update = llList2ListSlice(sessions, 0, -1, 4, 1);
    llOwnerSay("pending_update = " + llList2CSV(pending_update));
    llSetTimerEvent(1);
}

notifySession(string rqid)
{
    llOwnerSay("notifySession: " + rqid);
    string body;
     
    if(player_state == 1)
        body = "playtrack|" + current_track + "|" + (string)start_time;
    
    llHTTPResponse(rqid, 200, body);
}

buildMenu(string agent, integer page, integer mode, integer channel)
{
    integer i = llListFindList(admins, [agent]);
    integer admin_lv = llList2Integer(admins, i+1);
    if(! admin_lv)
        return;
        
    list menu;
    string title = "Controls";
    
    if(page == -1)
    {
        menu += ["Close Menu", "Music On", "Music Off", "Playlists"];
        if(admin_lv > 1)
            menu += ["Setup"];
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
        refreshURL();
        admins = llParseString2List(llLinksetDataRead("admins"), ["|"], []);
        llListen(cfg_channel, "", "", "");
    }

    touch_start(integer n)
    {
        integer i = llListFindList(admins, [(string)llDetectedKey(0)]);
        if(~i)
        {
            
            buildMenu((string)llDetectedKey(0), -1, 0, cfg_channel);
            /*
            cfg_id = llGetSubString(llGenerateKey(),0,7);
            last_cfg_time = llGetUnixTime();
            llLoadURL(llGetOwner(), "Soundcloud web player configuration page", srv_url+"/cfg/"+cfg_id);
            */
        }
        else if(llDetectedKey(0) == llGetOwner())
        {
            admins += [(string)llGetOwner(), 2, llGetUsername(llGetOwner())];
            llOwnerSay("Registered owner as admin, setup menu available");
        }
    }
    
    listen(integer c, string n, key k, string m)
    {
        integer i = llListFindList(admins, [(string)k]);
        integer admin_lv = llList2Integer(admins, i+1);
        llOwnerSay("Admin level: "+(string)admin_lv);
        integer remenu = TRUE;
        integer page = menu_page; // temp global tracker
        integer mode;
       
        if(m == "Setup" && admin_lv > 1)
        {
            cfg_id = llGetSubString(llGenerateKey(),0,7);
            last_cfg_time = llGetUnixTime();
            string desc = "Open streaming player web configuration page: ";
            string url = srv_url+"/cfg/"+cfg_id;
            llLoadURL(k, desc, url);
            llRegionSayTo(k, 0, desc+url);
            remenu = FALSE;
        }
        else if(m == "Users" && admin_lv > 1)
        {
            mode=1;
            page=0;
        }
        else if(m == "Music Off")
        {
        }
        else if(m == "Music On")
        {
        }
        else if(m == "Playlists")
        {
            mode=1;
            page=0;
        }
        else if(m == ">>")
        {
            ++page;
        }
        else if(m == "<<")
        {
            if(page)
                --page;
        }            
        else if(m == "Back")
        {
            page = -1;
            mode = 0;
        }
        else if(~(i=llListFindList(playlists, [m])))
        {
            current_playlist = m;
            llOwnerSay("DEBUG set playlist");
            mode=0;
            page=-1;
            readCurrentPlaylist();
        }
        else
            remenu = FALSE;
        
            
        if(remenu)
            buildMenu((string)k, page, mode, cfg_channel);
    }

    changed(integer c)
    {
        if(c & (CHANGED_REGION_START|CHANGED_REGION))
            refreshURL();
    }

    /*
    http_response(key id, integer sts, list md, string body)
    {

    }*/

    http_request(key id, string method, string body)
    {
        string header = llGetHTTPHeader(id, "x-query-string");
        string rawpath =  llGetHTTPHeader(id, "x-path-info");
        list path =  llParseString2List(rawpath, ["/"], []);
        string ip = llGetHTTPHeader(id, "x-remote-ip");
        string ua = llGetHTTPHeader(id, "user-agent");
        llOwnerSay("received " + method + " from " + ip + " [" + ua + "]\nheader=" + header + "\npath=" + llDumpList2String(path, "/") + "\nbody=" + llUnescapeURL(body));

        string rndver = (string)((integer)llFrand(0xFFFFFFF)); // remove this from shipping
        
        string p0 = llList2String(path, 0);
       

        if((string)id == srv_url) // URL request
        {
            if (method != URL_REQUEST_GRANTED)
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
                llSetTimerEvent(1);
                llSetPrimMediaParams(3, [
                    PRIM_MEDIA_AUTO_PLAY, TRUE,
                    PRIM_MEDIA_HEIGHT_PIXELS, 1024,
                    PRIM_MEDIA_WIDTH_PIXELS, 1024,
                    PRIM_MEDIA_CURRENT_URL, srv_url
                ]);
            }
        }
        else if(header == "")
        {
            //llOwnerSay("NoHeader");
                
            llSetContentType(id, CONTENT_TYPE_XHTML);
            //llOwnerSay("\nPage request from " + ip + "\nuser-agent=" + llGetHTTPHeader(id, "user-agent") + "\nheader=" + header + "\npath=" + rawpath);
            string p1 = llList2String(path, 1);
            string p2 = llList2String(path, 2);
            string p3 = llList2String(path, 3);
            string p4 = llList2String(path, 4);

            if( !llGetListLength(path) && method == "GET")
            {
                llHTTPResponse(id, 200, llDumpList2String(llParseStringKeepNulls(html_init + "player" + html_init_tail, ["#VER"], []), rndver ));
                //llHTTPResponse(id, 200, html_init + "player" + html_init_tail);
            }

            else if(cfg_id != "" && p1 == cfg_id) // config page is being displayed
            {
                llOwnerSay("CfgPage");
                if(llGetUnixTime() < last_cfg_time + 3600)
                {
                    last_cfg_time = llGetUnixTime();
                }
                else
                {
                    llHTTPResponse(id, 403, "Config page has expired"); 
                    return;
                }
                
                if(llGetListLength(path) == 2)
                {
                    llHTTPResponse(id, 200, llDumpList2String(llParseStringKeepNulls(html_init + "config" + html_init_tail, ["#VER"], []), rndver ));
                   // llHTTPResponse(id, 200, html_init + "config" + html_init_tail);
                    return;
                }
               
                if(p2 == "save")
                {
                    if(p3 == "start") // start saving a playlist
                    {
                        saving_playlist = p4;
                        if(saving_playlist == "")
                        {
                            llOwnerSay("Error: playlist name is null");
                            return;
                        }
                        llOwnerSay("Saving playlist " + saving_playlist);
                        //llLinksetDataReset();
                        playlist_track_hash = [body]; // shuffle randomness value
                        //llLinksetDataDelete(saving_playlist);
                        llHTTPResponse(id, 200, "NXT");
                    }
                    else if(p3 == saving_playlist)
                    {
                        if(p4 == "uri") // save a track to playlist
                        {
                            list track = llParseStringKeepNulls(body, ["#|"], []); 
                            string hash = llGetSubString(llComputeHash(llList2String(track, 0), "sha256"),0,15);
                            //llOwnerSay(llList2String(track, 0) + " sha256 = " + hash);
                            playlist_track_hash += [hash];
                            llLinksetDataWrite(hash, body);
                            llOwnerSay("Saved " + llList2String(track, 0) + " with ID " + hash);
                            
                            llHTTPResponse(id, 200, "NXT");
                        }
                        else if(p4 == "end")
                        {
                            string dpl =  llDumpList2String(playlist_track_hash, "|");
                            llLinksetDataWrite(saving_playlist, dpl);
                            
                            llOwnerSay("got final entry, confirming end");
                            llOwnerSay(saving_playlist + ": " + dpl);
                            llHTTPResponse(id, 200, "END");
                            //list lsdk = llLinksetDataListKeys(0,-1);
                            //llOwnerSay("Saved track URIs: " + llList2CSV(lsdk));
                        }
                    }
                    /*
                    else if(p3 == saving_playlist && p4 == "end") // finish saving a playlist
                    {
                        
                    }*/
                    else
                    {
                        llHTTPResponse(id, 400, "Not a valid playlist save operation at this time");
                    }
                }
                
                else if(p2 == "playlists") // load list of playlists
                {
                    llHTTPResponse(id, 200, llDumpList2String(playlists, "#|"));
                }
                
                else if(p2 == "playlist") // load a single playlist
                {
                    string gpl = llLinksetDataRead(llList2String(path, 3));
                    list playlist_keys;
                    if(gpl != "")
                    {
                        playlist_keys = llParseStringKeepNulls(gpl, ["|"], []);
                        integer n = llGetListLength(playlist_keys);
                        while(--n) // ignore index 0, since it is the shuffle randomness float
                            playlist_keys = llListReplaceList(playlist_keys, llList2List(llParseString2List(llLinksetDataRead(llList2String(playlist_keys, n)), ["#|"], []), 0, 0), n, n);
                        llOwnerSay("playlist = " + llList2CSV(playlist_keys));
                    }
                    llHTTPResponse(id, 200, llDumpList2String(playlist_keys, "|"));
                }
                
                else if (p2 == "delete")
                {
                    string pl = llList2String(path, 3);
                    llOwnerSay("Deleting playlist " + pl);
                    llLinksetDataDelete(pl);
                    llHTTPResponse(id, 200, pl);
                }
                /*
                else if(p2 == "tracks")
                {
                    list uris = llLinksetDataListKeys(0, -1);
                    llHTTPResponse(id, 200, llDumpList2String(uris, "|"));
                }
                */
                else
                {
                    llHTTPResponse(id, 400, "Invalid path/request syntax");
                }
                /*
                else if(p2 == "track")
                {
                    string p3 = llList2String(path, 3);
                    string body = llLinksetDataRead(p3);
                    llHTTPResponse(id, 200, body);
                }*/
            }
            
            else if(p0 == "poll") // save a http poll to respond to on demand
            {
                string p1 = llList2String(path, 1); // look up session by identifier
                integer fsid = llListFindList(sessions, [p1]);
                integer t = llGetUnixTime();
                
                if(~fsid)
                {
                    sessions = llListReplaceList(sessions, [(string)id, t], fsid+1, fsid+2);
                    llOwnerSay("Session updated: " + p1);
                }
                else if(llGetListLength(sessions) < 99) // defense against vaguely intelligent people who think they are hackerman
                {
                    sessions += [p1, (string)id, t, ""];
                    llOwnerSay("Session recorded: " + p1);
                }
                
                if(player_state == 0)
                {
                    changeTrack(); // triggers state update afterward
                }
            }
            /*
            else if(p0  == "next-track")
            {
                integer t = llGetUnixTime();
                
                if( (t > end_time + 600))
                {
                    llOwnerSay("Resetting tracks");
                    
                    readCurrentPlaylist();
                    //playlist_keys = llListRandomize(playlist_keys, 1);
                    //playlist_progress = -1;
                }
                
                if(t > end_time)
                {
                    llOwnerSay("Changing track");
                    //++playlist_progress;
                    //if(playlist_progress)
                    integer ln = llGetListLength(playlist_keys) - 2; // never select the last entry to avoid repeating tracks
                    integer next = llRound(llFrand(ln * playlist_randomness));
                    string next_track = llList2String(playlist_keys, next);
                    list track_data = llParseStringKeepNulls(llLinksetDataRead(next_track), ["#|"], []);
                    current_track = llList2String(track_data, 0);//llList2String(playlist_keys, next);
                    playlist_keys = llDeleteSubList(playlist_keys, next, next) + [next_track];
                    llOwnerSay("Post-shuffle: " + llList2CSV(playlist_keys));
                    start_time = t+10;
                    end_time = start_time + llList2Integer(track_data, 2); // temp, parse duration of track from lsd value
                }
                /*
                list uris = llLinksetDataListKeys(0, -1);
                string uri = llList2String(uris, llRound(llFrand(llGetListLength(uris)-1)));
                current_track = uri; // temporary
                *
                
                llOwnerSay("Sending track "+ current_track + " to " + ip);
                llHTTPResponse(id, 200, current_track + "|" + (string)start_time);
            }*/
            /*
            else if(p0  == "waveform")
            {
                //string uri = llGetSubString(rawpath, 10, -1);
                string track = llList2String(path, -1);
                llOwnerSay(track + " == " + current_track);
                if(~llSubStringIndex(current_track, track))
                {
                    track_waveform = body;
                    llOwnerSay("Saved waveform for current track");
                }
                llHTTPResponse(id, 200, "");
            }
            */

            else
            {
                llOwnerSay("Unrecognized request!");
                llHTTPResponse(id, 400, "LSL server has no idea what that was!");
            }
        }
        else
        {
            llOwnerSay("Header is sus");
        }

    }

    timer()
    {
        integer t = llGetUnixTime();
        
        if(next_url_try < t)
        {
            next_url_try = llGetUnixTime()+300; 
            srv_url = llRequestURL();
        }
        else
        {
            if(pending_update)
            {
                integer n = llGetListLength(pending_update);
                integer i = 0;
                for(; i<batchsz && i<n; ++i)
                {
                     notifySession(llList2Key(pending_update, i));
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
                    setStateAndUpdate(0);
                }
                else while(~--n)
                {
                    if(llList2Integer(sessions, n*4+2) + polltm < t)
                    {
                        llOwnerSay("Session expired: " + llList2String(sessions, n*4));
                        sessions = llDeleteSubList(sessions, n*4, n*4+3);
                    }
                }
                next_cleanup = t+polltm;
            }
            
            if(t > end_time && player_state == 1)
            {
                changeTrack();
            }
        }
    }
}






