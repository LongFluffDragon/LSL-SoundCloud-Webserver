integer DBG = TRUE; // debugging switch

string srv_url; // URL returned by llRequestURL, or an error code

string cfg_id = ""; // config webpage session id
integer last_cfg_time; // last activity from config webpage

// the initial player webpage. has to use XHTML to bypass restrictions on serving HTML to non-embedded clients
// the page templates, css, ect are created by musicplayer-injector.js
// musicplayer-main.js contains the page code
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
string current_playlist; // hash IDs of all tracks in the loaded playlist
string current_track_id; // hash ID of current/next playing track
string current_track_uri; // uri of currently playing track
string current_track_title; // name of track to be displayed at the top of the player, and for commands
integer current_track_duration; // in seconds
integer start_time; // current track intended start time
integer end_time; // current track intended end time
// eqivalent to above; shuffled tracks go here, then moved to current upon expiration of the previous current track
string future_track_id;
string future_track_uri;
string future_track_title;
integer future_track_duration;
integer future_track_start_time;

string cache_track_reply; // the most recent reply to next track requests is cached and changed when the track does
list manual_queue; // list of track IDs, future tracks will be taken from this before shuffling them from current playlist

integer track_interval = 15; // seconds between finishing and starting tracks

integer player_state; // -1=off, 0=inactive, 1=active
integer is_anyone_home; // tracks if there are potential listeners in the parcel or sim
integer next_url_try = 0x7FFFFFFF; // time of next attempt at getting a URL

// playlist data
list playlists; // names of all created playlists, mirrored in linksetdata
list playlist_track_IDs; // URIs/LSD keys for current playlist
float playlist_randomness; // 0-1 value defining shuffle behavior of the current track
integer playlist_remaining_range; // incrementally decreasing range of the playlist that tracks can be selected from, resets at 0

// temporary values while saving changes to a playlist
string saving_playlist; // name of current playlist data being received to save to LSD
list saving_playlist_data; // randomness value + all track IDs, received from the config page

list reserved_lsdk = ["playlists", "current_playlist", "admins"];

// config/user data
list admins; // strides of [str key, str name, int accesslevel]
integer menu_page = 0; // current page of the playlist selection menu

// admin config request temp data
list rq_key_name; // [http request handle, key dataserver request, name dataserver request]

// no touch
integer cfg_channel = 0x6392B8E5;
integer media_link = LINK_THIS;
integer media_face = 3;

string SEP = " "; // Unicode Character 8200 (U+2008) 0xE2 0x80 0x88, separator for serialized data

string OOS = "Error: no storage remaining to write playlist\n";
string ERR400 = "Invalid or unknown request";

/*integer Millisec()
{
    string Stamp = llGetTimestamp();
    return (integer)llGetSubString(Stamp, 8, 9) * 86400000 + // Days
        (integer)llGetSubString(Stamp, 11, 12) * 3600000 + // Hours
        (integer)llGetSubString(Stamp, 14, 15) * 60000 + // Minutes
        llRound(((float)llGetSubString(Stamp, 17, -2) * 1000.0)) // Seconds.Milliseconds
        - 617316353; // Offset to fit between [-617316353,2147483547]
}*/

string ToPadMinSec(integer t) // takes seconds and returns a string in the format MM:SS
{
    integer m = t/60;
    integer s = t%60;
    string r = (string) m + ":";
    if (m < 10)
        r = "0" + r;
    if (s < 10)
        r += "0";
    return r += (string)s;
}

string StoreCheck(integer rembytes) // gets a user-friendly read of the remaining storage capacity
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

SetMedia(integer verbose)
{
    end_time = 0; // force a track refresh on next request
    llClearLinkMedia(media_link, media_face);
    llSleep(1);
    
    if (~player_state && is_anyone_home)
    {
        if (verbose)
            llSay(0, "Music player turning on..");
            
        llSetLinkMedia(media_link, media_face, [
            PRIM_MEDIA_AUTO_PLAY, TRUE,
            PRIM_MEDIA_HEIGHT_PIXELS, 1024,
            PRIM_MEDIA_WIDTH_PIXELS, 1024,
            PRIM_MEDIA_CURRENT_URL, srv_url
        ]);
        
    }
    else if (verbose)
        llSay(0, "Music player turned off");
}

