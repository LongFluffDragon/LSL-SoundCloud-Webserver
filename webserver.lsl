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
integer current_track_vol; // relative volume adjustment for the track
integer start_time; // current track intended start time
integer end_time; // current track intended end time
// eqivalent to above; selected tracks are stored here, then moved to current upon completion of the previous current track
string future_track_id;
string future_track_uri;
string future_track_title;
integer future_track_duration;
integer future_track_start_time;
integer future_track_vol;

// playlist data
list playlists; // names of all created playlists, mirrored in linksetdata
float playlist_randomness; // 0-1 value defining shuffle behavior of the current track
float pl_rnd_buf; // playlist randomness buffer value filled by ReadPlaylist
list pl_id_buf; // playlist track id buffer filled by ReadPlaylist
string cache_track_reply; // the most recent reply to next track requests is cached and changed when the track does
list manual_queue; // list of track IDs, future tracks will be taken from this before shuffling them from current playlist
list auto_queue; // track IDs automatically taken from playlists

integer track_interval = 15; // seconds between finishing and starting tracks

integer autoplay_state; // if autoplay has been manually turned on
integer manual_state; // if temporary queue play is enabled
integer media_state; // if prim media is enabled 
integer is_anyone_home; // tracks if there are potential listeners in the parcel or sim
integer next_url_try = 0x7FFFFFFF; // time of next attempt at getting a URL
integer last_nearby_time; // tracks the last time someone was in the parcel, to turn off the player when idle
integer shutoff_period = 600; // the time before shutoff occurs automatically


// temporary values while saving changes to a playlist
string saving_playlist; // name of current playlist data being received to save to LSD
list saving_playlist_data; // randomness value + all track IDs, received from the config page

list reserved_lsdk = ["playlists", "current_playlist", "admins", "state", "ma-config"]; // keys to never delete from linkset data when cleaning, doubles as constants

// config/user data
list admins; // strides of [str key, str name, int accesslevel]

// admin config request temp data
list rq_key_name; // [http request handle, key dataserver request, name dataserver request]

// no touch
integer media_link = LINK_THIS;
integer media_face = 3;

string SEP = " "; // Unicode Character 8200 (U+2008) 0xE2 0x80 0x88, separator for serialized data

string OOS = "Error: no storage remaining to write playlist\n";
string ERR400 = "Invalid or unknown request";

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

SetPlayerState(integer s) // enable or disable autoplay, then updates media state
{
    autoplay_state = s;
    llLinksetDataWrite(llList2String(reserved_lsdk, 3), (string)autoplay_state); // "state"
    SetMedia(TRUE);
}

SetMedia(integer verbose)
{
    //manual_state = !!llGetListLength(manual_queue); // double boolean inversion to get 0 or 1 value
    end_time = 0; // force a track refresh on next request
    llClearLinkMedia(media_link, media_face);
    llSleep(1);
    integer s = (autoplay_state | manual_state) & is_anyone_home;
    llOwnerSay(llList2CSV([autoplay_state, manual_state, is_anyone_home, s, media_state]));
    
    if (s != media_state && verbose)
    {
        if (s)
            llSay(0, "Music player turning on..");
        else
            llSay(0, "Music player turned off");
    }
    if (media_state = s) // yes, this is boolean evaluation of an assignment
    {
        llSetLinkMedia(media_link, media_face, [
                PRIM_MEDIA_AUTO_PLAY, TRUE,
                PRIM_MEDIA_HEIGHT_PIXELS, 1024,
                PRIM_MEDIA_WIDTH_PIXELS, 1024,
                PRIM_MEDIA_PERMS_CONTROL, PRIM_MEDIA_PERM_NONE,
                PRIM_MEDIA_FIRST_CLICK_INTERACT, TRUE,
                PRIM_MEDIA_CURRENT_URL, srv_url
            ]);
    }
}

LoadPlaylists()
{
    playlists = llParseString2List(llLinksetDataRead(llList2String(reserved_lsdk, 0)), [SEP], []); // get "playlists"
    current_playlist = llLinksetDataRead(llList2String(reserved_lsdk, 1)); // get "current_playlist"
    
    if (DBG)llOwnerSay("current playlist = " + current_playlist);
    
    if (!llGetListLength(playlists)) // rickrolling people who try to delete all their playlists is too much work
    {
        playlists = ["Default"];
        current_playlist = "Default";
    }
    else
    {
        if (current_playlist == "" || !~ llListFindList(playlists, [current_playlist])) // if invalid, use first loaded playlist
            current_playlist = llList2String(playlists, 0);

        //ReadCurrentPlaylist();
    }
    CleanupLinksetData();
}

WritePlaylists()
{
    llLinksetDataWrite(llList2String(reserved_lsdk, 0), llDumpList2String(playlists, SEP));
}

