
	var lslServer;
	var mode = 0; // 0: web player, 1: config
	//var newSCWidget;
	var oembedResult;
	/* example members
		author_name: "ArenaNet"
		author_url: "https://soundcloud.com/arenanet"
		description: "Composed by Lena Chappelle"
		height: 400
		html: '<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F229773401&show_artwork=true"></iframe>'
		provider_name: "SoundCloud"
		provider_url: "https://soundcloud.com"
		thumbnail_url: "https://i1.sndcdn.com/artworks-000133718345-oqwohz-t500x500.jpg"
		title: "GW2 Heart of Thorns - Tarir, The Forgotten City by ArenaNet"
		type: "rich"
		version: 1
		width: "100%"
	} */
	var lastGetTrackID; // ID of the last track info was retrieved from, to prevent repetitive calls
	var soundDuration; // length of current track ms
	
	var id_track_map = new Map();
	var id_scplayer_map = new Map();
	
	// basic library method vomit ect

	function ReplaceAll(str, tkn, rep)
	{
		var next;
		while((next = str.indexOf(tkn,next)) != -1)
		{
			str = ReplaceSub(str, rep, next, next + tkn.length);
			next += rep.length;
		}
		return str;
	}
	
	function ReplaceSub(str, rep, start, end)
	{
		return str.substr(0, start) + rep + str.substr(end);
	}
	
	function MakeXHR(handle, url, callbackFunction, message, method)
	{
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);
		xhr.onload = function()
		{
			if (xhr.readyState==4)
			{	
				if(xhr.status==200)
				{
					console.log("xhr response: "+xhr.response);
					callbackFunction(handle, xhr.response);
				}
				else
				{
					console.log("XHR " + url + "; non-ok status "+xhr.status);
				}
			}
		};
		xhr.onerror = function()
		{
			console.log("XHR " + url + " error " + xhr.statusText);
		};
		xhr.send(message);
	}
	
	// main page code
	
	function InitPage()
	{
		if(page_type == "player")
		{
			var ihtml = document.getElementById("sc_player_page").cloneNode(true).innerHTML;
			console.log("creating player from template");
			document.getElementById("main_body").insertAdjacentHTML("beforeend",ihtml);
			SC_CreateIframe("client_player_box");
		}
		else if(page_type == "config")
		{
			var ihtml = document.getElementById("sc_track_setup").cloneNode(true).innerHTML;
			console.log("creating setup from template");
			document.getElementById("main_body").insertAdjacentHTML("beforeend",ihtml);
		}
	}
	
	// config menu related functions
	
	function Btn_AddTrackURL()
	{
		var track_url = document.getElementById("text_input_url").value;
		console.log("Btn_AddTrackURL " + track_url);
		var ihtml = document.getElementById("sc_track_preview").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%title%", track_url);
		ihtml = ReplaceAll(ihtml, "%track%", "test");
		document.getElementById("sc_preview_scroll").insertAdjacentHTML("beforeend",ihtml);
		var iframe_id = (Math.random()*2147483647).toString(16);
		id_track_map.set("sc_iframe_preview_" + iframe_id, track_url);//"https://soundcloud.com/arenanet/gw2-heart-of-thorns-tarir-the-forgotten-city");
		SC_CreateIframe("preview_" + iframe_id);
	}

	// soundcloud/controls related functionality
	
	function SC_CreateIframe(insertTo)
	{
		var ihtml = document.getElementById("sc_iframe").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%id%", insertTo);
		console.log("creating iframe from template");
		document.getElementById(insertTo).insertAdjacentHTML("beforeend",ihtml);
	}
	
	function SC_IframeTemplate_onload(iframe)
	{
		console.log("iframe loaded: " + iframe.id);
		if(id_track_map.has(iframe.id) == false)
		{
			id_track_map.set(iframe.id, "");
			console.log("Requesting track from LSL server for " + iframe.id);
			LSL_GetNextTrack();
		}
		
		jQuery(document).ready(function()
		{
			var newSCWidget = SC.Widget(iframe.id);
			id_scplayer_map.set(iframe.id, newSCWidget)
			console.log("Created scWidget for id "+iframe.id);
			
			newSCWidget.bind(SC.Widget.Events.READY, SC_Widget_Event_READY(iframe.id));
			/*
			newSCWidget.bind(SC.Widget.Events.LOAD_PROGRESS, function()
			{
				console.log("lololoload"); // never executes
			});
			
			newSCWidget.bind(SC.Widget.Events.PLAY, function()
			{
				newSCWidget.getCurrentSound(getCurrentSound_callback); // when scope is sus
			});
			
			$('button').click(function()
			{
				newSCWidget.toggle();
			});
			*/
			console.log("setup complete");
		});
		//document.getElementById("playbtn").click();
	}
	
	function SC_Widget_Event_READY(iframe_id)
	{
		console.log("soundcloud widget " + iframe_id + " ready, attempting to play");
		var trackURL = id_track_map.get(iframe_id);
		var scWidget = id_scplayer_map.get(iframe_id);
		console.log("track URL = " + trackURL);
		SC_GetOembedURL(iframe_id, trackURL);
		//console.log("scWidget = " + scWidget);
	}
	
	function LSL_GetNextTrack()
	{
		MakeXHR("", lslServer+"/next-track", SC_GetOembedURL, "", "GET");
	}
	
	function getCurrentSound_callback(sound)
	{
		if(sound == null)
		{
			console.log("no sound loaded yet or an error occured");
			return;
		}
		
		if(sound.id == lastGetTrackID)
			return
		
		lastGetTrackID = sound.id;
		
		console.log("got sound data, updating display");
		
		// moved to oembed to get data earlier
		
		/*
		var img200 = ReplaceAll(sound.artwork_url, "large.jpg", "t200x200.jpg");
		
		if(image_exists(img500))
		{
			document.getElementById("icon").src = img500;
		}
		else if(image_exists(img200))
		{
			document.getElementById("icon").src = img200;
		}
		else
		{
			document.getElementById("icon").src = sound.artwork_url;
		}
		*/
		
		soundDuration = sound.duration / 1000.0;
		console.log("track duration = " + soundDuration.toString());
		
		MakeXHR("", sound.waveform_url, getWaveform_callback, "", "GET");
		
		console.log("properties in sound data:");
		for(var propertyName in sound)
		{
			console.log(propertyName + "=" + sound[propertyName]);
		}//*/
	}
	
	function getWaveform_callback(id, jsonstr)
	{
		//console.log("waveform="+jsonstr);
		var waveform = JSON.parse(jsonstr);
		console.log("waveform.height=" + waveform.height + " waveform.length=" + waveform.width +" keys="+waveform.samples);
		var hmul = 127.0 / parseFloat(waveform.height);
		var kfps = waveform.width / (soundDuration / 1000.0);
		console.log(hmul + " " + kfps);
		
		// compress and encode keyframes
		// reduce to 15 bit unicode chars: 5 bit magnitude, 10 bit length
	}
	
	function SC_LoadTrack(id, url)
	{
		var options = [];
		options.auto_play = true;
		options.download = false;
		options.show_artwork = true;
		options.show_playcount = false;
		options.sharing = false;
		options.hide_related = true;
		options.show_comments = false;
		options.show_user = false;
		options.show_reposts = false;
		options.show_teaser = false;
		//hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true
		//newSCWidget.load(url, options);
		id_scplayer_map.get(id).load(url, options);
	}
	
	function SC_GetOembedURL(id, url)
	{
		MakeXHR(id, "https://soundcloud.com/oembed?format=js&url="+url, SC_GetOembedURL_callback, "", "GET");
	}
	
	function SC_GetOembedURL_callback(id, jsonstr)
	{
		//console.log(jsonstr);
		if(jsonstr.substring(0, 1) === '(') // what the fuck is this round-edged safety json
			jsonstr = jsonstr.substring(1, jsonstr.length - 2);
		console.log(jsonstr);
		oembedResult = JSON.parse(jsonstr);
		console.log("SC_GetOembedURL_callback for " + id + " = " + oembedResult);
		var oembedHtml = oembedResult.html;
		var start = oembedHtml.indexOf("url=");
		var end = oembedHtml.indexOf("&", start);
		console.log(start + " " + end);
		var urlSubstr = oembedHtml.substring(start+4, end);
		console.log("url=" + urlSubstr);
		
		//document.getElementById("titlespan").innerHTML = oembedResult.title;
		//document.getElementById("icon").src = oembedResult.thumbnail_url;
		
		console.log("icon=" + oembedResult.thumbnail_url);
		
		SC_LoadTrack(id, decodeURI(urlSubstr));
		
		//newSCWidget.getCurrentSound(getCurrentSound_callback);
		//newSCWidget.play();
	}
	
	document.onclick = function(event)
	{
		if(page_type != "player")
			return;
		
		//if (event===undefined) event= window.event;
		//var target = 'target' in event? event.target : event.srcElement;
		
		//newSCWidget.play();
	}
	
	console.log("var page_type = " + page_type);
	
	lslServer = window.location.href;

	InitPage();
	
	//SC_CreateIframe("iframebox");
	
	//SC_GetOembedURL("https://soundcloud.com/arenanet/gw2-heart-of-thorns-tarir-the-forgotten-city");
	