LoadPlaylists()
{
    playlists = llParseString2List(llLinksetDataRead(llList2String(reserved_lsdk, 0)), [SEP], []); // get "playlists"
    current_playlist = llLinksetDataRead(llList2String(reserved_lsdk, 1)); // get "current_playlist"
    
    if (DBG)llOwnerSay("saved playlist = " + current_playlist);
    
    if (!llGetListLength(playlists)) // rickrolling people who try to delete all their playlists is too much work
    {
        playlists = ["Default"];
        current_playlist = "Default";
    }
    else
    {
        if (current_playlist == "" || !~ llListFindList(playlists, [current_playlist])) // if invalid, use first loaded playlist
            current_playlist = llList2String(playlists, 0);

        ReadCurrentPlaylist();
    }
    CleanupLinksetData();
}

WritePlaylists()
{
    llLinksetDataWrite(llList2String(reserved_lsdk, 0), llDumpList2String(playlists, SEP));
}

ReadCurrentPlaylist()
{
    playlist_track_IDs = llParseString2List(llLinksetDataRead(current_playlist), [SEP], []); // randomness value + track IDs
    playlist_randomness = llList2Float(playlist_track_IDs, 0);
    playlist_track_IDs = llDeleteSubList(playlist_track_IDs, 0, 0); // discard the randomness value, leaving only track IDs
}

ChangeTrack()
{
    integer t = llGetUnixTime();
    
    if (t > end_time + 600) // reset completely if over 10 minutes without anyone using the player
    {
        if (DBG) llOwnerSay("Resetting tracks");
        ReadCurrentPlaylist();
        future_track_id = "";
    }
    
    if (future_track_id == "") // do an extra shuffle if there is not already a track, ie on fresh start
        ShuffleTracks();
    
    // replace current track with future one
    current_track_id = future_track_id;
    current_track_uri = future_track_uri;
    current_track_title = future_track_title;
    current_track_duration = future_track_duration;
    start_time = future_track_start_time;
    end_time = start_time + future_track_duration;
    
    ShuffleTracks(); // select a new future track
    
    cache_track_reply = llDumpList2String (// this is what gets sent to the player webpage
    [
        current_track_uri,
        start_time,
        future_track_uri,
        future_track_start_time,
        current_track_title,
        future_track_title,
        current_track_duration,
        future_track_duration
    ], SEP);
    
    if (DBG) llOwnerSay("Tracks changed; current=" + current_track_uri + ", future=" + future_track_uri); 
    llSetText("FreeMem=" + (string)llGetFreeMemory(), <1,1,1>, 1.0);
}

ShuffleTracks() // Selects the next track, sets it to future_track_ variables, shuffles track to end of playlist
{
    integer next; // index of the selected track in the current playlist, can be -1 if using manual queue to play tracks outside current playlist
    integer t = llGetUnixTime();
    
    if (end_time < t)
        end_time = t;
         
    if (playlist_remaining_range < 0) // reset to full playlist size after playing all tracks once
        playlist_remaining_range = llGetListLength(playlist_track_IDs)-1;
    
    if (manual_queue) // are there any tracks queued in advance by user?
    {
        future_track_id = llList2String(manual_queue, 0);
        next = llListFindList(playlist_track_IDs, [future_track_id]); // check index to shuffle this track if in current playlist
        if (DBG) llOwnerSay("Got next track from manual queue " + llList2CSV(manual_queue));
        manual_queue = llDeleteSubList(manual_queue, 0, 0);
    }
    else // use random selection
    {
        integer range = llRound((llGetListLength(playlist_track_IDs) - 2) * playlist_randomness); // never select the last entry to avoid repeating tracks
        if (range > playlist_remaining_range)
            range = playlist_remaining_range;
        next = llRound(llFrand(range)); // pick a random track within the unplayed section of the playlist and allowed randomness range
        future_track_id = llList2String(playlist_track_IDs, next);
        if (DBG) llOwnerSay("Got next track from shuffle");
    }
    
    list track_data = llParseStringKeepNulls(llLinksetDataRead(future_track_id), [SEP], []);
    future_track_uri = llList2String(track_data, 0);
    future_track_title = llList2String(track_data, 1);
    future_track_duration = llList2Integer(track_data, 2);
    future_track_start_time = end_time + track_interval;
    
    if (~next) // if the selected track is in the playlist, move it to the end so it is not selected soon
    {
        playlist_track_IDs = llDeleteSubList(playlist_track_IDs, next, next) + [future_track_id]; 
        --playlist_remaining_range; // shrink the allowed range of the playlist to only cover tracks not yet played
    }
        
    if (DBG) llOwnerSay("Post-shuffle: " + llList2CSV(playlist_track_IDs));
    if (DBG) llOwnerSay("Future Track: " + future_track_uri);
    
}

