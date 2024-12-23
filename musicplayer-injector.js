	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoJCgkuaWZyYW1lYm94Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiAxNzJweDsKCQl3aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTcycHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQk1MTJweDsKCQlib3JkZXItcmFkaXVzOiAwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBsZWZ0OwoJfQoJCgkuaWNvbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogMjU2cHg7CgkJd2lkdGg6IDI1NnB4OwoJCXBvc2l0aW9uOiAJCWFic29sdXRlOwoJCWxlZnQ6IAkJCTY0cHg7CgkJdG9wOiAJCQk2NHB4OwoJCWJvcmRlci1yYWRpdXM6IDBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogMCBhdXRvOwoJCW1pbi1oZWlnaHQ6IDE2NnB4OwoJCW1pbi13aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTY2cHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkzcHg7CgkJdG9wOiAJCQkzcHg7CgkJYm9yZGVyLXJhZGl1czogM3B4OwogICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzs9Cgl9CgkKCS5sb2dpbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogNTEycHg7CgkJd2lkdGg6IDEwMjRweDsKCQltYXJnaW4tdG9wOiAxMjhweDsKCQljb2xvcjogd2hpdGU7CgkJYm9yZGVyLXJhZGl1czogMTZweDsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzsKCQlkaXNwbGF5OiBmbGV4OwoJCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJfQ==";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IiBzY3JvbGxpbmc9Im5vIiBmcmFtZWJvcmRlcj0ibm8iIG9ubG9hZD0iU0NfSWZyYW1lVGVtcGxhdGVfb25sb2FkKHRoaXMpIgoJc3JjPSJodHRwczovL3cuc291bmRjbG91ZC5jb20vcGxheWVyLz91cmw9aHR0cHMlM0EvL2FwaS5zb3VuZGNsb3VkLmNvbS90cmFja3MvcGxhY2Vob2xkZXImYW1wO3Zpc3VhbD1mYWxzZSI+PC9pZnJhbWU+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY190cmFja19zZXR1cCI+Cgk8ZGl2PgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2xvYWQiIG9uY2xpY2s9IkJ0bl9Mb2FkUGxheWxpc3QoKSI+TE9BRCBUUkFDS1M8L2J1dHRvbj4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9zYXZlIiBvbmNsaWNrPSJCdG5fU2F2ZVBsYXlsaXN0KCkiPlNBVkUgQ0hBTkdFUzwvYnV0dG9uPgoJPC9kaXY+Cgk8ZGl2PkVudGVyIFNvdW5kY2xvdWQgdHJhY2sgVVJMOjwvZGl2PgoJPGlucHV0IHR5cGU9InVybCIgaWQ9InRleHRfaW5wdXRfdXJsIj48L2lucHV0PgoJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fYWRkX3VybCIgb25jbGljaz0iQnRuX0FkZFRyYWNrVVJMKCkiPkFERDwvYnV0dG9uPgoJPGRpdiBpZD0ic2NfcHJldmlld19zY3JvbGwiIHN0eWxlPSJvdmVyZmxvdy15OnNjcm9sbDtwYWRkaW5nOjVweDttYXgtd2lkdGg6NTIycHgiPjwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfcGxheWVyX3BhZ2UiPgoJPGRpdiBpZD0idGl0bGVib3giIGNsYXNzPSJ0aXRsZWJveCI+CgkJPHNwYW4gaWQ9InRpdGxlc3BhbiI+PC9zcGFuPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJpY29uYm94Ij4KCQk8aW1nIGlkPSJpY29uIiBjbGFzcz0iaWNvbiIgc3JjPSIiPjwvaW1nPgoJPC9kaXY+Cgk8ZGl2IGlkPSJjbGllbnRfcGxheWVyX2JveCIgY2xhc3M9ImlmcmFtZWJveCI+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3RyYWNrX3ByZXZpZXciPgoJPGRpdiBpZD0icHJldmlld19zY3JvbGxfJXRyYWNrJSI+CgkJPGRpdj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fcmVtb3ZlX3RyYWNrIiBvbmNsaWNrPSJCdG5fUmVtb3ZlVHJhY2tJRCgnJXRyYWNrJScpIj5ERUxFVEU8L2J1dHRvbj4KCQkJJXRpdGxlJQoJCTwvZGl2PgoJCTxkaXYgaWQ9InByZXZpZXdfaWZyYW1lXyV0cmFjayUiPjwvZGl2PgoJPC9kaXY+CjwvdGVtcGxhdGU+";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij48L2Rpdj4=";
	var build_date = "2024/12/22, 18:30:24";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	