	
	var pagecss = "#CSS";
	var pagetemplates = "#TEMP";
	var pagebody = "#BODY";
	var build_date = "#BUILD_DATE";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	