ChangePlaylist(integer pli)
{
    string new = llList2String(playlists, pli);
    if(new == current_playlist)
        return;
    current_playlist = new;
    llLinksetDataWrite(llList2String(reserved_lsdk, 1), current_playlist); // save current playlist
    llSay(0, "Changing playlist to " + current_playlist);
    SetMedia(FALSE);
}

CleanupLinksetData() // get all LSD keys, search to find out what ones are useful data, and delete any unknown/useless ones
{
    list keys = llLinksetDataListKeys(0, -1);
    integer i;
    
    integer n = llGetListLength(reserved_lsdk);
    while (~--n) // remove all keys in reserved_lsdk
    {
        i = llListFindList(keys, llList2List(reserved_lsdk, n, n));
        if (~i)
            keys = llDeleteSubList(keys, i, i);
    }
    
    n = llGetListLength(playlists);
    while (~--n) // remove all playlist keys
    {
        string pl = llList2String(playlists, n);
        i = llListFindList(keys, [pl]);
        if (~i)
        {
            //llOwnerSay("Found playlist key " + pl);
            keys = llDeleteSubList(keys, i, i);
        
            list pl_track_keys = llDeleteSubList(llParseString2List(llLinksetDataRead(pl), [SEP], []), 0, 0);
            integer n2 = llGetListLength(pl_track_keys);
            while (~--n2) // remove all track keys that feature in this playlist
            {
                string tr = llList2String(pl_track_keys, n2);
                i = llListFindList(keys, [tr]);
                if (~i)
                {
                    //llOwnerSay("Found track key " + tr);
                    keys = llDeleteSubList(keys, i, i);
                }
            }
        }
    }
    // remainder should be orphaned tracks no longer used in a playlist + weird garbage data from who knows what
    if (DBG)llOwnerSay("Stray Keys: " + llList2CSV(keys));
    
    n = llGetListLength(keys);
    while (~--n)
        llLinksetDataDelete(llList2String(keys, n));
    
}

BuildMenu(string agent, integer page, integer mode, integer channel)
{
    integer i = llListFindList(admins, [agent]);
    integer admin_lv = llList2Integer(admins, i+2);
    if (! admin_lv)
        return;
        
    list menu;
    string title = "Controls";
    
    if (mode == 0) // main menu page
    {
        menu += ["Close Menu", "Music On", "Music Off", "Playlists"];
        if (admin_lv > 1)
            menu += ["Setup", "Print"];
    }
    
    else if (mode == 1) // playlist select page
    {
        title = "Playlist Selection\nCurrent: "+current_playlist;
        if (llGetListLength(playlists) > 9)
            menu += ["<<", "Back", ">>"];
        else
            menu += ["Back"];
        menu += llList2List(playlists, page*9, page*9+9);
    }
    
    llDialog(agent, "Streaming Player "+title, menu, channel);
}

