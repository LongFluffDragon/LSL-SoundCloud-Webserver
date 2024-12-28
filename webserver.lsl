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
string current_track; // uri of upcoming/currently playing track
integer start_time;
integer end_time;
string track_waveform; // encoded waveform binary data for active soundcloud track

// playlist data
list playlists = ["Default"];
list playlist_keys; // URIs/LSD keys for current playlist
float playlist_randomness = .2;
//integer playlist_progress;

string saving_playlist; // name of current playlist data being received to save to LSD
list playlist_track_hash;

refreshURL()
{
    llReleaseURL(srv_url);
    srv_url = llRequestURL();
}

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

default
{
    state_entry()
    {
        refreshURL();
    }

    touch_start(integer n)
    {
        if(llDetectedKey(0) == llGetOwner())
        {
            cfg_id = llGetSubString(llGenerateKey(),0,7);
            last_cfg_time = llGetUnixTime();
            llLoadURL(llGetOwner(), "Soundcloud web player configuration page", srv_url+"/cfg/"+cfg_id);
        }
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
                llOwnerSay(method + ": " + body + ", retrying in 10 minutes");
                llSetTimerEvent(600);
            }
            else
            {
                llOwnerSay("Audio webserver operational at " + body + ", click to open setup");
                srv_url = body;
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

            if( !llGetListLength(path) && method == "GET")
            {
                llHTTPResponse(id, 200, llDumpList2String(llParseStringKeepNulls(html_init + "player" + html_init_tail, ["#VER"], []), rndver ));
                //llHTTPResponse(id, 200, html_init + "player" + html_init_tail);
            }

            else if(cfg_id != "" && llList2String(path, 1) == cfg_id) // config page is being displayed
            {
                llOwnerSay("CfgPage");
                if(llGetListLength(path) == 2)
                {
                    llHTTPResponse(id, 200, llDumpList2String(llParseStringKeepNulls(html_init + "config" + html_init_tail, ["#VER"], []), rndver ));
                   // llHTTPResponse(id, 200, html_init + "config" + html_init_tail);
                    return;
                }

                string p2 = llList2String(path, 2);

                if(p2 == "save")
                {
                    if(body == "CLR") // start saving a playlist
                    {
                        saving_playlist = llList2String(path, 3);
                        if(saving_playlist == "")
                        {
                            llOwnerSay("Error: playlist name is null");
                            return;
                        }
                        llOwnerSay("Saving playlist " + saving_playlist);
                        //llLinksetDataReset();
                        playlist_track_hash = [];
                        //llLinksetDataDelete(saving_playlist);
                        llHTTPResponse(id, 200, "NXT");
                    }
                    else if(body == "END") // finish saving a playlist
                    {
                        string dpl =  llDumpList2String(playlist_track_hash, "|");
                        llLinksetDataWrite(saving_playlist, dpl);
                        
                        llOwnerSay("got final entry, confirming end");
                        llOwnerSay(saving_playlist + ": " + dpl);
                        llHTTPResponse(id, 200, "END");
                        //list lsdk = llLinksetDataListKeys(0,-1);
                        //llOwnerSay("Saved track URIs: " + llList2CSV(lsdk));
                    }
                    else if(llList2String(path, 3) == saving_playlist) // save a track to playlist
                    {
                        list track = llParseStringKeepNulls(body, ["#|"], []); 
                        string hash = llGetSubString(llComputeHash(llList2String(track, 0), "sha256"),0,15);
                        //llOwnerSay(llList2String(track, 0) + " sha256 = " + hash);
                        playlist_track_hash += [hash];
                        llLinksetDataWrite(hash, body);
                        llOwnerSay("Saved " + llList2String(track, 0) + " with ID " + hash);
                        
                        llHTTPResponse(id, 200, "NXT");
                        
                        /*
                        integer uri_len = llOrd(body, 0) - 255;t
                        string uri = llGetSubString(body, 1, uri_len);

                        body = llGetSubString(body, uri_len+1, -1);
                        integer avbytes = llLinksetDataAvailable();
                        if( (llStringLength(body) + llStringLength(uri)) * 2 + 64 > avbytes)
                        {
                            llOwnerSay("ERROR: 128kb LinksetData memory limit reached, entire playlist cannot be saved");
                            llHTTPResponse(id, 200, "END");
                        }
                        else
                        {
                            llLinksetDataWrite(uri, body);
                            llOwnerSay("Wrote "+uri+": "+body);
                            llHTTPResponse(id, 200, "NXT");
                        }
                        */
                    }
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
                    list pl;
                    if(gpl != "")
                    {
                        pl = llParseStringKeepNulls(gpl, ["|"], []);
                        integer n = llGetListLength(pl);
                        while(~--n)
                            pl = llListReplaceList(pl, llList2List(llParseString2List(llLinksetDataRead(llList2String(pl, n)), ["#|"], []), 0, 0), n, n);
                        llOwnerSay("playlist = " + llList2CSV(pl));
                    }
                    llHTTPResponse(id, 200, llDumpList2String(pl, "|"));
                }
                
                else if (p2 == "delete")
                {
                    string pl = llList2String(path, 3);
                    llOwnerSay("Deleting playlist " + pl);
                    llLinksetDataDelete(pl);
                    llHTTPResponse(id, 200, pl);
                }

                else if(p2 == "tracks")
                {
                    list uris = llLinksetDataListKeys(0, -1);
                    llHTTPResponse(id, 200, llDumpList2String(uris, "|"));
                }
                
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

            else if(p0  == "next-track")
            {
                integer t = llGetUnixTime();
                
                if( (t > end_time + 600))
                {
                    llOwnerSay("Resetting tracks");
                    
                    playlist_keys = llParseString2List(llLinksetDataRead("Default"), ["|"], []);
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
                    list track_data = llParseStringKeepNulls(llLinksetDataRead(llList2String(playlist_keys, next)), ["#|"], []);
                    current_track = llList2String(track_data, 0);//llList2String(playlist_keys, next);
                    playlist_keys = llDeleteSubList(playlist_keys, next, next) + [current_track];
                    llOwnerSay("Post-shuffle: " + llList2CSV(playlist_keys));
                    start_time = t+10;
                    end_time = start_time + llList2Integer(track_data, 2); // temp, parse duration of track from lsd value
                }
                /*
                list uris = llLinksetDataListKeys(0, -1);
                string uri = llList2String(uris, llRound(llFrand(llGetListLength(uris)-1)));
                current_track = uri; // temporary
                */
                
                llOwnerSay("Sending track "+ current_track + " to " + ip);
                llHTTPResponse(id, 200, current_track + "|" + (string)start_time);
            }
            
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
        srv_url = llRequestURL();
        llSetTimerEvent(0);
    }
}