// called from ChangeTrack on time-based reset, and TrackFromQueue when a playlist finishes
QueueCurrentPlaylist()
{
    //auto_queue = llParseString2List(llLinksetDataRead(current_playlist), [SEP], []); // randomness value + track IDs
    //playlist_randomness = llList2Float(auto_queue, 0);
    //auto_queue = llDeleteSubList(auto_queue, 0, 0); // discard the randomness value, leaving only track IDs
    
    ReadPlaylist(current_playlist, TRUE);
    auto_queue = pl_id_buf; //ShuffleQueue(pl_id_buf, pl_rnd_buf);
    pl_id_buf = [];
}

// reads a playlist from linksetdata into the pl_xx_buf variables
ReadPlaylist(string id, integer shuf)
{
    pl_id_buf = llParseString2List(llLinksetDataRead(id), [SEP], []); // randomness value + track IDs
    pl_rnd_buf = llList2Float(pl_id_buf, 0);
    pl_id_buf = llDeleteSubList(pl_id_buf, 0, 0); // discard the randomness value, leaving only track IDs
    if (shuf)
    {
        integer i;
        list s;
        while (pl_id_buf)
        {
            i = llRound(llFrand((float)(llGetListLength(pl_id_buf) - 1) * pl_rnd_buf));
            s += llList2List(pl_id_buf, i, i);
            pl_id_buf = llDeleteSubList(pl_id_buf, i, i);
        }
        pl_id_buf = s;
    }
}

// shuffles a list of tracks based on a level of randomness
// called from TrackFromQueue when the autoplay queue is empty
list ShuffleQueue(list tracks, float rr)
{
    integer i;
    list out;
    while(tracks)
    {
        i = llRound(llFrand((float)(llGetListLength(tracks) - 1) * rr));
        out += llList2List(tracks, i, i);
        tracks = llDeleteSubList(tracks, i, i);
    }
    return out;
}

// shifts the future track to the current track, then gets a new future track. caches both into a payload string
// called from http_request by client requesting track data, when the previous data has expired
NextTrack()
{
    integer t = llGetUnixTime();
    
    if (t > end_time + 600) // reset completely if over 10 minutes without anyone using the player
    {
        if (DBG) llOwnerSay("\n\n!! Resetting tracks !!\n");
        future_track_id = "";
        current_track_id = "";
        auto_queue = manual_queue = [];
    }
    
    if (future_track_id == "") // do an extra shuffle if there is not already a track, ie on fresh start
        TrackFromQueue();
    
    if (future_track_id == "") // cant find a valid track, flag manual play as over and disable autoplay
    {
        if (DBG) llOwnerSay("DEBUG: no valid tracks remain, disabling player");
        manual_state = FALSE;
        SetPlayerState(FALSE);
        SetMedia(FALSE);
        return;
    }
    
    // replace current track with future one
    current_track_id = future_track_id;
    current_track_uri = future_track_uri;
    current_track_title = future_track_title;
    current_track_duration = future_track_duration;
    current_track_vol = future_track_vol;
    start_time = future_track_start_time;
    end_time = start_time + future_track_duration;
    
    TrackFromQueue(); // select a new future track
    
    cache_track_reply = llDumpList2String ( // this is what gets sent to the player webpage
    [
        current_track_uri,
        start_time,
        future_track_uri,
        future_track_start_time,
        current_track_title,
        future_track_title,
        current_track_duration,
        future_track_duration,
        current_track_vol,
        future_track_vol
    ], SEP);
    
    if (DBG) llOwnerSay("Tracks changed; current=" + current_track_uri + ", future=" + future_track_uri); 
    //llSetText("FreeMem=" + (string)llGetFreeMemory(), <1,1,1>, 1.0);
}

// Gets the next track from the manual or autoplay queues, shuffles autoplay as needed
// Called from NextTrack until current_track_id and future_track_id are valid
TrackFromQueue()
{
    string next; // ID of the selected track, or empty if none is available
    
    integer t = llGetUnixTime();
    if (end_time < t)
        end_time = t; // pretend the last track just ended now, if there is no prior state
        
    llOwnerSay("manual_queue=" + llList2CSV(manual_queue));
    if (manual_queue) // tracks added by message from the assistant script via AddTracksToQueue
    {
        next = llList2String(manual_queue, 0);
        if (DBG) llOwnerSay("Future track id from manual queue: " + next);
        manual_queue = llDeleteSubList(manual_queue, 0, 0);
    }
    
    else if (autoplay_state)
    {
        if (auto_queue == []) // the autoplay queue is empty; read from the current playlist
        {
            QueueCurrentPlaylist();
            //auto_queue = ShuffleQueue(auto_queue, playlist_randomness);
            if (DBG) llOwnerSay("Generated autoqueue: " + llList2CSV(auto_queue));
        }
        next = llList2String(auto_queue, 0);
        if (DBG) llOwnerSay("Future track id from autoqueue: " + next);
        auto_queue = llDeleteSubList(auto_queue, 0, 0);
    }
    
    if (next)
    {
        list track_data = llParseStringKeepNulls(llLinksetDataRead(next), [SEP], []);
        future_track_id = next;
        future_track_uri = llList2String(track_data, 0);
        future_track_title = llList2String(track_data, 1);
        future_track_duration = llList2Integer(track_data, 2);
        future_track_vol = llList2Integer(track_data, 3);
        future_track_start_time = end_time + track_interval;
        if (DBG) llOwnerSay("Future track title: " + future_track_title);
    }
    
    else
        future_track_id = next; // empty, indicates error or finished
}