ParseCmd(string m, key k, integer manual)
{
    integer i = llListFindList(admins, [(string)k]);
    integer admin_lv = llList2Integer(admins, i+2);
    if (DBG) llOwnerSay("Admin level: "+(string)admin_lv);
    integer remenu = TRUE;
    integer page = menu_page; // temp global tracker
    integer mode;
   
    if (m == "Setup" && admin_lv > 1) // open the config webpage
    {
        cfg_id = llGetSubString(llGenerateKey(),0,7);
        last_cfg_time = llGetUnixTime();
        string desc = "Open streaming player web configuration page: ";
        string url = srv_url + "/cfg/" + cfg_id;
        llLoadURL(k, desc, url);
        llRegionSayTo(k, 0, desc+url);
        remenu = FALSE;
    }
    else if (m == "Print" && admin_lv > 0) // print all available tracks and playlists to the user
    {
        integer pl = llGetListLength(playlists);
        while (~--pl)
        {
            string pln = llList2String(playlists, pl);
            list tracks = llParseString2List(llLinksetDataRead(pln), [SEP], []);
            llRegionSayTo(k, 0, "Playlist: " + pln);
            integer tl = llGetListLength(tracks);
            integer n=1;
            integer tt; // total time of playlist
            for(; n < tl; ++n)
            {
                list track_data = llParseStringKeepNulls(llLinksetDataRead(llList2String(tracks, n)), [SEP], []);
                integer tl = llList2Integer(track_data, 2);
                tt += tl;
                llRegionSayTo(k, 0, "  [" + ToPadMinSec(tl) + "] " + llList2String(track_data, 1) + "  " + llList2String(track_data, 0));
            }
            llRegionSayTo(k, 0, "Total: " + ToPadMinSec(tt) + ", " + StoreCheck(llLinksetDataAvailable()));
        }
    }
    else if (m == "Music Off")
    {
        player_state = -1;
        SetMedia(TRUE);
    }
    else if (m == "Music On")
    {
        player_state = 0;
        SetMedia(TRUE);
    }
    else if (m == "Playlists") // open the playlist selector
    {
        mode = 1;
        page=0;
    }
    else if (m == ">>") // change pages in the selector
    {
        mode = 1;
        ++page;
    }
    else if (m == "<<")
    {
        mode = 1;
        if (page)
            --page;
    }            
    else if (m == "Back")
    {
        page = -1;
    }
    else if (~(i = llListFindList(playlists, [m]))) // changing active playlist
    {
        ChangePlaylist(i);
        page = -1;
    }
    else
        remenu = FALSE;
    
    if (remenu && manual)
        BuildMenu((string)k, page, mode, cfg_channel);
}

// for adding users to user/manager list via the web config page
// called from dataserver or immediately in http event, depending on what was required to look up the user
AgentLookupReply()
{
    llHTTPResponse(llList2Key(rq_key_name, 0), 200, llDumpList2String(llList2List(rq_key_name, 1, 2), SEP));
    rq_key_name = [];
}

