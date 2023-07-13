	
	var pagecss = "dGVzdA==";
	
	var pagetemplates = "aGVjaw==";
	
	var pagebody = "PGRpdiBpZD0iaWZyYW1lYm94Ij4KPC9kaXY+";

	
	console.log("beginning injection");
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	