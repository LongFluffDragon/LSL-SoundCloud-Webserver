	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoJCgkuaWZyYW1lYm94Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiAxNzJweDsKCQl3aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTcycHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQk1MTJweDsKCQlib3JkZXItcmFkaXVzOiAwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBsZWZ0OwoJfQoJCgkuaWNvbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogMjU2cHg7CgkJd2lkdGg6IDI1NnB4OwoJCXBvc2l0aW9uOiAJCWFic29sdXRlOwoJCWxlZnQ6IAkJCTY0cHg7CgkJdG9wOiAJCQk2NHB4OwoJCWJvcmRlci1yYWRpdXM6IDBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogMCBhdXRvOwoJCW1pbi1oZWlnaHQ6IDE2NnB4OwoJCW1pbi13aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTY2cHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkzcHg7CgkJdG9wOiAJCQkzcHg7CgkJYm9yZGVyLXJhZGl1czogM3B4OwogICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzs9Cgl9CgkKCS5sb2dpbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogNTEycHg7CgkJd2lkdGg6IDEwMjRweDsKCQltYXJnaW4tdG9wOiAxMjhweDsKCQljb2xvcjogd2hpdGU7CgkJYm9yZGVyLXJhZGl1czogMTZweDsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzsKCQlkaXNwbGF5OiBmbGV4OwoJCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJfQ==";
	
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJzY19pZnJhbWUiPgoJPGlmcmFtZSBpZCA9ICJzb3VuZGNsb3VkX2lmcmFtZSIgY2xhc3M9IndpZGdldCIgd2lkdGg9IjUxMiIgaGVpZ2h0PSIxNjYiIHNjcm9sbGluZz0ibm8iIGZyYW1lYm9yZGVyPSJubyIgYWxsb3c9ImF1dG9wbGF5IiBvbmxvYWQ9InNvdW5kY2xvdWRfb25sb2FkKHRoaXMpIiAKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJzY190cmFja19zZXR1cCI+Cgk8ZGl2PmhlbGxvPC9kaXY+Cgk8aW5wdXQgdHlwZT0idXJsIiBpZD0idGV4dF9pbnB1dF91cmwiPjwvaW5wdXQ+Cgk8aW5wdXQgdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2FkZF91cmwiIG9uY2xpY2s9ImFkZF90cmFja191cmwoKSI+QUREPC9pbnB1dD4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0ic2NfcGxheWVyX3BhZ2UiPgoJPGRpdiBpZD0idGl0bGVib3giIGNsYXNzPSJ0aXRsZWJveCI+CgkJPHNwYW4gaWQ9InRpdGxlc3BhbiI+PC9zcGFuPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJpY29uYm94Ij4KCQk8aW1nIGlkPSJpY29uIiBjbGFzcz0iaWNvbiIgc3JjPSIiPjwvaW1nPgoJPC9kaXY+Cgk8ZGl2IGlkPSJpZnJhbWVib3giIGNsYXNzPSJpZnJhbWVib3giPgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9InNjX3RyYWNrX3ByZXZpZXciPgoJPHNwYW4+JXRpdGxlJTwvc3Bhbj4KCTxkaXYgaWQ9InByZXZpZXdfJXRyYWNrJSI+PC9kaXY+CjwvdGVtcGxhdGU+";
	
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij48L2Rpdj4=";

	
	console.log("beginning injection");
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	