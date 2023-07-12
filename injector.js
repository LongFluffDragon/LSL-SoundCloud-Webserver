	
	/*
		javascript file loaded by the minimal initial page; decodes css, templates, and page body from base64
		this is required due to the 64KB LSL limit greatly restricting the size of the initial page served from the script, and to bypass CORS
		original files are src_css.html, src_templates.html, src_body.html, src_injector.js
		run build_injector.py to encode source files and produce injector.js
	*/
	
	var pagecss = "dGVzdA==";
	
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJzY19pZnJhbWUiPgoJPGlmcmFtZSB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIzMDAiIHNjcm9sbGluZz0ibm8iIGZyYW1lYm9yZGVyPSJubyIgYWxsb3c9ImF1dG9wbGF5IiBzcmM9Imh0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbS9wbGF5ZXIvP3VybD1odHRwcyUzQS8vYXBpLnNvdW5kY2xvdWQuY29tL3RyYWNrcy8yMjk3NzM0MDEmY29sb3I9JTIzZmY1NTAwJmF1dG9fcGxheT10cnVlJmhpZGVfcmVsYXRlZD1mYWxzZSZzaG93X2NvbW1lbnRzPXRydWUmc2hvd191c2VyPXRydWUmc2hvd19yZXBvc3RzPWZhbHNlJnNob3dfdGVhc2VyPXRydWUmdmlzdWFsPXRydWUiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPg==";
	
	var pagebody = "PGRpdiBpZD0iaWZyYW1lYm94Ij4KPC9kaXY+";

	
	document.head.innerHTML=atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	