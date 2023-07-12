
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
					
		document.getElementById("iframebox").insertAdjacentHTML('beforeend',ihtml);
	}
	
	create_soundcloud_iframe();
	
