	
	var pagecss = "#CSS";
	
	var pagetemplates = "#TEMP";
	
	var pagebody = "#BODY";

	
	console.log("beginning injection");
	document.head.innerHTML=atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	