
	/*
	
		Disclaimer: javascript is a horrible little crab and i am making no effort to play by it's rules or respect it's crab-like tendencies
	
	*/

	var lslServer = window.location.href;
	var loaded_track_uri_map = new Map(); // IDs to source url + embed uri pairs
	var id_scplayer_map = new Map(); // IDs to soundcloud iframe objects
	
	var save_track_index = 0;
	
	var next_track = ""; // next soundcloud track the player should load
	var next_track_start_time;
	var main_sc_player_widget;
	
	var playlist_list; // array of available playlists
	var edit_playlist = "Default"; // current playlist being edited
	var edit_playlist_shuffle = 0;
	
	var SC_PRV_ID_PFX = "sc_track_preview_";
	var SC_PREVIEW_SCROLLBOX = "sc_preview_scroll";

	var session_id = "";
	var last_poll = 0;
	
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
		//xhr.timeout = 45000;
		xhr.open(method, url, true);
		const heckt = Date.now();
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
					if(xhr.status == 503)
					{
						console.log("503: probably an LSL event queue overflow, retrying request..");
						setTimeout(function(){ MakeXHR(handle, url, callbackFunction, message, method) }, 2500);
					}
					console.log("XHR " + url + "; non-ok status "+xhr.status + " after " + ((Date.now() - heckt) / 1000) +  ", response=" + xhr.response);
				}
			}
		};
		xhr.onerror = function()
		{
			console.log("XHR " + url + " error " + xhr.statusText);
			// TODO add user-visible error handling
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
			
			const sid_src = new Uint32Array(3);
			const sid_bytes = self.crypto.getRandomValues(sid_src);//.randomUUID();
			for(var i in sid_bytes)
				session_id += sid_bytes[i].toString(32);
			
			console.log("session id is " + session_id);
			//LSL_Poll();
			//LSL_GetNextTrack();
			setInterval( PollIfRequired, 1000);
			//SC_CreateIframe("client_player_sc_iframe", "client_player_box");
		}
		else if(page_type == "config")
		{
			var ihtml = document.getElementById("TMP_sc_track_setup").cloneNode(true).innerHTML;
			console.log("creating setup from template");
			document.getElementById("main_body").insertAdjacentHTML("beforeend",ihtml);
			LSL_GetPlaylists();
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
		track_url = ReplaceAll(track_url, "&", "&amp;"); // we hates it, precious
		
		console.log("AddTrackURL " + track_url);
		var track_id = Math.floor(Math.random()*2147483647).toString(16);
		var if_id = SC_PRV_ID_PFX + track_id;
		
		// create the preview panel
		var ihtml = document.getElementById("TMP_sc_track_preview").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%title%", track_url);
		ihtml = ReplaceAll(ihtml, "%track%", track_id);
		document.getElementById(SC_PREVIEW_SCROLLBOX).insertAdjacentHTML("beforeend", ihtml);
		
		// TODO: URL causes crash, fucking ampersands https://www.youtube.com/watch?v=smJrVboIOjA&list=PLhPt7n-ALrSAR_jze4rKBbRNxo0rQ467J&index=78
		
		// record the track source and uri object
		var track_obj = {};// = {src_url:track_url, uri:"", title:"unknown", duration:-1};
		track_obj.src_url = track_url;
		track_obj.uri = "";
		track_obj.title = "unknown";
		track_obj.duration = -1;
		var add_to = "preview_iframe_" + track_id;
		console.log("Added '" + if_id + "' to loaded_track_uri_map, creating iframe in " + add_to);
		
		if(track_url.includes("soundcloud"))
		{
			loaded_track_uri_map.set(if_id, track_obj);
			SC_CreateIframe(if_id, add_to);
		}
		else if(track_url.includes("youtu"))
		{
			loaded_track_uri_map.set(if_id, track_obj);
			YT_CreateIframe(if_id, add_to);
		}
	}
	
	function Btn_RemoveTrackID(track)
	{
		console.log("Removing preview track: " + track);
		loaded_track_uri_map.delete(SC_PRV_ID_PFX + track);
		document.getElementById("preview_scroll_" + track).remove();
	}
	
	function PlaylistSelectChange()
	{
		var index = document.getElementById("sel_playlist").value;
		var getpl = playlist_list[index];
		console.log("selected playlist " + getpl + " at " + index);
		edit_playlist = getpl;
	}
	
	//
	// Communication with server LSL script
	//
	
	function PollIfRequired()
	{
		if(unixTime() > (last_poll + 10))
			LSL_Poll();
	}
	
	function LSL_Poll()
	{
		last_poll = unixTime();
		MakeXHR("", lslServer + "/poll/" + session_id, LSL_Poll_Callback, "", "GET");
	}
	
	function LSL_Poll_Callback(handle, body)
	{
		console.log("LSL_Poll_Callback: " + body);
		if(body != "exp") // expired poll, avoid letting it time out naturally
		{
			const args = body.split("|");
			
			if(args[0] == "playtrack")
			{
				var uri = args[1];
				next_track_start_time = Number(args[2]);
				
				loaded_track_uri_map.clear();
				id_scplayer_map.clear();
				document.getElementById("client_player_box").innerHTML = "";
				next_track = uri;
				
				jQuery(document).ready(function()
				{
					if(next_track.includes("soundcloud"))
					{
						SC_CreateIframe("client_player_sc_iframe", "client_player_box");
					}
					else if(next_track.includes("youtu"))
					{
						YT_CreateIframe("client_player_yt_iframe", "client_player_box");
					}
				});
			}
		}
		
		LSL_Poll();
	}
	
	function LSL_GetPlaylists()
	{
		MakeXHR("", lslServer + "/playlists", LSL_GetPlaylists_Callback, "", "GET");
	}
	
	function LSL_GetPlaylists_Callback(handle, body)
	{
		playlist_list = body.split("#|");
		BuildPlaylistSelect(0);
	}
	
	function BuildPlaylistSelect(index)
	{
		var sel = document.getElementById("sel_playlist");
		sel.innerHTML = "";
		for(var n in playlist_list)
		{
			var option = document.createElement("option");
			option.value = n;
			option.text = playlist_list[n];
			sel.appendChild(option);
		}
		sel.value = index;
		edit_playlist = playlist_list[0];
	}
	
	function Btn_LoadPlaylist()
	{
		var index = document.getElementById("sel_playlist").value;
		var getpl = playlist_list[index];
		console.log("get playlist " + getpl + " at " + index);
		//MakeXHR("", lslServer+"/tracks", LSL_LoadPlaylist_Callback, "", "GET");
		edit_playlist = getpl;
		MakeXHR("", lslServer + "/playlist/" + edit_playlist, LSL_LoadPlaylist_Callback, "", "GET");
	}
	
	function LSL_LoadPlaylist_Callback(handle, body)
	{
		console.log("LSL_LoadPlaylist_Callback: " + body);
		
		var playlist_data = body.split("|"); // 0:shuffle, 1+: URIs
		edit_playlist_shuffle = Number(playlist_data[0]);
		if(edit_playlist_shuffle == NaN)
			edit_playlist_shuffle = 0;
		console.log("Track shuffle value = " + edit_playlist_shuffle);
		var shuffle = document.getElementById("track_randomness")
		shuffle.value = edit_playlist_shuffle * shuffle.max;
		var track_uris = playlist_data.slice( (playlist_data[0].length < 4 ? 1 : 0), -1);
		
		// erase current playlist menu
		document.getElementById(SC_PREVIEW_SCROLLBOX).innerHTML = "";
		loaded_track_uri_map.clear();
		
		// load playlist from received URIs
		for(var i in track_uris)
		{
			AddTrackURL(track_uris[i]);
		}
		
	}
	
	function Btn_AddPlaylist()
	{
		var name = window.prompt("Enter a name for the new playlist", "Playlist" + (playlist_list.length+1));
		if(playlist_list.includes(name) == false)
		{
			playlist_list.push(name);
			console.log("Added new empty playlist "+name);
			BuildPlaylistSelect(playlist_list.length-1);
			edit_playlist = name;
		}
	}
	
	function Btn_DelPlaylist()
	{
		var conf = window.prompt("Enter 'delete' to confirm deletion of "+edit_playlist, "");
		if(conf.toLowerCase().includes("delete"))
		{
			console.log("Deleting "+edit_playlist);
			MakeXHR("", lslServer + "/delete/" + edit_playlist, LSL_DelPlaylist_Callback, "", "GET");
		}
	}
	
	function LSL_DelPlaylist_Callback(handle, body)
	{
		playlist_list.remove(body);
		BuildPlaylistSelect(0);
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
		var shuffle = document.getElementById("track_randomness");
		edit_playlist_shuffle = shuffle.value / shuffle.max;
		MakeXHR("", lslServer + "/save/start/" + edit_playlist, LSL_SavePlaylist_Callback, edit_playlist_shuffle, "PUT");
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
				MakeXHR("", lslServer + "/save/" + edit_playlist + "/end", LSL_SavePlaylist_Callback, "END", "PUT");
			}
			else
			{
				var track_obj = loaded_track_uri_map.values().toArray()[save_track_index];
				if(track_obj.uri.length > 0)
				{
					var track = track_obj.uri + "#|" + track_obj.title + "#|" + track_obj.duration;
					MakeXHR("", lslServer + "/save/" + edit_playlist + "/uri", LSL_SavePlaylist_Callback, track, "PUT");
				}
				else
				{
					console.log("Error: track URI length is 0 for " + save_track_index);
					for (let [key, value] of loaded_track_uri_map)
						console.dir(value);
				}
					
				++save_track_index;
			}
		}
	}
	
	//
	// client player mode functions
	//
	
	function LSL_GetNextTrack() // deprecated
	{
		loaded_track_uri_map.clear();
		id_scplayer_map.clear();
		document.getElementById("client_player_box").innerHTML = "";
		jQuery(document).ready(function()
		{
			MakeXHR("", lslServer+"/next-track", LSL_GetNextTrack_Callback, "", "GET");
		});
	}
	
	function LSL_GetNextTrack_Callback(handle, body) // deprecated
	{
		console.log("LSL_GetNextTrack_Callback: " + body);
		var data = body.split("|");
		var uri = data[0];
		next_track_start_time = Number(data[1]);
		
		if(uri.includes("soundcloud"))
		{
			next_track = uri;
			SC_CreateIframe("client_player_sc_iframe", "client_player_box");
		}
		else if(uri.includes("youtu"))
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
			var track_obj = {};// = {src_url: "", uri: next_track};
			track_obj.uri = next_track;
			track_obj.src_url = "";
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
		
		if(page_type == "player")
		{
			document.getElementById("titlespan").innerHTML = oembedResult.title;
			
			if(oembedResult.thumbnail_url.includes("placeholder"))
			{
				console.log("Missing thumbnail and art, requesting author thumbnail");
				MakeXHR("", "https://soundcloud.com/oembed?format=js&url="+oembedResult.author_url, SC_GetAuthorJSON_Callback, "", "GET");
			}
			else
			{
				//document.getElementById("icon").src = oembedResult.thumbnail_url;
				var icon = document.getElementById("icon");
				icon.src = oembedResult.thumbnail_url;
				icon.style.height = '480px';
				icon.style.width = '480px';
				icon.style.top = '0px';
			}
		}
		
		urlSubstr = decodeURIComponent(urlSubstr);
		var track_obj = loaded_track_uri_map.get(id);
		track_obj.uri = urlSubstr;
		loaded_track_uri_map.set(id, track_obj);
		console.log("track.obj.uri=" + urlSubstr);
		
		SC_LoadTrack(id, urlSubstr);
	}
	
	function SC_GetAuthorJSON_Callback(id, jsonstr)
	{
		if(jsonstr.substring(0, 1) === '(') // what the fuck is this round-edged safety json
			jsonstr = jsonstr.substring(1, jsonstr.length - 2);
		var oembedResult = JSON.parse(jsonstr);
		console.log("SC_GetAuthorJSON_Callback, Author Data: " + oembedResult);
		//document.getElementById("icon").src = oembedResult.thumbnail_url;
		var icon = document.getElementById("icon");
		icon.src = oembedResult.thumbnail_url;
		icon.style.height = '480px';
		icon.style.width = '480px';
		icon.style.top = '0px';
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
		player.bind(SC.Widget.Events.FINISH, SC_Widget_OnFinish_Callback);
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
	
	function SC_Widget_OnFinish_Callback()
	{
		if(page_type == "player")
		{
			console.log("Soundcloud track finished playing, requesting next in 1s");
			//setTimeout( function () { LSL_GetNextTrack() }, 1000 );
		}
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
			setTimeout(function() { GetMissingTrackData(); }, 2500);
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
					
					// dont get waveform, not compatible with youtube
					/*if(page_type == "player")
						MakeXHR(key, sound.waveform_url, getWaveform_Callback, "", "GET");
					*/
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
	  
	function YT_CreateIframe(id, insert_to)
	{
		// this is a div that magically turns into an iframe for reason we wont think about too carefully
		// using an iframe from the start causes youtube to have a screaming meltdown for some reason we also wont think about
		var ihtml = document.getElementById("TMP_yt_notframe").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%id%", id);
		
		console.log("creating youtube iframe from template");
		document.getElementById(insert_to).insertAdjacentHTML("beforeend",ihtml);
		
		jQuery(document).ready(function()
		{
			var iframe = document.getElementById(id);
			if(iframe == null)
				return;
			
			var ytid;
			var track;
			var track_obj;
			
			if(loaded_track_uri_map.has(id) == false)
			{
				track = next_track;
				track_obj = {};//{src_url: "", uri: track};
				track_obj.uri = track;
				track_obj.src_url = "";
				loaded_track_uri_map.set(iframe.id, track_obj);
				ytid = getYoutubeId(track);
			}
			else
			{
				track_obj = loaded_track_uri_map.get(id);
				console.dir(track_obj);
				track = track_obj.src_url;
				console.log("src_url = "+track);
				ytid = getYoutubeId(track); // sus
				if(ytid == null)
					ytid = track.split("/").slice(-1);
				track_obj.uri = "youtube.com/embed/" + ytid;
				loaded_track_uri_map.set(id, track_obj);
				console.log("Track is already in loaded_track_uri_map");
			}
		
			console.log("track id = " + ytid);
			console.log("youtube not-iframe ready");
			
			
			//var ytid = track.split("/").slice(-1);
			
			console.log("youtube track url = " + track_obj.uri);
			var newYTPlayer = new YT.Player(iframe.id,
			{
				height: '390',
				width: '640',
				videoId: ytid,
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
		});
	}
	
	function YTPlayerReady(event)
	{
		console.dir(event.target);
		console.log("src = " + event.target.g.src);
		console.log("iframe id = " + event.target.g.id);
		
		var ytid = getYoutubeId(event.target.g.src);
		console.log("ytid = " + ytid);
		
		if(page_type == "player")
		{
			document.getElementById("titlespan").innerHTML = event.target.videoTitle;
			var icon = document.getElementById("icon");
			icon.src = "https://img.youtube.com/vi/" + ytid + "/0.jpg"
			icon.style.height = '360px';
			icon.style.width = '480px';
			icon.style.top = '60px';
			
			var time_dif = next_track_start_time - unixTime();
			console.log("YTPlayerReady: Track time_dif = " + time_dif);
			
			if(time_dif < 1)
			{
				event.target.seekTo(0 - time_dif, true);
				event.target.playVideo();
			}
			else
			{
				setTimeout(function() { event.target.playVideo(); }, time_dif * 1000);
			}
		}
		else
		{
			var track_obj = loaded_track_uri_map.get(event.target.g.id);
			//console.dir(track_obj);
			track_obj.title = event.target.videoTitle;
			track_obj.duration = event.target.getDuration();
			loaded_track_uri_map.set(event.target.g.id, track_obj);
			console.dir(track_obj);
		}
	}
	
	function YTPlayerStateChange(event)
	{
		if(event.data == YT.PlayerState.ENDED && page_type == "player")
		{
			console.log("Youtube track finished playing, requesting next in 1s");
			//setTimeout( function () { LSL_GetNextTrack() }, 1000 );
		}
	}
	
	function getYoutubeId(url)
	{
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);

		return (match && match[2].length === 11) ? match[2] : null;
	}
	
	//
	// General utility
	//
	
	function unixTime()
	{
		return Math.floor(Date.now() / 1000);
	}
	
	/*
	document.onclick = function(event)
	{
		if(page_type != "player")
			return;
		
		//if (event===undefined) event= window.event;
		//var target = 'target' in event? event.target : event.srcElement;
		
		//newSCWidget.play();
	}*/
	
	//lslServer = window.location.href;

	InitPage();