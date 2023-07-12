string srv_url;

string html_test = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">
  <head>
    <title>Loading</title>
  </head>
  <body>
      <iframe width=\"100%\" height=\"300\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/229773401&amp;auto_play=true\"></iframe>
    
    <div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\">
        <a href=\"https://soundcloud.com/arenanet\" title=\"ArenaNet\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">ArenaNet</a> · 
        <a href=\"https://soundcloud.com/arenanet/gw2-heart-of-thorns-tarir-the-forgotten-city\" title=\"GW2 Heart of Thorns - Tarir, The Forgotten City\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">GW2 Heart of Thorns - Tarir, The Forgotten City</a>
    </div>
  </body>
</html>";

// <script src=\"https://drive.google.com/uc?id=1wtC35shBByqTVYtsZeJZnV6ZOgRQy6F8\" type=\"text/javascript\" charset=\"utf-8\"></script>

default
{
    state_entry()
    {
        srv_url = llRequestURL();
    }

    touch_start(integer n)
    {

    }
    /*
    http_response(key id, integer sts, list md, string body)
    {

    }*/

    http_request(key id, string method, string body)
    {
        string header = llGetHTTPHeader(id,"x-query-string");
        list path =  llParseString2List(llGetHTTPHeader(id,"x-path-info"),["/"],[]);
        string ip = llGetHTTPHeader(id,"x-remote-ip");
        llOwnerSay("received "+method+": header="+header+" path="+llDumpList2String(path,"/")+" body="+body);

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
            }
        }
        else if(header == "")
        {
            llSetContentType(id, CONTENT_TYPE_XHTML);
            llOwnerSay("Page request from " + ip + " user-agent="+llGetHTTPHeader(id, "user-agent"));
            llHTTPResponse(id, 200, html_test);
        }

    }

    timer()
    {
        srv_url = llRequestURL();
        llSetTimerEvent(0);
    }
}