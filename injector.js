	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoJCgkuaWZyYW1lYm94Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiAxNzJweDsKCQl3aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTcycHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQk1MTJweDsKCQlib3JkZXItcmFkaXVzOiAwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBsZWZ0OwoJfQoJCgkuaWNvbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogMjU2cHg7CgkJd2lkdGg6IDI1NnB4OwoJCXBvc2l0aW9uOiAJCWFic29sdXRlOwoJCWxlZnQ6IAkJCTY0cHg7CgkJdG9wOiAJCQk2NHB4OwoJCWJvcmRlci1yYWRpdXM6IDBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogMCBhdXRvOwoJCW1pbi1oZWlnaHQ6IDE2NnB4OwoJCW1pbi13aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTY2cHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkzcHg7CgkJdG9wOiAJCQkzcHg7CgkJYm9yZGVyLXJhZGl1czogM3B4OwogICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzs9Cgl9CgkKCS5sb2dpbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogNTEycHg7CgkJd2lkdGg6IDEwMjRweDsKCQltYXJnaW4tdG9wOiAxMjhweDsKCQljb2xvcjogd2hpdGU7CgkJYm9yZGVyLXJhZGl1czogMTZweDsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzsKCQlkaXNwbGF5OiBmbGV4OwoJCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJfQ==";
	
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJzY19pZnJhbWUiPgoJPGlmcmFtZSBpZCA9ICJzb3VuZGNsb3VkX2lmcmFtZSIgY2xhc3M9IndpZGdldCIgd2lkdGg9IjUxMiIgaGVpZ2h0PSIxNjYiIHNjcm9sbGluZz0ibm8iIGZyYW1lYm9yZGVyPSJubyIgYWxsb3c9ImF1dG9wbGF5IiBvbmxvYWQ9InNvdW5kY2xvdWRfb25sb2FkKHRoaXMpIiAKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPg==";
	
	var pagebody = "CjxkaXYgaWQ9InRpdGxlYm94IiBjbGFzcz0idGl0bGVib3giPgoJPHNwYW4gaWQ9InRpdGxlc3BhbiI+PC9zcGFuPgo8L2Rpdj4KCjxkaXYgY2xhc3M9Imljb25ib3giPgoJPGltZyBpZD0iaWNvbiIgY2xhc3M9Imljb24iIHNyYz0iIj48L2ltZz4KPC9kaXY+Cgo8ZGl2IGlkPSJpZnJhbWVib3giIGNsYXNzPSJpZnJhbWVib3giPgo8L2Rpdj4=";

	
	console.log("beginning injection");
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	