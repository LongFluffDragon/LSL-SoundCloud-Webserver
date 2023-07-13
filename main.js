
	var scWidget;

	function replace_all(str,tkn,rep)
	{
		var next;
		while((next=str.indexOf(tkn,next))!=-1)
		{
			str=replace_sub(str,rep,next,next+tkn.length);
			next+=rep.length;
		}
		return str;
	}
	
	function replace_sub(str, rep, start, end)
	{
		return str.substr(0, start) + rep + str.substr(end);
	}
	
	function create_soundcloud_iframe()
	{
		var ihtml=document.getElementById("sc_iframe").cloneNode(true).innerHTML;
		console.log("creating iframe from template");
		document.getElementById("iframebox").insertAdjacentHTML("beforeend",ihtml);
	}
	
	function soundcloud_onload(iframe)
	{
		console.log("iframe loaded "+iframe);
		$(document).ready(function()
		{
			scWidget = SC.Widget(document.getElementById("soundcloud_iframe"));
			scWidget.bind(SC.Widget.Events.READY, function()
			{
				console.log("soundcloud widget ready, attempting to play");
				var heck = scWidget.play();
				console.log("play result = "+heck);
			});
			$('button').click(function()
			{
				scWidget.toggle();
			});
			//widget.toggle();
			console.log("setup complete");
		});
		//document.getElementById("playbtn").click();
	};
	
	document.onclick = function(event)
	{
		// Compensate for IE<9's non-standard event model
		//
		if (event===undefined) event= window.event;
		var target= 'target' in event? event.target : event.srcElement;

		scWidget.play();
	};
	
	
	create_soundcloud_iframe();
	
