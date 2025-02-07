
	/*
	
		Javascript is a horrible little crab and i am making no effort to play by it's rules or respect it's crab-like tendencies. 
		
		Road Work Ahead
		
		API References
			https://developers.soundcloud.com/docs/api/html5-widget
			https://developers.google.com/youtube/iframe_api_reference
	
	*/

	var lslServer = window.location.href; // full path of the server including /cfg/sessionID for config page
	var loaded_track_uri_map = new Map(); // IDs to source url + embed uri pairs
	var id_playeriframe_map = new Map(); // IDs to soundcloud/youtube iframe objects
	var id_iframe_map_v2 = new Map();
	var admin_agent_map = new Map(); // UUID:{name, level} mapping for admin agents
	var save_track_index = 0; // progress tracker when progressively saving a playlist
	
	// two tracks are loaded at once, future track is loaded slightly in advance to avoid delays/congestion
	var current_track_uri = ""; // URI of current soundcloud/youtube track
	var current_track_duration = 0;
	var current_track_start_time = 0;
	var current_track_end_time = 0;
	var current_track_title = ""
	var current_track_vol = 0;
	var future_track_uri = "";
	var future_track_duration = 0;
	var future_track_start_time = 0;
	var future_track_end_time = 0;
	var future_track_title = "";
	var future_track_vol = 0;
	var main_player_widget = null; // object ref to the client player soundcloud/youtube iframe if it exists
	var main_player_widget_type = ""; // "sc" or "yt"
	var main_player_should_play = true;
	
	var playlist_list; // array of available playlists
	var edit_playlist = "Default"; // current playlist being edited
	var edit_playlist_shuffle = 0; // shuffle randomness value of the playerlist being edited in config mode, 0-1
	var edit_lock = false; // prevents editing data during a save/load operation
	
	var page_type = lslServer.includes("/cfg/") ? "config" : "player"; // if page is client player, or config
	
	const SC_PREVIEW_IFRAME = "sc_track_preview_"; // prefix for the iframe/player ID of a preview track
	const SC_PREVIEW_DIV = "preview_scroll_"; // prefix for the div ID of a preview track element
	const SC_PREVIEW_SCROLLBOX = "sc_preview_scroll"; // ID of the div that track previews are added to
	const MIN_VOL = 1;
	const MAX_VOL = 100;
	const DEF_VOL = 50;
	
	// timeout IDs
	var track_end_timer = 0;
	var next_track_rq_timer = 0;
	
	const unicode_btn = ["⮝", "⮟", "✖"]; // cant put non-ASCII in the templates file, great fun!
	//const play_btn_icons = ["⏸", "⏵"];
	const play_btn_icons = ["🔇", "🔊"];
	
	var track_swap_status = true; // helps recover from loading errors during track changes
	
	const SEP = "\u2008"; // Delimiter for data to/from server; Unicode Character 8200 (U+2008) 0xE2 0x80 0x88
	
	//
	// Basic utility stuff
	//
	
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
	
	function Sanitize(str)
	{
		str = ReplaceAll(str, "&", "&amp;");
		str = ReplaceAll(str, "\"", "&quot;");
		str = ReplaceAll(str, "\'", "&#39;");
		str = ReplaceAll(str, ">", "&gt;");
		str = ReplaceAll(str, "<", "&lt;");
		return str;
	}
	
	/*
		https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
		 cyrb53 (c) 2018 bryc (github.com/bryc)
		License: Public domain (or MIT if needed). Attribution appreciated.
		A fast and simple 53-bit string hash function with decent collision resistance.
		Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
	*/
	function cyrb53(str)
	{
		var h1 = 0xdeadbeef;
		var h2 = 0x41c6ce57;
		for(let i = 0, ch; i < str.length; i++)
		{
			ch = str.charCodeAt(i);
			h1 = Math.imul(h1 ^ ch, 2654435761);
			h2 = Math.imul(h2 ^ ch, 1597334677);
		}
		h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
		h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
		h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
		h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
		return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
	}
	
	function UnixTime() // Match output of LSL llGetUnixTime function
	{
		return Math.floor(Date.now() / 1000);
	}
	
	/*
		HttpRequest function with callback
		handle: string identifier for the request, passed to callbackFunction, can be empty
		url: self-explanatory, right?
		callbackFunction: reference to a function, should have signature function(handle, body)
		message: body to send with PUT requests
		method: "GET", "PUT", ect
	*/
	function MakeXHR(handle, url, callbackFunction, message, method)
	{
		// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
		
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);
		const st = Date.now();
		
		xhr.onload = function()
		{
			if (xhr.readyState==4) // state=DONE
			{	
				if (xhr.status==200) // status=OK
				{
					console.log("xhr response: "+xhr.response);
					if (callbackFunction	!= null)
						callbackFunction(handle, xhr.response);
				}
				else // Thing is not ok :(
				{
					//const dur = (Date.now() - st) / 1000;
					if (xhr.status == 503) // LSL server has extreme throttling antics, why not try again
					{
						console.log("503: probably an LSL event queue overflow, retrying request..");
						setTimeout(function(){ MakeXHR(handle, url, callbackFunction, message, method) }, 2500);
					}
					console.log("XHR " + url + "; non-ok status "+xhr.status + " after " + ((Date.now() - st) / 1000) +  ", response=" + xhr.response);
				}
			}
		};
		xhr.onerror = function()
		{
			console.log("XHR " + url + " error " + xhr.statusText);
			// TODO add user-visible error handling not reliant on popups, as they dont work when embedded in SL
		};
		
		xhr.send(message);
	}
	
	//
	// main page code
	//
	
	function InitPage() // entrypoint for the player
	{
		if (page_type == "player") // create the client player UI and request track
		{
			var ihtml = document.getElementById("TMP_sc_player_page").cloneNode(true).innerHTML;
			console.log("creating player from template");
			document.getElementById("main_body").insertAdjacentHTML("beforeend",ihtml);
			/*
			const sid_src = new Uint32Array(3);
			const sid_bytes = self.crypto.getRandomValues(sid_src);
			for(var i in sid_bytes)
				session_id += sid_bytes[i].toString(32);
			
			console.log("session id is " + session_id);
			*/
			LSL_GetNextTrack();
			SetPlayLabel();
		}
		else if (page_type == "config") // create the config UI and request config data
		{
			var ihtml = document.getElementById("TMP_sc_track_setup").cloneNode(true).innerHTML;
			console.log("creating setup from template");
			document.getElementById("main_body").insertAdjacentHTML("beforeend",ihtml);
			LSL_GetPlaylists();
			LSL_GetAdmins();
		}
	}
	
	//
	// Config menu mode functions
	//
	
	function PlaylistSelectChange() // triggered by select "sel_playlist"
	{
		console.log("playlist selection changed");
		if (CheckEditLock())
			return;
		
		var selected = document.getElementById("sel_playlist").value;
		if (playlist_list.includes(selected))
		{
			edit_playlist = selected;
			console.log("selected playlist " + selected);
			LSL_LoadSelectedPlaylist();
		}
	}
	
	function BuildPlaylistSelect() // refreshes the select dropdown to choose a playlist
	{
		var sel = document.getElementById("sel_playlist");
		var selected = "#sel";
		sel.innerHTML = "";
		var option = document.createElement("option");
		option.value = selected;
		option.text = "--Select Playlist--";
		sel.appendChild(option);
			
		for(var n in playlist_list)
		{
			option = document.createElement("option");
			option.value = playlist_list[n];
			option.text = playlist_list[n];
			sel.appendChild(option);
			if (option.value == edit_playlist)
				selected = edit_playlist;
		}
		
		sel.value = selected;
		
		console.log("BuildPlaylistSelect: selected = " + selected);
		
		if (selected == "#sel")
			edit_playlist = "";
	}
	
	function Btn_AddTrackURL() // triggered by button btn_add_url
	{
		var track_url = document.getElementById("text_input_url").value;
		document.getElementById("text_input_url").value = ""; // seemingly cant cache object here, why?
		AddTrackURL(track_url, loaded_track_uri_map.size, null, 0);
	}
	
	function AddTrackURL(track_url, index, title, volume)
	{
		if (page_type == "player") // how would this even happen? yikes.
			return;
		
		track_url = Sanitize(track_url); // ampersands in my house.. WHOLETTHEMIN?
		
		console.log("AddTrackURL " + track_url);
		var track_id = cyrb53(track_url).substring(0, 8);
		var if_id = SC_PREVIEW_IFRAME + track_id;
		
		if (volume == 0 || volume < MIN_VOL || volume > MAX_VOL)
			volume = DEF_VOL;
		
		// create the preview panel
		var ihtml = document.getElementById("TMP_sc_track_preview").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%title%", track_url);
		ihtml = ReplaceAll(ihtml, "%track%", track_id);
		ihtml = ReplaceAll(ihtml, "#DEL", unicode_btn[2]);
		ihtml = ReplaceAll(ihtml, "#UP", unicode_btn[0]);
		ihtml = ReplaceAll(ihtml, "#DWN", unicode_btn[1]);
		ihtml = ReplaceAll(ihtml, "#ORD", index);
		document.getElementById(SC_PREVIEW_SCROLLBOX).insertAdjacentHTML("beforeend", ihtml);
		
		// record the track source and uri object
		var track_obj = {};
		track_obj.src_url = track_url;
		track_obj.uri = "";
		track_obj.title = title == null ? "" : title; // prevent overwriting existing titles loaded from LSL server
		track_obj.duration = -1;
		track_obj.loaded = false;
		track_obj.volume = volume;
		var add_to = "preview_iframe_" + track_id;
		console.log("Added '" + if_id + "' to loaded_track_uri_map, creating iframe in " + add_to);
		
		if (track_url.includes("soundcloud"))
		{
			loaded_track_uri_map.set(if_id, track_obj);
			SC_CreateIframe(if_id, add_to);
		}
		else if (track_url.includes("youtu"))
		{
			loaded_track_uri_map.set(if_id, track_obj);
			YT_CreateIframe(if_id, add_to);
		}
	}
	
	function Btn_RemoveTrackID(track) // triggered by button "btn_remove_track_%trackid%" in track preview widget
	{
		console.log("Removing preview track: " + track);
		loaded_track_uri_map.delete(SC_PREVIEW_IFRAME + track);
		document.getElementById(SC_PREVIEW_DIV + track).remove();
	}
	
	function Slider_TrackVolume(track)
	{
		var track_obj = loaded_track_uri_map.get(SC_PREVIEW_IFRAME + track);
		var player = id_iframe_map_v2.get(track);
		var vol = document.getElementById("track_vol_" + track).value;
		if (vol == null || vol < MIN_VOL || vol > MAX_VOL)
		{
			vol = DEF_VOL;
		}
		console.log("DEBUG VOLUME");
		console.dir(player);
		console.log(SC_PREVIEW_IFRAME + track + " volume = " + vol);
		console.log("DEBUG VOLUME");
		track_obj.volume = vol;
		player.setVolume(vol);
		loaded_track_uri_map.set(SC_PREVIEW_IFRAME + track, track_obj);
		
	}
	
	function Btn_MoveUpTrackID(track) // triggered by button "btn_track_up_%trackid%" in track preview widget
	{
		var a = 0;
		var b = 0;
		var i = 0;
		var id = SC_PREVIEW_IFRAME + track;
		for (const key of loaded_track_uri_map.keys())
		{
			if (key == id)
			{
				if (i > 0)
				{
					a = i;
					b = i-1;
				}
				break;
			}
			++i;
		}
		SwapTrackPlaces(a, b);
	}
	
	function Btn_MoveDownTrackID(track) // triggered by button "btn_track_down_%trackid%" in track preview widget
	{
		var a = 0;
		var b = 0;
		var i = 0;
		var id = SC_PREVIEW_IFRAME + track;
		for (const key of loaded_track_uri_map.keys())
		{
			if (key == id)
			{
				if (i < (loaded_track_uri_map.size - 1))
				{
					a = i;
					b = i+1;
				}
				break;
			}
			++i;
		}
		SwapTrackPlaces(a, b);
	}
	
	function SwapTrackPlaces(a, b) // used by up/down buttons in track preview to switch places and rebuild the display. a bit silly.
	{
		console.log("SwapTrackPlaces: " + a + " <-> " + b);
		var vals = new Array(loaded_track_uri_map.size);
		var keys = new Array(loaded_track_uri_map.size);
		var i = 0;
		var at;
		for (let [key, value] of loaded_track_uri_map) // copy map to array, swapping places of elements a and b
		{
			at = (i == a) ? b : ((i == b) ? a : i); // truly a line of code of some kind
			console.log("Placing " + i + " at " + at);
			vals[at] = value;
			keys[at] = key;
			++i;
		}
		loaded_track_uri_map.clear();
		for(i in keys) // copy array back to the map. this is fun and efficient!
		{
			var id = keys[i].substring(SC_PREVIEW_IFRAME.length);// gets the ID after the prefix, ie '18b55035' from 'sc_track_preview_18b55035'
			console.log("key " + i + " is " + id);
			
			loaded_track_uri_map.set(keys[i], vals[i]);
			document.getElementById("preview_scroll_"+id).style.order = i;
		}
	}
	
	function Btn_RenameTrackID(track) // triggered by button "btn_ren_track_%trackid%" in track preview widget
	{
		var track_obj = loaded_track_uri_map.get(SC_PREVIEW_IFRAME + track);
		var title = window.prompt("Enter the title to display", track_obj.title);
		if (title != null && title.length > 0)
		{
			track_obj.title = title;
			loaded_track_uri_map.set(SC_PREVIEW_IFRAME + track, track_obj);
		}
	}
	
	function BuildAdminUserList() // refreshes the config list of users and their level of access
	{
		const aascroll = document.getElementById("admin_agent_scroll");
		aascroll.innerHTML = "";
		for (let [key, value] of admin_agent_map)
		{
			var ihtml = document.getElementById("TMP_admin_agent").cloneNode(true).innerHTML;
			ihtml = ReplaceAll(ihtml, "%agent%", key);
			ihtml = ReplaceAll(ihtml, "%name%", value.name);
			ihtml = ReplaceAll(ihtml, "#DEL", unicode_btn[2]);
			aascroll.insertAdjacentHTML("beforeend", ihtml);
			console.log("inserting entry for " + key);
		}
		jQuery(document).ready(function()
		{
			for (let [key, value] of admin_agent_map)
			{
				document.getElementById("sel_level_" + key).value = value.level; // level of access; user(1) or manager(2)
			}
		});
	}
	
	function UserLevelSelectChange(agent) // triggered by select "sel_level_%agent%" in the user access level config menu
	{
		console.log("UserLevelSelectChange " + agent);
		var agent_obj = admin_agent_map.get(agent);
		console.dir(agent_obj);
		agent_obj.level = document.getElementById("sel_level_"+agent).value;
		admin_agent_map.set(agent, agent_obj);
		console.dir(admin_agent_map);
		LSL_SaveUserAdmin(agent);
	}
	
	function Btn_RemoveUser(agent) // triggered by button "btn_remove_%agent%" in the user access level config menu
	{
		console.log("Btn_RemoveUser " + agent);
		LSL_DeleteUserAdmin(agent)
		admin_agent_map.delete(agent);
		console.dir(admin_agent_map);
		BuildAdminUserList();
	}
	
	//
	// Communication with server LSL script in config mode
	//
	
	function LSL_SaveUserAdmin(agent) // called any time user config is modified
	{
		if (admin_agent_map.has(agent))
		{
			const agent_obj = admin_agent_map.get(agent);
			const body = agent + SEP + agent_obj.name + SEP + agent_obj.level;
			MakeXHR("", lslServer + "/admins/save", LSL_SaveUser_Callback, body, "PUT");
		}
	}
	
	function LSL_SaveUser_Callback(handle, body) // not really needed at the moment
	{
		
	}
	
	function LSL_DeleteUserAdmin(agent) // called by Btn_RemoveUser, this probably does not need to be an entire function..
	{
		MakeXHR("", lslServer + "/admins/save/del", LSL_DeleteUser_Callback, agent, "PUT");
	}
	
	function LSL_DeleteUser_Callback(handle, body) // not really needed at the moment
	{
		
	}
	
	function LSL_GetAdmins() // requests list of all users and their access levels
	{
		MakeXHR("", lslServer + "/admins/get", LSL_GetAdmins_Callback, "", "GET");
	}
	
	function LSL_GetAdmins_Callback(handle, body)
	{
		var data = body.split(SEP);
		admin_agent_map.clear();
		for(var i=0; i<data.length; i+=3)
		{
			admin_agent_map.set(data[i], {name:data[i+1], level:data[i+2]});
		}
		BuildAdminUserList();
	}
	
	function LSL_GetPlaylists() // requests list of all playlist names
	{
		if (CheckEditLock())
			return;
		edit_lock = true;
		MakeXHR("", lslServer + "/playlists", LSL_GetPlaylists_Callback, "", "GET");
	}
	
	function LSL_GetPlaylists_Callback(handle, body)
	{
		edit_lock = false;
		playlist_list = body.split(SEP);
		BuildPlaylistSelect();
	}
	
	function LSL_LoadSelectedPlaylist() // called by PlaylistSelectChange when that happens
	{
		if (CheckEditLock())
			return;
		
		var getpl = document.getElementById("sel_playlist").value;
		console.log("get playlist " + getpl);
		edit_playlist = getpl;
		MakeXHR("", lslServer + "/playlist/" + encodeURI(edit_playlist), LSL_LoadPlaylist_Callback, "", "GET");
		edit_lock = true;
	}
	
	function LSL_LoadPlaylist_Callback(handle, body)
	{
		console.log("LSL_LoadPlaylist_Callback: " + body);
		edit_lock = false;
		var playlist_data = body.split(SEP); // 0:shuffle, 1+: URIs
		
		edit_playlist_shuffle = Number(playlist_data[0]);
		if (edit_playlist_shuffle == NaN)
			edit_playlist_shuffle = 0;
		
		console.log("Track shuffle value = " + edit_playlist_shuffle);
		var shuffle = document.getElementById("track_randomness")
		shuffle.value = edit_playlist_shuffle * shuffle.max;
		
		// [URI, title override, volume override]
		var track_datas = playlist_data.slice(1, playlist_data.length); 
		console.log("Track URIs: " + track_datas);
		
		document.getElementById(SC_PREVIEW_SCROLLBOX).innerHTML = ""; // erase current playlist menu
		loaded_track_uri_map.clear();
		
		for(var i = 0; i < track_datas.length; i += 3)
		{
			console.log("Add preview for track " + track_datas[i] + " title=" + track_datas[i+1] + " VO=" + track_datas[i+2]);
			AddTrackURL(track_datas[i], i/3, track_datas[i+1], Number(track_datas[i+2]));
		}
	}
	
	function Btn_AddUser() // triggered by button "btn_addagent" ("Add User/Admin")
	{
		var agent = window.prompt("Enter the full Username or UUID/key of the user", "");
		if (agent != null && agent.length > 0)
		{
			 MakeXHR("", lslServer + "/admins/lookup/" + agent, LSL_AddUser_Callback, "", "GET");
		}
	}
	
	function LSL_AddUser_Callback(handle, body)
	{
		console.log("LSL_AddUser_Callback: " + body);
		
		var agent = body.split(SEP); // uuid, name
		if (agent.length != 3 || agent[0].length < 1)
			return; // yikes!
		
		if ( ! admin_agent_map.has(agent[0]))
		{
			var agent_obj = {name:agent[1], level:"1"};
			admin_agent_map.set(agent[0], agent_obj);
			console.dir(admin_agent_map);
			BuildAdminUserList();
			LSL_SaveUserAdmin(agent[0]);
		}
	}
	
	function Btn_AddPlaylist() // triggered by button "btn_new" ("New Playlist")
	{
		if (CheckEditLock())
			return;
		
		var name = window.prompt("Enter a name for the new playlist", "Playlist" + (playlist_list.length+1));
		if (name == null || name == "")
			return;
		
		if (playlist_list.includes(name) == false)
		{
			playlist_list.push(name);
			console.log("Added new empty playlist "+name);
			BuildPlaylistSelect();
			edit_playlist = name;
			document.getElementById(SC_PREVIEW_SCROLLBOX).innerHTML = "";
			loaded_track_uri_map.clear();
		}
	}
	
	function Btn_RenPlaylist() // triggered by button "btn_ren" ("Rename Playlist")
	{
		if (CheckEditLock())
			return;
		
		var input = window.prompt("Enter new name for "+edit_playlist, "");
		console.log("Renaming " + edit_playlist + " to " + input);
		MakeXHR("", lslServer + "/ren/" + edit_playlist + "/" + encodeURI(input), LSL_RenPlaylist_Callback, "", "GET");
		edit_lock = true;
		
	}
	
	function LSL_RenPlaylist_Callback(handle, body)
	{
		var data = body.split(SEP);
		if (data[0] != "err")
		{
			////playlist_list.remove(data[0]);
			edit_playlist = data[0];
			console.log("edit_playlist = " + edit_playlist)
			window.alert(data[1]);
		}
		
		edit_lock = false;
		LSL_GetPlaylists();
	}
	
	function Btn_DelPlaylist() // triggered by button "btn_del" ("Delete Playlist")
	{
		if (CheckEditLock())
			return;
		
		var conf = window.prompt("Enter 'delete' to confirm deletion of " + edit_playlist, "");
		if (conf.toLowerCase().includes("delete"))
		{
			console.log("Deleting "+edit_playlist);
			MakeXHR("", lslServer + "/del/" + encodeURI(edit_playlist), LSL_DelPlaylist_Callback, "", "GET");
		}
		edit_lock = true;
	}
	
	function LSL_DelPlaylist_Callback(handle, body)
	{
		/*var data = body.split(SEP);
		if (data[0] != err)
		{
			//playlist_list.remove(data[0]);
			LSL_GetPlaylists();
		}*/
		window.alert(body);
		edit_lock = false;
		LSL_GetPlaylists();
	}
	
	function Btn_SavePlaylist() // triggered by button "btn_save" ("Save Selected Playlist")
	{
		if (CheckEditLock())
			return;
		
		save_track_index = 0;
		console.log("Beginning track save to LSL server");
		var shuffle = document.getElementById("track_randomness");
		edit_playlist_shuffle = shuffle.value / shuffle.max;
		// send the shuffle randomness along with the name of the playlist to save, because why not
		MakeXHR("", lslServer + "/save/start/" + encodeURI(edit_playlist), LSL_SavePlaylist_Callback, edit_playlist_shuffle, "PUT");
		edit_lock = true;
	}
	
	function LSL_SavePlaylist_Callback(handle, body) // start the actual saving operation, back-and-forth with server
	{
		var data = body.split(SEP);
		
		if (data[0] == "END") // server reports all tracks received and saved
		{
			window.alert("Successfully saved playlist " + edit_playlist + "\n" + data[1]);
			edit_lock = false;
		}
		else if (data[0] == "NXT") // server wants the next track's data
		{
			console.log("LSL_SaveTrack_Callback: " + body)
			if (save_track_index >= loaded_track_uri_map.size)
			{
				// inform server that all tracks have been sent, received data should be saved
				MakeXHR("", lslServer + "/save/" + encodeURI(edit_playlist) + "/end", LSL_SavePlaylist_Callback, "", "PUT");
			}
			else
			{
				var track_obj = loaded_track_uri_map.values().toArray()[save_track_index];
				if (track_obj.loaded)
				{
					var track = track_obj.uri + SEP + track_obj.title + SEP + track_obj.duration + SEP + track_obj.volume;
					MakeXHR("", lslServer + "/save/" + encodeURI(edit_playlist) + "/uri", LSL_SavePlaylist_Callback, track, "PUT");
				}
				else
				{
					window.alert("Error: a track is not fully loaded, cannot save playlist"); // yikes. save will abort without issues on server
					for (let [key, value] of loaded_track_uri_map)
						console.dir(value);
					edit_lock = false;
				}
					
				++save_track_index; // counter for track index to send next
			}
		}
	}
	
	function CheckEditLock()
	{
		if (edit_lock)
			window.alert("Editing locked, wait for save/load to complete");
		return edit_lock;
	}
	
	//
	// client player mode functions
	//
	
	function Btn_Play() // triggered by button "btn_play_track" overlaying the track image in the client player
	{
		SetPlayerState("tgl", true);
	}
	
	function SetPlayLabel() // changes the image of the overlay between play/pause media icons
	{
		document.getElementById("play_label").innerHTML = play_btn_icons[main_player_should_play ? 0 : 1];
	}
	
	function LSL_GetNextTrack() // requests the current + next tracks from the server
	{
		console.log("Requesting next track from LSL server");
		MakeXHR("", lslServer+"/next-track", LSL_GetNextTrack_Callback, "", "GET");
	}
	
	function LSL_GetNextTrack_Callback(handle, body)
	{
		console.log("LSL_GetNextTrack_Callback: " + body);
		var args = body.split(SEP);
		
		if (current_track_uri != args[0]) // dont reset player if current track is already playing for some reason
		{
			console.log("LSL_GetNextTrack_Callback Warning: current != returned tracks, setting " + current_track_uri + " -> " + args[0]);
			current_track_uri = args[0];
			current_track_start_time = Number(args[1]);
			current_track_title = args[4];
			current_track_duration = Number(args[6]);
			current_track_vol = DEF_VOL;
			if (args.length > 8)
				current_track_vol = Number(args[8]).log();
			current_track_end_time = current_track_start_time + current_track_duration;
			
			console.log("current track dur = " + current_track_duration +
						", current track start = " + current_track_start_time +
						", current track end = " + current_track_end_time +
						", current track title = " + current_track_title);
			
			PlayNextTrack(); // try to play new track immediately
		}
		
		future_track_uri = args[2];
		future_track_start_time = Number(args[3]);
		future_track_title = args[5];
		future_track_duration = Number(args[7]);
		future_track_vol = DEF_VOL;
		if (args.length > 9)
			future_track_vol = Number(args[9]).log();
		future_track_end_time = future_track_start_time + future_track_duration;
		
	}
	
	function PlayNextTrack() // clears existing player and starts loading the most suitable track, request new future track later
	{
		DeletePlayer();
		track_swap_status = false; // failure state; set to true upon loading completion
		
		jQuery(document).ready(function()
		{
			if (future_track_uri != "")
			{
				// if current track has expired, load the futue one, otherwise keep the current track and try playing it again
				if (UnixTime() > current_track_end_time || current_track_uri.length < 2)
				{
					console.log("Using future track as new current track: " + future_track_uri);
					current_track_uri = future_track_uri;
					current_track_title = future_track_title;
					current_track_duration = future_track_duration;
					current_track_start_time = future_track_start_time;
					current_track_end_time = future_track_end_time;
					current_track_vol = future_track_vol;
					future_track_uri = "";
					future_track_title = "";
				}
				else
				{
					console.log("Reload attempt; keeping current track: " + current_track_uri);
				}
				
				CreatePlayer();
			}
			else // yikes. why is there no future track loaded?
			{
				console.log("Error: future track is null, requesting next track immediately");
				current_track = ""; // ensures LSL_GetNextTrack_Callback tries to play new track immediately
				future_track = "";
				LSL_GetNextTrack(); // server knows best
			}
			setTimeout(CheckSwapStatus, 10000); // something is probably goofed if it cant load in 10 seconds
		});
	}
	
	function CheckSwapStatus() // safety check to see if the track swap did not complete (errors, MIA requests..)
	{
		if (track_swap_status == false)
		{
			console.log("Error: track swap failed, retrying");
			PlayNextTrack();
			setTimeout(CheckSwapStatus, 10000);
		}
		else
			console.log("Track swap suceeded");
	}
	
	function DeletePlayer() // removes the existing player iframe and track data, called before loading new track
	{
		console.log("Deleting current player widget");
		loaded_track_uri_map.clear();
		id_playeriframe_map.clear();
		main_player_widget = null;
		main_player_widget_type = "";
		document.getElementById("client_player_box").innerHTML = "";
	}
	
	function CreatePlayer() // create a suitable player iframe for the next track
	{
		console.log("Creating new player widget");
		if (current_track_uri.includes("soundcloud"))
		{
			SC_CreateIframe("client_player_sc_iframe", "client_player_box");
		}
		else if (current_track_uri.includes("youtu"))
		{
			YT_CreateIframe("client_player_yt_iframe", "client_player_box");
		}
	}
	
	function SetPlayerState(set, manual) // play/pause/toggle the current player
	{
		console.log("SetPlayerState " + set + ", main_player_widget_type="+main_player_widget_type);
		
		if (main_player_widget_type == "yt")
		{
			// https://developers.google.com/youtube/iframe_api_reference#Playback_status
			var state;
			try
			{
				state = main_player_widget.getPlayerState();
			}
			catch(error) // function does not exist ect ect because youtube iframe did not load correctly; try again
			{
				console.dir(main_player_widget);
				console.error(error);
				PlayNextTrack();
			}
			state = (state == 1 || state == 3) ? true : false; // playing/buffering : anything else
			console.log(state);
			
			if (set != "")
			{
				if (set == "tgl")
				{
					main_player_should_play = !state;
					//state = !state;
				}
				else if (set == "play" && manual) // dont start playing automatically if previously paused
				{
					main_player_should_play = true;
					//if (main_player_should_play || manual) // dont re-start player automatically if it was paused manually
					//	state = true;
				}
				else if (set == "pause")
				{
					main_player_should_play = false;
				}
				
				if (main_player_should_play)
				{
					var time_dif = 0 - (current_track_start_time - UnixTime());
					console.log("YTPlayerReady: Track time_dif = " + time_dif);
					if (time_dif > 0)
						main_player_widget.seekTo(time_dif, true);
					main_player_widget.setVolume(current_track_vol);
					main_player_widget.playVideo();
					//main_player_should_play = true;
				}
				else
				{
					main_player_widget.pauseVideo();
					//main_player_should_play = false;
				}
			}
			SetPlayLabel();//main_player_should_play ? 0 : 1); // set the overlay button icon to pause/play
			if (!manual) // not result of user clicking the overlay button
				ScheduleRequestNextTrack();
			
			console.log("Should schedule end play now!");
			ScheduleTrackEnd();
		}
		else if (main_player_widget_type == "sc")
		{
			try
			{
				main_player_widget.isPaused(function(state) // why the hell is a callback needed to determine if a video is paused?
				{
					state = !state;
					console.log(state);
					
					if (set != "")
					{
						if (set == "tgl")
						{
							main_player_should_play = !state;
							//state = !state;
						}
						else if (set == "play" && manual)
						{
							main_player_should_play = true;
							//if (main_player_should_play || manual) // dont re-start player automatically if it was paused manually
							//	state = true;
						}
						else if (set == "pause")
						{
							main_player_should_play = false;
							//state = false;
						}
						if (main_player_should_play)
						{
							console.log("attempting start play");
							var time_dif = 0 - (current_track_start_time - UnixTime());
							console.log("SC_Widget_OnPlay_Callback: Track time_dif = " + time_dif);
							if (time_dif > 0)
							{
								if (time_dif >= (current_track_end_time - current_track_start_time)) // soundcloud wont seek past end, just fails
								{
									console.log("Current track exceeded duration, ending immediately");
									PlayNextTrack();
									return;
								}
								main_player_widget.seekTo(time_dif * 1000);
							}
							main_player_widget.setVolume(current_track_vol);
							main_player_widget.play(); // ERROR TODO this failed to, in fact, play? player is valid, started manually
							//main_player_should_play = true;
						}
						else
						{
							main_player_widget.pause();
							//main_player_should_play = false;
						}
						
						main_player_widget.isPaused(PostSetPlayerStateCheck());
					}
					console.log("final state = " + state);
					SetPlayLabel();//state ? 0 : 1); // set the overlay button icon to pause/play
					if (!manual) // not result of user clicking the overlay button
						ScheduleRequestNextTrack();
					
					ScheduleTrackEnd();
					
				});
			}
			catch(error) // something caught fire
			{
				console.dir(main_player_widget);
				console.error(error);
				PlayNextTrack(); // try again
			}
		}	
	}
	
	function PostSetPlayerStateCheck(is_paused) // sometimes, the soundcloud widget does something strange..
	{
		if ( is_paused == main_player_should_play ) // should be playing but is paused, or the reverse
		{
			console.log("PostSetPlayerStateCheck Error: state is incorrect");
			if (main_player_should_play)
				main_player_widget.play();
			else
				main_player_widget.pause();
			
			setTimeout(function() // make sure it actually did it correctly this time
			{
				main_player_widget.isPaused(PostSetPlayerStateCheck);
			}, 1000);
		}
		else
			console.log("PostSetPlayerStateCheck passed");
	}
	
	function ScheduleTrackEnd()
	{
		console.log("DEBUG: ScheduleTrackEnd did actually run");
		clearTimeout(track_end_timer);
		//if (main_player_should_play)
		//{
			var delay = current_track_end_time - UnixTime() + 5;
			console.log("TrackEndTimer scheduled to run in " + delay);
			track_end_timer = setTimeout(TrackEndTimer, delay * 1000);
		//}
	}
	
	function TrackEndTimer()
	{
		console.log("TrackEndTimer: should_play = " + main_player_should_play);
		//if (main_player_should_play)
		PlayNextTrack();
	}
	
	function ScheduleRequestNextTrack() // called by non-manual player state changes, aka initial play start
	{
		if (future_track_uri == "")
		{
			// make the request shortly before the end of the current track
			const rqt = (current_track_end_time - UnixTime()) - 5 - Math.random() * 25;
			console.log("scheduled next track request in " + rqt);
			clearTimeout(next_track_rq_timer);
			next_track_rq_timer = setTimeout(LSL_GetNextTrack, rqt * 1000);
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
		if (loaded_track_uri_map.has(iframe.id) == false)
		{
			var track_obj = {};
			track_obj.uri = current_track_uri;
			track_obj.src_url = "";
			track_obj.loaded = false;
			track_obj.title = current_track_title;
			track_obj.volume = current_track_vol;
			loaded_track_uri_map.set(iframe.id, track_obj);
		}
		else
		{
			console.log("Track is already in loaded_track_uri_map");
		}
		
		jQuery(document).ready(function()
		{
			var newSCWidget = SC.Widget(iframe.id);
			id_playeriframe_map.set(iframe.id, newSCWidget);
			console.log("Created scWidget for id "+iframe.id);
			newSCWidget.bind(SC.Widget.Events.READY, SC_Widget_Event_READY(iframe.id));
		});
	}
	
	function SC_Widget_Event_READY(iframe_id)
	{
		console.log(" !! SC_Widget_Event_READY !! ");
		if (page_type == "player")
		{
			console.log("player soundcloud widget " + iframe_id + " ready, playing next track " + current_track_uri);
			//SC_LoadTrack(iframe_id, current_track_uri);
			SC_GetOembedURL(iframe_id, current_track_uri);
			//MakeXHR("", lslServer+"/save", LSL_GetNextTrack_Callback, track, "GET");
		}
		else
		{
			console.log("preview soundcloud widget " + iframe_id + " ready, loading track");
			var trackURL = loaded_track_uri_map.get(iframe_id).src_url;
			var scWidget = id_playeriframe_map.get(iframe_id);
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
		if (jsonstr.substring(0, 1) === '(') // what the fuck is this round-edged safety json
			jsonstr = jsonstr.substring(1, jsonstr.length - 2);
		var oembedResult = JSON.parse(jsonstr);
		console.log("SC_GetOembedURL_Callback for " + id + ", TrackData: " + oembedResult);
		var oembedHtml = oembedResult.html;
		var start = oembedHtml.indexOf("url=");
		var end = oembedHtml.indexOf("&", start);
		console.log(start + " " + end);
		var urlSubstr = oembedHtml.substring(start+4, end);
		console.log("url=" + urlSubstr);
		
		urlSubstr = decodeURIComponent(urlSubstr);
		var track_obj = loaded_track_uri_map.get(id);
		track_obj.uri = urlSubstr;
		loaded_track_uri_map.set(id, track_obj);
		console.log("track.obj.uri=" + urlSubstr);
		
		if (page_type == "player")
		{
			document.getElementById("titlespan").innerHTML = Sanitize(track_obj.title);//ReplaceAll(track_obj.title, "&", "&amp;");//track_obj.title;
			
			if (oembedResult.thumbnail_url.includes("placeholder"))
			{
				console.log("Missing thumbnail and art, requesting author thumbnail");
				MakeXHR("", "https://soundcloud.com/oembed?format=js&url="+oembedResult.author_url, SC_GetAuthorJSON_Callback, "", "GET");
			}
			else
			{
				var icon = document.getElementById("icon");
				icon.src = oembedResult.thumbnail_url;
				icon.style.height = '480px';
				icon.style.width = '480px';
				icon.style.top = '0px';
			}
		}
		
		SC_LoadTrack(id, urlSubstr);
	}
	
	function SC_GetAuthorJSON_Callback(id, jsonstr)
	{
		if (jsonstr.substring(0, 1) === '(') // what the fuck is this round-edged safety json
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
		options.auto_play = false;
		options.download = false;
		options.show_artwork = true;
		options.show_playcount = false;
		options.sharing = false;
		options.hide_related = true;
		options.show_comments = false;
		options.show_user = false;
		options.show_reposts = false;
		options.show_teaser = false;
		
		var player = id_playeriframe_map.get(id);
		
		if (page_type == "player")
		{
			var time_dif = current_track_start_time - UnixTime();
			console.log("Track time_dif = " + time_dif);
			if (time_dif > 1)
			{
				console.log("Delaying track start");
				setTimeout(function() { SetPlayerState("play", false); }, time_dif * 1000);
			}
			else
			{
				options.auto_play = true;
				console.log("Starting track immediately");
				SetPlayerState("play", false);
			}
			main_player_widget = player;
			main_player_widget_type = "sc";
		}
		else
		{
			var trunc = id.replace(SC_PREVIEW_IFRAME, "");
			id_iframe_map_v2.set(trunc, player);
			console.log("added " + trunc + " to id_iframe_map_v2");
		}
		
		setTimeout(function() { GetMissingTrackData(); }, 1000);
		
		player.load(url, options);
		player.bind(SC.Widget.Events.PLAY_PROGRESS, SC_Widget_OnStartPlay_Callback);
		player.bind(SC.Widget.Events.FINISH, SC_Widget_OnFinish_Callback);
	}
	
	function SC_Widget_OnStartPlay_Callback()
	{
		if (page_type == "player")
		{
			console.log("SC_Widget_OnPlay_Callback");
			main_player_widget.unbind(SC.Widget.Events.PLAY_PROGRESS);
			var time_dif = current_track_start_time - UnixTime();
			console.log("SC_Widget_OnPlay_Callback: Track time_dif = " + time_dif);
			if (time_dif < 0)
			{
				main_player_widget.seekTo(0 - time_dif * 1000);
			}
		}
	}
	
	function SC_Widget_OnFinish_Callback()
	{
		// TODO ERROR this may fail to trigger if a track is paused and resumed, ensure it is bound?
		if (page_type == "player")
		{
			console.log("Soundcloud track reached end");
			
			// this seems slightly unreliable, using pre-set timer instead
			//setTimeout( function () { PlayNextTrack() }, 1000 );
		}
	}
	
	function GetMissingTrackData()
	{
		console.log("GetMissingTrackData");
		
		var is_any_missing = false;
		
		for (let [key, value] of loaded_track_uri_map)
		{
			if (value.hasData != true)
			{
				var player = id_playeriframe_map.get(key);
				if (player)
				{
					console.log("requesting sound data for " + key);
					player.getCurrentSound(getCurrentSound_Callback);
					is_any_missing = true;
				}
			}
		}
		
		if (is_any_missing)
			setTimeout(function() { GetMissingTrackData(); }, 2500);
	}
	
	function getCurrentSound_Callback(sound) // data on the current soundcloud track; duration, title, ect
	{
		if (sound == null)
		{
			console.log("no sound loaded yet or an error occured");
			return;
		}
		track_swap_status = true; // looks like it loaded successfully
		
		console.log("got sound data for " + sound.id + ", updating display");
		
		var match = false;
		for (let [key, value] of loaded_track_uri_map)
		{
			if (value.uri == sound.uri)
			{
				match = true;
				console.log("found URL matching ID " + value.uri);
				if (value.hasData != true)
				{
					value.hasData = true;
					if (value.title.length < 1)
						value.title = sound.title;
					value.duration = Math.round(sound.duration / 1000);
					value.loaded = true;
					loaded_track_uri_map.set(key, value);
					
					/*
					console.log("properties in sound data:");
					for(var propertyName in sound)
					{
						console.log(propertyName + "=" + sound[propertyName]);
					}
					*/
				}
				break;
			}
		}
		
		if (!match)
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
	
	//
	// youtube widget related
	//
	
	function YT_CreateIframe(id, insert_to)
	{
		// this is a div that magically turns into an iframe for reason we wont think about too carefully
		// using an iframe from the start causes youtube to have a screaming meltdown for some reason we also wont think about
		var ihtml = document.getElementById("TMP_yt_iframe").cloneNode(true).innerHTML;
		ihtml = ReplaceAll(ihtml, "%id%", id);
		
		console.log("creating youtube iframe from template");
		document.getElementById(insert_to).insertAdjacentHTML("beforeend",ihtml);
		
		jQuery(document).ready(function()
		{
			var iframe = document.getElementById(id);
			if (iframe == null)
				return;
			
			id_playeriframe_map.set(id, iframe);
			
			var ytid;
			var track;
			var track_obj;
			
			if (loaded_track_uri_map.has(id) == false) // fairly sure this state will never occur naturally, but..
			{
				console.log("track not already loaded in trackmap, creating defaults");
				track = current_track_uri;
				track_obj = {};
				track_obj.uri = track;
				track_obj.src_url = track;
				track_obj.title = current_track_title;
				track_obj.volume = current_track_vol;
				loaded_track_uri_map.set(iframe.id, track_obj);
				ytid = GetYoutubeID(track);
			}
			else
			{
				console.log("found track in track map:");
				track_obj = loaded_track_uri_map.get(id);
				console.dir(track_obj);
				track = track_obj.src_url;
				console.log("src_url = "+track);
				ytid = GetYoutubeID(track); // sus
				if (ytid == null)
					ytid = track.split("/").slice(-1);
				track_obj.uri = "https://youtube.com/embed/" + ytid;
				loaded_track_uri_map.set(id, track_obj);
				console.log("Track is already in loaded_track_uri_map");
			}
		
			console.log("track id = " + ytid);
			console.log("youtube iframe ready");
			
			console.log("youtube track url = " + track_obj.uri);
			
			var player = new YT.Player(iframe.id,
			{
				height: '390',
				width: '640',
				videoId: ytid,
				playerVars: // https://developers.google.com/youtube/player_parameters#Parameters
				{
					'playsinline': 1, // may as well leave this in to giggle about someone somehow creating a situation where it matters
					'disablekb': 1,
					'iv_load_policy': 3,
					'controls': 0
				},
				events:
				{
					"onReady": YTPlayerReady,
					"onStateChange": YTPlayerStateChange
				}
			});
			
			if(page_type == "player")
			{
				main_player_widget = player;
				main_player_widget_type = "yt";
			}
			else
			{
				var trunc = id.replace(SC_PREVIEW_IFRAME, "");
				id_iframe_map_v2.set(trunc, player);
				console.log("added " + trunc + " to id_iframe_map_v2");
			}
			
			console.dir(main_player_widget);
		});
	}
	
	function YTPlayerReady(event)
	{
		main_player_widget = event.target;
		//console.dir(event.target);
		console.log("YTPlayerReady: src = " + event.target.g.src);
		console.log("iframe id = " + event.target.g.id);
		
		var ytid = GetYoutubeID(event.target.g.src);
		console.log("ytid = " + ytid);
		
		var track_obj = loaded_track_uri_map.get(event.target.g.id);
		if (track_obj.title.length < 1)
		{
			track_obj.title = event.target.videoTitle;
			console.log("Using retrieved video title due to missing title data");
		}
	
		if (page_type == "player")
		{
			track_swap_status = true;
			document.getElementById("titlespan").innerHTML = Sanitize(track_obj.title);//ReplaceAll(track_obj.title, "&", "&amp;");//track_obj.title;
			var icon = document.getElementById("icon");
			icon.src = "https://img.youtube.com/vi/" + ytid + "/0.jpg"
			icon.style.height = '360px';
			icon.style.width = '480px';
			icon.style.top = '60px';
			
			var time_dif = current_track_start_time - UnixTime();
			console.log("YTPlayerReady: Track time_dif = " + time_dif);
			
			if (time_dif < 1)
			{
				event.target.seekTo(0 - time_dif, true);
				SetPlayerState("play", false);
			}
			else
			{
				setTimeout(function() { SetPlayerState("play", false);/*event.target.playVideo();*/ }, time_dif * 1000);
			}
		}
		else
		{
			/*var track_obj = loaded_track_uri_map.get(event.target.g.id);
			if (track_obj.title.length < 1)
			{
				track_obj.title = event.target.videoTitle;
				console.log("Using retrieved video title due to missing title data");
			}*/
			track_obj.duration = event.target.getDuration();
			// current_track_end_time = current_track_start_time + track_obj.duration;
			track_obj.loaded = true;
			loaded_track_uri_map.set(event.target.g.id, track_obj);
			//console.dir(track_obj);
		}
	}
	
	function YTPlayerStateChange(event)
	{
		if (event.data == YT.PlayerState.ENDED && page_type == "player")
		{
			console.log("Youtube track reached end");
			// this seems slightly unreliable, using pre-set timer instead
			//setTimeout( function () { PlayNextTrack() }, 1000 );
		}
	}
	
	function GetYoutubeID(url)
	{
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);

		return (match && match[2].length === 11) ? match[2] : null;
	}
	
	//
	// Big Red Launch Button
	//
	
	InitPage();