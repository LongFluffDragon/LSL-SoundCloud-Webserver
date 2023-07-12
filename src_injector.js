	
	/*
		javascript file loaded by the minimal initial page; decodes css, templates, and page body from base64
		this is required due to the 64KB LSL limit greatly restricting the size of the initial page served from the script, and to bypass CORS
		original files are src_css.html, src_templates.html, src_body.html, src_injector.js
		run build_injector.py to encode source files and produce injector.js
	*/
	
	var pagecss = "#CSS";
	
	var pagetemplates = "#TEMP";
	
	var pagebody = "#BODY";

	
	document.head.innerHTML=atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	