default
{
    state_entry()
    {
        RefreshURL();
        admins = llParseString2List(llLinksetDataRead("admins"), [SEP], []);
        //llListen(cfg_channel, "", "", "");
        LoadPlaylists();
        llSetTimerEvent(5);
        
        if (!~llListFindList(admins, [(string)llGetOwner()]))
        {
            admins += [(string)llGetOwner(), llGetUsername(llGetOwner()), 2];
            llLinksetDataWrite("admins",llDumpList2String(admins, SEP));
        }
    }
    
    // commands from the assistant script
    link_message(integer i, integer n, string m, key k)
    {
        if (DBG)llOwnerSay("LinkMsg=" + m);
        
        list args = llParseStringKeepNulls(m, [SEP], []);
        string arg;
        string op;
        integer did_play;
        
        for (i = 0, n = llGetListLength(args); i < n; ++i)
        {
            arg = llList2String(args, i);
            
            if(llOrd(arg, 0) == 35) // # 35
            {
                op = llGetSubString(arg, 1, -1);
                
                // single element operations
                if (op == "on")
                {
                    player_state = 0;
                    SetMedia(TRUE);
                }
                else if (op == "off")
                {
                    player_state = -1;
                    SetMedia(TRUE);
                }
            }
            else
            {
                if(op == "tr" || op == "qu")
                {
                    string data = llLinksetDataRead(arg);
                    
                    if (data != "")
                    {
                        integer i = llListFindList(playlists, [arg]);
                        if (~i)
                        {
                            if (op == "qu")
                            {
                                llRegionSayTo(k, 0, "Yikes!");
                            }
                            else
                                ChangePlaylist(i);
                        }
                        else
                        {
                            list track_data = llParseStringKeepNulls(data, [SEP], []);
                            string action = "Queueing ";
                            string uri = llList2String(track_data, 0);
                            string title = llList2String(track_data, 1);
                            manual_queue += [arg];
                            
                            if(op == "tr" && !did_play)
                            {
                                did_play = TRUE;
                                player_state = 0;
                                action = "Playing ";
                                future_track_id = ""; // forces a reshuffle
                                SetMedia(FALSE);
                                op = "qu";
                            }
                            llSay(0, action + title + " " + uri);
                        }
                    }
                }
                else if (op == "pl")
                {
                    integer i = llListFindList(playlists, [arg]);
                    if (~i)
                        ChangePlaylist(i);
                }
                else if (op == "cmd")
                {
                    ParseCmd(arg, k, FALSE);
                }
            }
        }
        /*
        //llOwnerSay("op="+op);
        if (op == "tr")
        {
            //string data = llLinksetDataRead(a2);
            integer n = 0;
            while (++n < llGetListLength(args))
            {
                string id = llList2String(args, n);
                string data = llLinksetDataRead(id);
                //llOwnerSay("track data: " + data);
                if (data != "")
                {
                    list track_data = llParseStringKeepNulls(data, [SEP], []);
                    string uri = llList2String(track_data, 0);
                    string title = llList2String(track_data, 1);
                    string action = "Queueing ";
                    if (a1 == "p" && n == 2)
                        action = "Playing ";
                    //integer duration = llList2Integer(track_data, 2);
                    llSay(0, action + title + " " + uri);
                    manual_queue += [id];
                    
                }
            }
            if (a1 == "p") // play immediately; 'tr/p/idnumber'
            {
                future_track_id = ""; // forces a reshuffle
                SetMedia();
            }
        }
        else if (op == "pl")
        {
            integer i = llListFindList(playlists, [a1]);
            if (~i)
                ChangePlaylist(i);
        }
        */
    }

    touch_start(integer n)
    {
        /*
        if (~ llListFindList(admins, [(string)llDetectedKey(0)]))
            BuildMenu((string)llDetectedKey(0), -1, 0, cfg_channel);
        else
            llRegionSayTo(llDetectedKey(0), 0, "You are not on the list of allowed users");
            */

    }
    
    listen(integer c, string n, key k, string m)
    {
        //ParseCmd(m, k, TRUE);
    }

    changed(integer c)
    {
        if (c & (CHANGED_REGION_START|CHANGED_REGION)) // anything that would invalidate the cap
            RefreshURL();
            
        else if (c & CHANGED_OWNER)
        {
            llLinksetDataReset();
            llResetScript();
        }
    }

    http_request(key rqid, string method, string body) // the place where things happen
    {
        //string header = llGetHTTPHeader(rqid, "x-query-string");
        string rawpath =  llGetHTTPHeader(rqid, "x-path-info");
        list path =  llParseString2List(rawpath, ["/"], []);
        string ip = llGetHTTPHeader(rqid, "x-remote-ip");
        string ua = llGetHTTPHeader(rqid, "user-agent");
        if (DBG) llOwnerSay("received " + method + " from ip=" + ip + /*" header=" + header +*/ " path=" + llDumpList2String(path, "/") + " body=" + llUnescapeURL(body));

        string rndver = (string)((integer)llFrand(0xFFFFFFF)); // github stale cache bypass hack, remove in final build
        string temp; // used for temp vars/outgoing replies
        string p0 = llList2String(path, 0);
       
        if ((string)rqid == srv_url) // reply to llHTTPRequest
        {
            if (method != URL_REQUEST_GRANTED)
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
                
                SetMedia(TRUE);
                return;
            }
        }
        else // request from something external
        {
            
            //if (DBG) llOwnerSay("\nPage request from " + ip + "\nuser-agent=" + llGetHTTPHeader(rqid, "user-agent") + "\nheader=" + header + "\npath=" + rawpath);
            
            llSetContentType(rqid, CONTENT_TYPE_XHTML); // this is required to get around blocking of HTML to external clients
            string p1 = llList2String(path, 1);
            string p2 = llList2String(path, 2);
            string p3 = llList2String(path, 3);
            string p4 = llList2String(path, 4);

            if (!llGetListLength(path) && method == "GET") // request for the initial client player webpage
            {
                if (player_state > -1 && is_anyone_home)
                    llHTTPResponse(rqid, 200, llReplaceSubString(html, "#VER", rndver, 0));
                else
                    llHTTPResponse(rqid, 503, "Media server is currently turned off or nonfunctional");
                
                if (DBG) llOwnerSay("Load request from " + ip + " " + ua);
                //llHTTPResponse(rqid, 200, html_init + "player" + html_init_tail);
            }

            else if (cfg_id != "" && p1 == cfg_id) // request related to the config page
            {
                if (DBG) llOwnerSay("CfgPage");
                if (llGetUnixTime() < last_cfg_time + 3600)
                {
                    last_cfg_time = llGetUnixTime();
                }
                else
                {
                    llHTTPResponse(rqid, 403, "Config page has expired"); 
                    return;
                }
                
                if (llGetListLength(path) == 2) // just the initial request: cap url + /cfg/<sessionID>
                {
                    llOwnerSay("Sending config webpage");
                    llHTTPResponse(rqid, 200, llReplaceSubString(html, "#VER", rndver, 0));
                    return;
                }
               
                if (p2 == "save") // config: various steps in saving a playlist; /cfg/<sessionID>/save
                {
                    if (p3 == "start") // start saving a playlist; /cfg/<sessionID>/save/start
                    {
                        saving_playlist = p4;
                        if (saving_playlist == "")
                        {
                            if (DBG) llOwnerSay("Error: playlist name is null");
                            return;
                        }
                        
                        if (DBG) llOwnerSay("Saving playlist " + saving_playlist);
                        saving_playlist_data = [body]; // shuffle randomness value
                        llHTTPResponse(rqid, 200, "NXT");
                        CleanupLinksetData();
                    }
                    else if (p3 == saving_playlist) // /cfg/<sessionID>/save/<saving_playlist>
                    {
                        if (p4 == "uri") // save a track to playlist; /cfg/<sessionID>/save/<saving_playlist>/uri + body=[uri, title, duration]
                        {
                            temp = "NXT";
                            list track = llParseStringKeepNulls(body, [SEP], []); 
                            string hash = llGetSubString(llComputeHash(llList2String(track, 0), "sha256"),0,15);
                            saving_playlist_data += [hash];
                            integer rem = llLinksetDataAvailable();
                            
                            if (rem < (llStringLength(body) * 2 + 64 + llGetListLength(saving_playlist_data) * 32)) // estimate size requirements + 32 extra bytes
                            {
                                temp = OOS + StoreCheck(rem);
                            }
                            else
                                llLinksetDataWrite(hash, body);
                                
                            if (DBG) llOwnerSay("Saved " + llList2String(track, 0) + " with ID " + hash);
                            
                            llHTTPResponse(rqid, 200, temp); // sus variable reuse
                        }
                        else if (p4 == "end") // confirm the save is completed on both ends; /cfg/<sessionID>/save/<saving_playlist>/end
                        {
                            temp = "END";
                            string dpl =  llDumpList2String(saving_playlist_data, SEP);
                            llLinksetDataWrite(saving_playlist, dpl);
                            llOwnerSay("Saved playlist " + saving_playlist);
                            
                            if (!~llListFindList(playlists, [saving_playlist]))
                                playlists += [saving_playlist];
                            
                            else if (saving_playlist == current_playlist)
                                SetMedia(FALSE);
                                
                            integer rem = llLinksetDataAvailable();
                            if (rem < (32 + llGetListLength(saving_playlist_data) * 32)) // estimate size requirements + 32 extra bytes
                            {
                                temp = OOS + StoreCheck(rem);
                            }
                            else
                            {
                                WritePlaylists();
                                temp += SEP + StoreCheck(rem);
                            }
                            
                            if (DBG) llOwnerSay("got final entry, confirming end");
                            llHTTPResponse(rqid, 200, temp);
                            
                            saving_playlist = "";
                            saving_playlist_data = [];
                        }
                    }
                    else
                    {
                        llHTTPResponse(rqid, 400, "Not a valid playlist save operation at this time");
                    }
                }
                
                else if (p2 == "admins") // related to adding/removing users; /cfg/<sessionID>/admins
                {
                    if (p3 == "lookup") // look up a user by name or UUID; /cfg/<sessionID>/admins/lookup
                    {
                        rq_key_name = [rqid];
                        //string get;
                        integer await;
                        
                        if (llStringLength(p4) == 36 && llSubStringIndex(p4, "-") == 8) // input looks like a valid UUID
                        {
                            rq_key_name += [p4]; // uuid
                            temp = llGetUsername(p4);
                            if (temp)
                            {
                                rq_key_name += [temp]; // name retrieved locally
                            }
                            else
                            {
                                await = TRUE;
                                rq_key_name += [llRequestUsername(p4)]; // request name from server via dataserver event
                            }
                        }
                        else // assume input is a username
                        {
                            temp = llName2Key(p4);
                            if (temp == NULL_KEY)
                            {
                                await = TRUE;
                                rq_key_name += [llRequestUserKey(p4)]; // request UUID from server via dataserver event
                            }
                            else
                            {
                                rq_key_name += [temp]; // key retrieved locally
                            }
                            rq_key_name += [p4]; // name
                        }
                        if (!await) //otherwise, wait for the dataserver event to be raised with Username/key request results
                            AgentLookupReply();
                    }
                    else if (p3 == "get") // load the user list; /cfg/<sessionID>/admins/get
                    {
                        llHTTPResponse(rqid, 200, llDumpList2String(admins, SEP));
                    }
                    else if (p3 == "save") // save changes to a user's access level; /cfg/<sessionID>/admins/save + body=[uuid, name, accesslevel]
                    {
                        list agent = llParseStringKeepNulls(body, [SEP], []);
                        integer i = llListFindList(admins, llList2List(agent, 0, 0));
                        
                        if (llList2Key(agent, 0) != llGetOwner())
                        {
                            if (p4 == "del") // remove a user; /cfg/<sessionID>/admins/save/del
                            {
                                if (~i)
                                    admins = llDeleteSubList(admins, i, i+2);
                            } 
                            else // write received user data to admins list
                            {
                                if (~i)
                                    admins = llListReplaceList(admins, agent, i, i+2);
                                else
                                    admins += agent;
                            }
                        
                            llLinksetDataWrite("admins",llDumpList2String(admins, SEP));
                            if (DBG)llOwnerSay("Admins Saved: " + llList2CSV(admins));
                        }
                        llHTTPResponse(rqid, 200, "ok");
                    }
                }
                
                else if (p2 == "playlists") // load list of playlists; /cfg/<sessionID>/playlists
                {
                    llHTTPResponse(rqid, 200, llDumpList2String(playlists, SEP));
                }
                
                else if (p2 == "playlist") // load a single playlist; /cfg/<sessionID>/playlist/<playlistName>
                {
                    temp = llLinksetDataRead(p3);
                    list playlist_track_IDs;
                    if (temp != "")
                    {
                        playlist_track_IDs = llParseStringKeepNulls(temp, [SEP], []);
                        integer n = llGetListLength(playlist_track_IDs);
                        while (--n) // ignore index 0, since it is the shuffle randomness float
                            // replace each track key with a slice of 0 to 1 from the equivalent track's data, discarding the duration value
                            playlist_track_IDs = llListReplaceList(playlist_track_IDs, llList2List(llParseString2List(llLinksetDataRead(llList2String(playlist_track_IDs, n)), [SEP], []), 0, 1), n, n);
                        
                        if (DBG) llOwnerSay("playlist = " + llList2CSV(playlist_track_IDs));
                        llHTTPResponse(rqid, 200, llDumpList2String(playlist_track_IDs, SEP));
                    }
                    else // found a way to rickroll user-error anyway
                        llHTTPResponse(rqid, 200, llDumpList2String(["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "Rick Astley - Never Gonna Give You Up"], SEP));
                }
                
                else if (p2 == "ren") // rename a playlist; /cfg/<sessionID>/ren/<oldName>/<newName>
                {
                    temp = "Error: playlist '" + p3 + "' does not exist";
                    string name = "err";
                    integer i = llListFindList(playlists, [p3]); // look for the old playlist name
                    
                    if (~llListFindList(playlists, [p4])) // look for the new name
                    {
                        temp = "Error: playlist '" + p4 + "' already exists, cannot rename '" + p3 + "'";
                    }
                    else if (~i) // old name exists, new name is free
                    {
                        playlists = llListReplaceList(playlists, [p4], i, i);
                        string pl = llLinksetDataRead(p3);
                        llLinksetDataDelete(p3);
                        llLinksetDataWrite(p4, pl);
                        WritePlaylists();
                        temp = "Renamed playlist '" + p3 + "' to '" + p4 + "'";
                        name = p4;
                    }
                    
                    llOwnerSay(temp);
                    LoadPlaylists();
                    llHTTPResponse(rqid, 200, name+SEP+temp);
                }
                
                else if (p2 == "del") // delete a playlist; /cfg/sessionID/del/<playlistName>
                {
                    temp = "Error: playlist '" + p3 + "' does not exist";
                    integer i = llListFindList(playlists, [p3]);
                    if (~i)
                    {
                        playlists = llDeleteSubList(playlists, i, i); // redundant with reload
                        WritePlaylists();
                        llLinksetDataDelete(p3);
                        temp = "Deleted playlist " + p3;
                        LoadPlaylists();
                    }
                    
                    llOwnerSay(temp);
                    llHTTPResponse(rqid, 200, temp);
                }
                else
                    llHTTPResponse(rqid, 400, ERR400);
            }
            
            else if (p0  == "next-track") // the media player page requests track data; /next-track
            {
                if (llGetUnixTime() > end_time)
                    ChangeTrack();
                
                //if (DBG) llOwnerSay("Sending track "+ cache_track_reply + " to " + ip);
                llHTTPResponse(rqid, 200, cache_track_reply); // contains current and next track address, title, and times
            }
            
            else
            {
                llHTTPResponse(rqid, 400, ERR400); // this is the sonorous warcry of a very angry frog
            }
        }
    }

    timer()
    {
        integer t = llGetUnixTime();
        
        if (srv_url == "err" && next_url_try < t) // llRequestURL failed, retrying
        {
            next_url_try = llGetUnixTime()+300;
            srv_url = llRequestURL();
        }
        
        // automatically turn the player off if nobody is around
        list agents = llGetAgentList(AGENT_LIST_PARCEL, []);
        integer an = llGetListLength(agents);
        if (is_anyone_home && !an)
        {
            is_anyone_home = FALSE;
            SetMedia(FALSE);
        }
        else if (!is_anyone_home && an)
        {
            is_anyone_home = TRUE;
            SetMedia(FALSE);
        }
    }
    
    dataserver(key rqid, string data)
    {
         // name or key lookup for adding people to the user/manager list
        integer i = llListFindList(rq_key_name, [rqid]);
        if (~i)
        {
            llOwnerSay("dataserver got missing agent data: " + data);
            rq_key_name = llListReplaceList(rq_key_name, [data], i, i);
            AgentLookupReply();
        }
    }
}
