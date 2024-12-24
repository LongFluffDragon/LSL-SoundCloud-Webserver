
	/*
	
		Disclaimer: javascript is a horrible little crab and i am making no effort to play by it's rules or respect it's crab-like tendencies
	
	*/

	var lslServer; // this exists, somewhere. It may even be a cloud of some kind!
	var loaded_track_uri_map = new Map(); // IDs to source url + embed uri pairs
	var id_scplayer_map = new Map(); // IDs to soundcloud iframe objects
	
	var save_track_index = 0;
	
	var next_track = ""; // next soundcloud track the player should load
	var next_track_start_time;
	var main_sc_player_widget;
	
	var SC_PRV_ID_PFX = "sc_track_preview_";
	var SC_PREVIEW_SCROLLBOX = "sc_preview_scroll";
	
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
					if(callbackFunction	!= null)
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
	
	//
	// main page code
	//
	
	function InitPage()
	{
		if(page_type == "player")
		{
			var ihtml = document.getElementById("TMP_sc_player_page").cloneNode(true).innerHTML;
			console.log("creating player from template");
			document.getElementById("main_body").insertAdjacentHTML("beforeend",ihtml);
			LSL_GetNextTrack();
			//SC_CreateIframe("client_player_sc_iframe", "client_player_box");
		}
		else if(page_type == "config")
		{
			var ihtml = document.getElementById("TMP_sc_track_setup").cloneNode(true).innerHTML;
			console.log("creating setup from template");
			document.getElementById("main_body").insertAdjacentHTML("beforeend",ihtml);
		}
	}
	
	//
	// config menu mode functions
	//
	
	function Btn_AddTrackURL()
	{
		var track_url = document.getElementById("text_input_url").value;
		document.getElementById("text_input_url").value = ""; // cant cache object, what fun
		AddTrackURL(track_url);
	}
	
	function AddTrackURL(track_url)
	{
		console.log("AddTrackURL " + track_url);
		var track_id = Math.floor(Math.random()*2147483647).toString(16);
		var if_id = SC_PRV_ID_PFX + track_id;
		
		// create the preview panel
		var ihtml = document.getElementById("TMP_sc_track_preview").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%title%", track_url);
		ihtml = ReplaceAll(ihtml, "%track%", track_id);
		document.getElementById(SC_PREVIEW_SCROLLBOX).insertAdjacentHTML("beforeend", ihtml);
		
		// record the track source and uri object
		var track_obj = {src_url:track_url, uri:""};
		loaded_track_uri_map.set(if_id, track_obj);
		var add_to = "preview_iframe_" + track_id;
		console.log("Added '" + if_id + "' to loaded_track_uri_map, creating iframe in " + add_to);
		
		if(track_url.includes("api.soundcloud.com"))
		{
			SC_CreateIframe(if_id, add_to);
		}
		else if(track_url.includes("youtube"))
		{
			YT_CreateIframe(if_id, add_to);
		}
	}
	
	function Btn_RemoveTrackID(track)
	{
		console.log("Removing preview track: " + track);
		loaded_track_uri_map.delete(SC_PRV_ID_PFX + track);
		document.getElementById("preview_scroll_" + track).remove();
	}
	
	function Btn_LoadPlaylist()
	{
		MakeXHR("", lslServer+"/tracks", LSL_LoadPlaylist_Callback, "", "GET");
	}
	
	function LSL_LoadPlaylist_Callback(handle, body)
	{
		console.log("LSL_LoadPlaylist_Callback: " + body);
		var track_uris = body.split("|");
		
		// erase current playlist menu
		document.getElementById(SC_PREVIEW_SCROLLBOX).innerHTML = "";
		loaded_track_uri_map.clear();
		
		// load playlist from received URIs
		for(var i in track_uris)
		{
			AddTrackURL(track_uris[i]);
		}
	}
	
	function Btn_SavePlaylist()
	{

		/*var tracks = [];
		for (let [key, value] of loaded_track_uri_map)
		{
			tracks.push(JSON.stringify(value));
			// need to buffer and send each track one by one to avoid 2048 byte limit
		}
			
		MakeXHR("", lslServer+"/save", LSL_SaveTracks_Callback, encodeURIComponent(tracks), "PUT");*/
		save_track_index = 0;
		console.log("Beginning track save to LSL server");
		MakeXHR("", lslServer+"/save", LSL_SavePlaylist_Callback, "CLR", "PUT");
	}
	
	function LSL_SavePlaylist_Callback(handle, body)
	{
		if(body == "END")
		{
			console.log("Successfully finished track save");
			return;
			
		}
		else if(body == "NXT")
		{
			console.log("LSL_SaveTrack_Callback: " + body)
			if(save_track_index >= loaded_track_uri_map.size)
			{
				MakeXHR("", lslServer+"/save", LSL_SavePlaylist_Callback, "END", "PUT");
			}
			else
			{
				var track_obj = Array.from(loaded_track_uri_map.values())[save_track_index];
				if(track_obj.uri.length > 0)
				{
					var track = "";
					
					track += String.fromCharCode(255 + track_obj.uri.length) + track_obj.uri;
					track += String.fromCharCode(255 + track_obj.title.length) + track_obj.title;
					track += String.fromCharCode(255 + track_obj.duration);
					//track += String.fromCharCode(255 + track_obj.encode_wf.length) + track_obj.encode_wf;
					
					MakeXHR("", lslServer+"/save", LSL_SavePlaylist_Callback, track, "PUT");
				}
					
				++save_track_index;
			}
		}
	}
	
	//
	// client player mode functions
	//
	
	function LSL_GetNextTrack()
	{
		MakeXHR("", lslServer+"/next-track", LSL_GetNextTrack_Callback, "", "GET");
	}
	
	function LSL_GetNextTrack_Callback(handle, body)
	{
		console.log("LSL_GetNextTrack_Callback: " + body);
		var data = body.split("|");
		var uri = data[0];
		next_track_start_time = Number(data[1]);
		
		if(uri.includes("api.soundcloud.com"))
		{
			next_track = uri;
			SC_CreateIframe("client_player_sc_iframe", "client_player_box");
		}
		else if(uri.includes("youtube"))
		{
			next_track = uri;
			YT_CreateIframe("client_player_yt_iframe", "client_player_box");
		}
	}
	
	//
	// soundcloud widget/controls related functions
	//
	
	function SC_CreateIframe(id, insert_to)
	{
		var ihtml = document.getElementById("TMP_sc_iframe").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%id%", id);
		console.log("creating iframe from template");
		document.getElementById(insert_to).insertAdjacentHTML("beforeend",ihtml);
	}
	
	function SC_IframeTemplate_onload(iframe)
	{
		console.log("iframe loaded: " + iframe.id);
		if(loaded_track_uri_map.has(iframe.id) == false)
		{
			var track_obj = {src_url: "", uri: next_track};
			loaded_track_uri_map.set(iframe.id, track_obj);
		}
		else
		{
			console.log("Track is already in loaded_track_uri_map");
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
				newSCWidget.getCurrentSound(getCurrentSound_Callback); // when scope is sus
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
		console.log(" !! SC_Widget_Event_READY !! ");
		if(page_type == "player")
		{
			console.log("player soundcloud widget " + iframe_id + " ready, playing next track " + next_track);
			//SC_LoadTrack(iframe_id, next_track);
			SC_GetOembedURL(iframe_id, next_track);
			//MakeXHR("", lslServer+"/save", LSL_GetNextTrack_Callback, track, "GET");
		}
		else
		{
			console.log("preview soundcloud widget " + iframe_id + " ready, loading track");
			var trackURL = loaded_track_uri_map.get(iframe_id).src_url;
			var scWidget = id_scplayer_map.get(iframe_id);
			console.log("track URL = " + trackURL);
			SC_GetOembedURL(iframe_id, trackURL);
		}
	}
	
	function SC_GetOembedURL(id, url)
	{
		MakeXHR(id, "https://soundcloud.com/oembed?format=js&url="+url, SC_GetOembedURL_Callback, "", "GET");
	}
	
	function SC_GetOembedURL_Callback(id, jsonstr)
	{
		//console.log(jsonstr);
		if(jsonstr.substring(0, 1) === '(') // what the fuck is this round-edged safety json
			jsonstr = jsonstr.substring(1, jsonstr.length - 2);
		//console.log("Track Data: " + jsonstr);
		var oembedResult = JSON.parse(jsonstr);
		console.log("SC_GetOembedURL_Callback for " + id + ", TrackData: " + oembedResult);
		var oembedHtml = oembedResult.html;
		var start = oembedHtml.indexOf("url=");
		var end = oembedHtml.indexOf("&", start);
		console.log(start + " " + end);
		var urlSubstr = oembedHtml.substring(start+4, end);
		console.log("url=" + urlSubstr);
		
		urlSubstr = decodeURIComponent(urlSubstr);
		
		//var track_url;
		
		if(page_type == "player") //never called in player mode
		{
			console.log()
			document.getElementById("titlespan").innerHTML = oembedResult.title;
			
			if(oembedResult.thumbnail_url.includes("placeholder"))
			{
				console.log("Missing thumbnail and art, requesting author thumbnail");
				MakeXHR("", "https://soundcloud.com/oembed?format=js&url="+oembedResult.author_url, SC_GetAuthorJSON_Callback, "", "GET");
			}
			else
				document.getElementById("icon").src = oembedResult.thumbnail_url;
			
			
			//track_url = next_track;
		}
		//else
		//{
			urlSubstr = decodeURIComponent(urlSubstr);
			var track_obj = loaded_track_uri_map.get(id);
			track_obj.uri = urlSubstr;
			loaded_track_uri_map.set(id, track_obj);
			console.log("track.obj.uri=" + urlSubstr);
		//}
		
		SC_LoadTrack(id, urlSubstr);
	}
	
	function SC_GetAuthorJSON_Callback(id, jsonstr)
	{
		if(jsonstr.substring(0, 1) === '(') // what the fuck is this round-edged safety json
			jsonstr = jsonstr.substring(1, jsonstr.length - 2);
		var oembedResult = JSON.parse(jsonstr);
		console.log("SC_GetAuthorJSON_Callback, Author Data: " + oembedResult);
		document.getElementById("icon").src = oembedResult.thumbnail_url;
	}
	
	function SC_LoadTrack(id, url)
	{
		console.log("SC_LoadTrack " + id + " = " + url);
		var options = [];
		options.auto_play = false;//page_type == "player" ? true : false;
		options.download = false;
		options.show_artwork = true;
		options.show_playcount = false;
		options.sharing = false;
		options.hide_related = true;
		options.show_comments = false;
		options.show_user = false;
		options.show_reposts = false;
		options.show_teaser = false;
		
		var player = id_scplayer_map.get(id);
		
		if(page_type == "player")
		{
			var time_dif = next_track_start_time - unixTime();
			console.log("Track time_dif = " + time_dif);
			if(time_dif > 1)
			{
				console.log("Delaying track start");
				setTimeout(function() { StartPlayingTrack(player); }, time_dif * 1000);
			}
			else
			{
				options.auto_play = true;
				console.log("Starting track immediately");
				//player.seekTo(0 - time_dif);
				//player.play();
			}
		}
		setTimeout(function() { GetMissingTrackData(); }, 1000);
		
		player.load(url, options);
		//setTimeout(function() { SC_Widget_OnPlay_Callback(player); }, 1000);
		player.bind(SC.Widget.Events.PLAY_PROGRESS, SC_Widget_OnStartPlay_Callback);
		main_sc_player_widget = player;
		
	}
	
	function SC_Widget_OnStartPlay_Callback()
	{
		//TODO fix event target ref use
		
		console.log("SC_Widget_OnPlay_Callback");
		main_sc_player_widget.unbind(SC.Widget.Events.PLAY_PROGRESS);
		
		if(page_type == "player")
		{
			var time_dif = next_track_start_time - unixTime();
			console.log("SC_Widget_OnPlay_Callback: Track time_dif = " + time_dif);
			if(time_dif < 0)
			{
				main_sc_player_widget.seekTo(0 - time_dif * 1000);
			}
		}
	}
	
	function StartPlayingTrack(player)
	{
		console.log("StartPlayingTrack");
		player.play();
	}
	
	function GetMissingTrackData()
	{
		console.log("GetMissingTrackData");
		
		var is_any_missing = false;
		
		for (let [key, value] of loaded_track_uri_map)
		{
			if(value.hasData != true)
			{
				var player = id_scplayer_map.get(key);
				if(player)
				{
					console.log("requesting sound data for " + key);
					player.getCurrentSound(getCurrentSound_Callback);
					is_any_missing = true;
				}
			}
		}
		
		if(is_any_missing)
			setTimeout(function() { GetMissingTrackData(); }, 5000);
	}
	
	function getCurrentSound_Callback(sound)
	{
		//console.log("gotCurrentSound?");
		if(sound == null)
		{
			console.log("no sound loaded yet or an error occured");
			return;
		}
		/*
		if(sound.id == lastGetTrackID)
			return
		
		lastGetTrackID = sound.id;
		*/
		
		console.log("got sound data for " + sound.id + ", updating display");
		
		var match = false;
		for (let [key, value] of loaded_track_uri_map)
		{
			if(value.uri == sound.uri)
			{
				match = true;
				console.log("found URL matching ID " + value.uri);
				if(value.hasData != true)
				{
					value.hasData = true;
					value.title = sound.title;
					value.duration = Math.round(sound.duration / 1000);
					loaded_track_uri_map.set(key, value);
					
					console.log("properties in sound data:");
					for(var propertyName in sound)
					{
						console.log(propertyName + "=" + sound[propertyName]);
					}
					console.log("updating data, requesting waveform");
					if(page_type == "player")
						MakeXHR(key, sound.waveform_url, getWaveform_Callback, "", "GET");
				}
				break;
			}
		}
		
		if(!match)
		{
			console.log("ERROR; no URI match found! properties in sound data:");
			for(var propertyName in sound)
			{
				console.log(propertyName + "=" + sound[propertyName]);
			}
			console.log("URIs in loaded_track_uri_map:");
			for (let [key, value] of loaded_track_uri_map)
			{
				console.log(key + ": " +value.uri);
			}
		}
	}
	
	function getWaveform_Callback(id, jsonstr)
	{
		var track_obj = loaded_track_uri_map.get(id);
		if(track_obj)
		{
			console.log("got waveform for " + id);
			var soundDuration = track_obj.duration;
			var waveform = JSON.parse(jsonstr);
			var hmul = 127.0 / parseFloat(waveform.height);
			var sps = waveform.width / (soundDuration / 1000.0);
			
			var encode_wf = "";
			var val = 0;
			var sample = 0;
			var step = 8;
			while(sample < waveform.width)
			{
				var min = 255;
				var max = 0;
				var n = 0;
				for(; n < step; ++n)
				{
					if(sample + n >= waveform.width)
						break;
					
					val = waveform.samples[sample + n];
					if(val < min)
						min = val;
					if(val > max)
						max = val;
				}
				
				encode_wf += String.fromCharCode(255 + min + (max << 7));
				sample += step;
			}
			
			track_obj.encode_wf = encode_wf;
			
			loaded_track_uri_map.set(id, track_obj);
			
			console.log("waveform.height=" + waveform.height + " waveform.length=" + waveform.width + " sps=" + sps + " encoded=" + encode_wf);
			MakeXHR("", lslServer+"/waveform/" + track_obj.uri, null, encode_wf, "PUT");
		}
		// compress and encode keyframes
		// reduce to 15 bit unicode chars: 5 bit magnitude, 10 bit length
	}
	
	//
	// youtube widget related
	//
	/*
	var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
	  */
	  
	function YT_CreateIframe(id, insert_to)
	{
		var ihtml = document.getElementById("TMP_yt_iframe").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%id%", id);
		//ihtml = ReplaceAll(ihtml, "%video%", "M7lc1UVf-VE");
		//ihtml = ReplaceAll(ihtml, "%origin%", lslServer);
		
		console.log("creating youtube iframe from template");
		document.getElementById(insert_to).insertAdjacentHTML("beforeend",ihtml);
	}
	
	//var ytplayer;
	
	function YT_IframeTemplate_onload(iframe)
	{
		//console.dir(iframe);
		console.log("youtube iframe loaded: " + iframe.id);
		if(loaded_track_uri_map.has(iframe.id) == false)
		{
			var track_obj = {src_url: "", uri: next_track};
			loaded_track_uri_map.set(iframe.id, track_obj);
		}
		else
		{
			console.log("Track is already in loaded_track_uri_map");
		}
		
			setTimeout(function() {  
			console.log("youtube iframe ready");
			
			//isThisThingOn.innerHTML = "YIKES!";
			
			//var newSCWidget = SC.Widget(iframe.id);
			//return;
			
			var track = loaded_track_uri_map.get(iframe.id).src_url;
			var ytid = track.split("/").slice(-1);
			console.log("youtube track url = " + track + ", ID = " + ytid);
			var newYTPlayer = new YT.Player(iframe.id,
			{
				height: '390',
				width: '640',
				videoId: 'M7lc1UVf-VE',
				playerVars:
				{
					'playsinline': 1
				},
				events:
				{
					"onReady": YTPlayerReady,
					"onStateChange": YTPlayerStateChange
				}
			});
			
			}, 1000);
		
	}
	
	function YTPlayerReady(event)
	{
		console.log("YTPlayerReady: starting video");
		//event.target.playVideo();
	}
	
	function YTPlayerStateChange(event)
	{
		
	}
	  /*
    var ytplayer;
    function onYouTubeIframeAPIReady()
	{
		console.log("onYouTubeIframeAPIReady");
		ytplayer = new YT.Player('player',
		{
			height: '390',
			width: '640',
			videoId: 'M7lc1UVf-VE',
			playerVars:
			{
				'playsinline': 1
			},
			events:
			{
				'onReady': onYTPlayerReady,
				//'onStateChange': onPlayerStateChange
			}
		});
    }

      // 4. The API will call this function when the video player is ready.
    function onYTPlayerReady(event)
	{
		console.log("onYTPlayerReady");
		event.target.playVideo();
    }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
    
	/*
    function onPlayerStateChange(event)
	{
        if (event.data == YT.PlayerState.PLAYING && !done)
		{
			setTimeout(stopVideo, 6000);
			done = true;
        }
    }
	
    function stopVideo()
	{
		ytplayer.stopVideo();
    }*/
	
	//
	// general utility functions
	//
	
	function unixTime()
	{
		return Math.floor(Date.now() / 1000);
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
	
