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
<script src=\"http://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js\"></script>
<script src=\"https://www.youtube.com/iframe_api\"></script>
<script src=\"http://w.soundcloud.com/player/api.js\"></script>
<script src=\"https://longfluffdragon.github.io/LSL-SoundCloud-Webserver/musicplayer-injector.js?version=#VER\"></script>
<script src=\"https://longfluffdragon.github.io/LSL-SoundCloud-Webserver/musicplayer-main.js?version=#VER\"></script></html>";

string current_track; // uri of upcoming/currently playing track
string track_waveform; // encoded waveform binary data for active soundcloud track

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
        llOwnerSay("received " + method + " from " + ip + "\nheader=" + header + "\npath=" + llDumpList2String(path, "/") + "\nbody=" + llUnescapeURL(body));

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
            llOwnerSay("NoHeader");
                
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
                    if(body == "CLR")
                    {
                        llLinksetDataReset();
                        llHTTPResponse(id, 200, "NXT");
                    }
                    else if(body == "END")
                    {
                        llOwnerSay("got final entry, confirming end");
                        llHTTPResponse(id, 200, "END");
                        list lsdk = llLinksetDataListKeys(0,-1);
                        llOwnerSay("Saved track URIs: " + llList2CSV(lsdk));
                    }
                    else
                    {
                        integer uri_len = llOrd(body, 0) - 255;
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
                    }
                }

                else if(p2 == "tracks")
                {
                    list uris = llLinksetDataListKeys(0, -1);
                    llHTTPResponse(id, 200, llDumpList2String(uris, "|"));
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
                list uris = llLinksetDataListKeys(0, -1);
                string uri = llList2String(uris, llRound(llFrand(llGetListLength(uris)-1)));
                current_track = uri; // temporary
                llOwnerSay("Sending track "+uri);
                llHTTPResponse(id, 200, uri + "|" + (string)(llGetUnixTime() - 30));
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