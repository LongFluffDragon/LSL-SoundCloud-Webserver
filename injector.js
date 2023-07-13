	
	var pagecss = "dGVzdA==";
	
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJzY19pZnJhbWUiPgoJPGlmcmFtZSBpZCA9ICJzb3VuZGNsb3VkX2lmcmFtZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMzAwIiBzY3JvbGxpbmc9Im5vIiBmcmFtZWJvcmRlcj0ibm8iIGFsbG93PSJhdXRvcGxheSIgb25sb2FkPSJzb3VuZGNsb3VkX29ubG9hZCh0aGlzKSIgCglzcmM9Imh0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbS9wbGF5ZXIvP3VybD1odHRwcyUzQS8vYXBpLnNvdW5kY2xvdWQuY29tL3RyYWNrcy8yMjk3NzM0MDEmYW1wO2NvbG9yPSUyM2ZmNTUwMCZhbXA7aGlkZV9yZWxhdGVkPWZhbHNlJmFtcDtzaG93X2NvbW1lbnRzPXRydWUmYW1wO3Nob3dfdXNlcj10cnVlJmFtcDtzaG93X3JlcG9zdHM9ZmFsc2UmYW1wO3Nob3dfdGVhc2VyPXRydWUmYW1wO3Zpc3VhbD10cnVlIj48L2lmcmFtZT4KPC90ZW1wbGF0ZT4=";
	
	var pagebody = "PGRpdiBpZD0iaWZyYW1lYm94Ij4KPC9kaXY+";

	
	console.log("beginning injection");
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	