// queues a track manually. these will be played before pulling from the autoplay queue
// called by link messages from the assistant script to play/queue individual tracks
AddTracksToQueue(list tracks, integer urgent)
{
    string data = llLinksetDataRead(llList2String(tracks, 0));
    list track_data = llParseStringKeepNulls(data, [SEP], []);
    string title = llList2String(track_data, 1);
    manual_state = TRUE;
    llOwnerSay("DEBUG queueing track " + title);
    
    if(urgent)
    {
        manual_queue = tracks + manual_queue; // insert at start of queue
        if (future_track_id != "" && !llGetListLength(manual_queue))
            auto_queue = [future_track_id] + auto_queue; // push the future track back onto the autoplay queue so it is not skipped due to the reset and plays once manual is done
        future_track_id = ""; // forces a reacquisition of the next track from queue
    }
    else
    {
        manual_queue += tracks; // insert at end of queue, low priority
    }
    
    if (!media_state || urgent)
    {
        SetMedia(FALSE);
    }
    
    integer t = llGetUnixTime();
    if (end_time < t)
        end_time = t;
    
   
    
    llOwnerSay("DEBUG manual queue = " + llList2CSV(manual_queue));
}

ChangePlaylist(integer pli)
{
    string new = llList2String(playlists, pli);
    if(new == current_playlist)
        return;
    current_playlist = new;
    //playlist_remaining_range = -1;
    auto_queue = manual_queue = [];
    manual_state = FALSE;
    llLinksetDataWrite(llList2String(reserved_lsdk, 1), current_playlist); // save current playlist
    llSay(0, "Changing playlist to " + current_playlist);
    SetMedia(FALSE);
}

// get all LSD keys, search to find out what ones are useful data, and delete any unknown/useless ones
// called when saving a playlist from the web UI, or on load
CleanupLinksetData()
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

// called from link messages from the assistant script
ParseCmd(string m, key k)
{
    integer i = llListFindList(admins, [(string)k]);
    integer admin_lv = llList2Integer(admins, i+2);
    if (DBG) llOwnerSay("Admin level: "+(string)admin_lv);
    
    integer ttt;
   
    if (m == "CFG" && admin_lv > 1) // open the config webpage
    {
        cfg_id = llGetSubString(llGenerateKey(),0,7);
        last_cfg_time = llGetUnixTime();
        string desc = "Open streaming player web configuration page: ";
        string url = srv_url + "/cfg/" + cfg_id;
        llLoadURL(k, desc, url);
        llRegionSayTo(k, 0, desc+url);
    }
    else if (m == "WEB" && admin_lv > 1) // open the player in webpage
    {
        string desc = "Open streaming player in web browser: ";
        string url = srv_url;
        llLoadURL(k, desc, url);
        llRegionSayTo(k, 0, desc+url);
    }
    else if (m == "LT" && admin_lv > 0) // print all available tracks and playlists to the user
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
            llRegionSayTo(k, 0, "  Total: " + ToPadMinSec(tt));
            ttt += tt;
        }
        llRegionSayTo(k, 0, "All Playlists: " + ToPadMinSec(ttt) + ", " + StoreCheck(llLinksetDataAvailable()));
    }
}

// for adding users to user/manager list via the web config page
// called from dataserver or immediately in http event, depending on what was required to look up the user
AgentLookupReply()
{
    llHTTPResponse(llList2Key(rq_key_name, 0), 200, llDumpList2String(llList2List(rq_key_name, 1, 2), SEP));
    rq_key_name = [];
}

