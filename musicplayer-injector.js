	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoJCgkuaWZyYW1lYm94Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiAxNzJweDsKCQl3aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTcycHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQk1MTJweDsKCQlib3JkZXItcmFkaXVzOiAwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBsZWZ0OwoJfQoJCgkuaWNvbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogMjU2cHg7CgkJd2lkdGg6IDI1NnB4OwoJCXBvc2l0aW9uOiAJCWFic29sdXRlOwoJCWxlZnQ6IAkJCTY0cHg7CgkJdG9wOiAJCQk2NHB4OwoJCWJvcmRlci1yYWRpdXM6IDBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogMCBhdXRvOwoJCW1pbi1oZWlnaHQ6IDE2NnB4OwoJCW1pbi13aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTY2cHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkzcHg7CgkJdG9wOiAJCQkzcHg7CgkJYm9yZGVyLXJhZGl1czogM3B4OwogICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzs9Cgl9CgkKCS5sb2dpbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogNTEycHg7CgkJd2lkdGg6IDEwMjRweDsKCQltYXJnaW4tdG9wOiAxMjhweDsKCQljb2xvcjogd2hpdGU7CgkJYm9yZGVyLXJhZGl1czogMTZweDsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzsKCQlkaXNwbGF5OiBmbGV4OwoJCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJfQ==";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdj4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxPQUQgVFJBQ0tTPC9idXR0b24+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fc2F2ZSIgb25jbGljaz0iQnRuX1NhdmVQbGF5bGlzdCgpIj5TQVZFIENIQU5HRVM8L2J1dHRvbj4KCTwvZGl2PgoJPGRpdj5FbnRlciBTb3VuZGNsb3VkIHRyYWNrIFVSTDo8L2Rpdj4KCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCI+PC9pbnB1dD4KCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2FkZF91cmwiIG9uY2xpY2s9IkJ0bl9BZGRUcmFja1VSTCgpIj5BREQ8L2J1dHRvbj4KCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjUyMnB4Ij48L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3BsYXllcl9wYWdlIj4KCTxkaXYgaWQ9InRpdGxlYm94IiBjbGFzcz0idGl0bGVib3giPgoJCTxzcGFuIGlkPSJ0aXRsZXNwYW4iPjwvc3Bhbj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0iaWNvbmJveCI+CgkJPGltZyBpZD0iaWNvbiIgY2xhc3M9Imljb24iIHNyYz0iIj48L2ltZz4KCTwvZGl2PgoJPGRpdiBpZD0iY2xpZW50X3BsYXllcl9ib3giIGNsYXNzPSJpZnJhbWVib3giPgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY190cmFja19wcmV2aWV3Ij4KCTxkaXYgaWQ9InByZXZpZXdfc2Nyb2xsXyV0cmFjayUiPgoJCTxkaXY+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3JlbW92ZV90cmFjayIgb25jbGljaz0iQnRuX1JlbW92ZVRyYWNrSUQoJyV0cmFjayUnKSI+REVMRVRFPC9idXR0b24+CgkJCSV0aXRsZSUKCQk8L2Rpdj4KCQk8ZGl2IGlkPSJwcmV2aWV3X2lmcmFtZV8ldHJhY2slIj48L2Rpdj4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfeXRfbm90ZnJhbWUiPgoJPGRpdiBpZD0iJWlkJSIgY2xhc3M9IndpZGdldCIgc3R5bGU9InBvc2l0aW9uOnJlbGF0aXZlOyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSIzNjAiCglzY3JvbGxpbmc9Im5vIiBmcmFtZWJvcmRlcj0ibm8iCgk+PC9kaXY+CjwvdGVtcGxhdGU+";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2024/12/23, 20:20:49";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	