	
	var pagecss = "dGVzdA==";
	
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJzY19pZnJhbWUiPgoJPGlmcmFtZSBpZCA9ICJzb3VuZGNsb3VkX2lmcmFtZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMzAwIiBzY3JvbGxpbmc9Im5vIiBmcmFtZWJvcmRlcj0ibm8iIGFsbG93PSJhdXRvcGxheSIgb25sb2FkPSJzb3VuZGNsb3VkX29ubG9hZCh0aGlzKSIgCglzcmM9Imh0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbS9wbGF5ZXIvP3VybD1odHRwcyUzQS8vYXBpLnNvdW5kY2xvdWQuY29tL3RyYWNrcy8yMjk3NzM0MDEmY29sb3I9JTIzZmY1NTAwJmhpZGVfcmVsYXRlZD1mYWxzZSZzaG93X2NvbW1lbnRzPXRydWUmc2hvd191c2VyPXRydWUmc2hvd19yZXBvc3RzPWZhbHNlJnNob3dfdGVhc2VyPXRydWUmdmlzdWFsPXRydWUiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPg==";
	
	var pagebody = "PGRpdiBpZD0iaWZyYW1lYm94Ij4KPC9kaXY+";

	
	console.log("beginning injection");
	//document.head.innerHTML=atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	