// automatically turn the player off if nobody is around
// called by timer and on startup
CheckNearby()
{
    
    list agents = llGetAgentList(AGENT_LIST_PARCEL, []);
    integer an = llGetListLength(agents);
    integer t = llGetUnixTime();
    
    if(an)
        last_nearby_time = t;
    
    if (is_anyone_home && !an && t > last_nearby_time + shutoff_period)
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

default
{
    state_entry()
    {
        RefreshURL();
        
        autoplay_state = (integer)llLinksetDataRead(llList2String(reserved_lsdk, 3)); // "state"
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
                    //autoplay_state = TRUE;
                    //SetMedia(TRUE);
                    SetPlayerState(TRUE);
                }
                else if (op == "off")
                {
                    //autoplay_state = FALSE;
                    //SetMedia(TRUE);
                    SetPlayerState(FALSE);
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
                            ReadPlaylist(arg, TRUE);
                            if (pl_id_buf) // valid playlist data was read into buffer
                            {
                                if (op == "qu")
                                {
                                    AddTracksToQueue(pl_id_buf, FALSE);
                                }
                                else
                                {
                                    AddTracksToQueue(pl_id_buf, TRUE);
                                }
                                pl_id_buf = [];
                            }
                        }
                        else
                        {
                            AddTracksToQueue([arg], !did_play && op != "qu");
                            
                            if(op == "tr" && !did_play)
                            {
                                did_play = TRUE;
                            }
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
                    ParseCmd(arg, k);
                }
            }
        }
       
    }

    changed(integer c)
    {
        if (c & (CHANGED_REGION_START|CHANGED_REGION)) // anything that would invalidate the cap
            RefreshURL();
            
        else if (c & CHANGED_OWNER)
        {
            //llLinksetDataReset();
            llLinksetDataDelete("admins");
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
        
        if (llSubStringIndex(ua, "SecondLife") == -1) // remote browser client
            last_nearby_time = llGetUnixTime(); // never shut off if someone is remotely connected
       
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
                CheckNearby();
                llSay(0, "Restart complete; audio server operational at " + body);
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
            string p3 = llUnescapeURL(llList2String(path, 3));
            string p4 = llUnescapeURL(llList2String(path, 4));

            if (!llGetListLength(path) && method == "GET") // request for the initial client player webpage
            {
                if ((autoplay_state|manual_state) && is_anyone_home)
                    llHTTPResponse(rqid, 200, llReplaceSubString(html, "#VER", rndver, 0));
                else
                    llHTTPResponse(rqid, 503, "Media server is currently turned off or nonfunctional");
                
                if (DBG) llOwnerSay("Load request from " + ip + " " + ua);
                //llHTTPResponse(rqid, 200, html_init + "player" + html_init_tail);
            }
                        
            else if (p0  == "next-track") // the media player page requests track data; /next-track
            {
                if (llGetUnixTime() > end_time)
                    NextTrack();
                
                llHTTPResponse(rqid, 200, cache_track_reply); // contains current and next track address, title, and times
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
                    if (p3 == "start") // start saving a playlist; /cfg/<sessionID>/save/start/<saving_playlist>
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
                        if (p4 == "uri") // save a track to playlist; /cfg/<sessionID>/save/<saving_playlist>/uri/nondefault + body=[uri, title, duration, volume]
                        {
                            integer nondefault = llUnescapeURL(llList2String(path, 5)) == "ndft"; // TODO pass flag from webpage
                            temp = "NXT";
                            list track = llParseStringKeepNulls(body, [SEP], []);
                            string hash = llGetSubString(llComputeHash(llList2String(track, 0), "sha256"),0,15); // use hash of the URI as the key, prevents duplications
                            saving_playlist_data += [hash];
                            
                            if (llLinksetDataRead(hash) == "" || nondefault) // dont overwrite existing track data with defaults from creation
                            {
                                integer rem = llLinksetDataAvailable();
                                if (rem < (llStringLength(body) * 2 + 64 + llGetListLength(saving_playlist_data) * 32)) // estimate size requirements + 32 extra bytes
                                {
                                    temp = OOS + StoreCheck(rem);
                                }
                                else
                                    llLinksetDataWrite(hash, body);
                                    
                                if (DBG) llOwnerSay("Saved " + llList2String(track, 0) + " with ID " + hash);
                            }
                            
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
                    list tracks;
                    if (temp != "")
                    {
                        tracks = llParseStringKeepNulls(temp, [SEP], []);
                        integer n = llGetListLength(tracks);
                        while (--n) // ignore index 0, since it is the shuffle randomness float
                        {
                            // replace each track key with a slice of 0 to 1 from the equivalent track's data, discarding the duration value
                            //list rep = llList2List(llParseString2List(llLinksetDataRead(llList2String(tracks, n)), [SEP], []), 0, 1);
                            list td = llParseString2List(llLinksetDataRead(llList2String(tracks, n)), [SEP], []);
                            //tracks = llListReplaceList(tracks, llList2List(td, 0, 1) + llList2List(td, 3, 3), n, n);
                            tracks = llListReplaceList(tracks, llList2List(td, 0, 1) + llList2Integer(td, 3), n, n);
                        }
                        if (DBG) llOwnerSay("playlist = " + llList2CSV(tracks));
                        llHTTPResponse(rqid, 200, llDumpList2String(tracks, SEP));
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
        CheckNearby();
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
