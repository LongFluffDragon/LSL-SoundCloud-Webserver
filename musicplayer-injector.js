	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoJCgkuaWZyYW1lYm94Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiAxNzJweDsKCQl3aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTcycHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQk1MTJweDsKCQlib3JkZXItcmFkaXVzOiAwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBsZWZ0OwoJfQoJCgkuaWNvbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogMjU2cHg7CgkJd2lkdGg6IDI1NnB4OwoJCXBvc2l0aW9uOiAJCWFic29sdXRlOwoJCWxlZnQ6IAkJCTY0cHg7CgkJdG9wOiAJCQk2NHB4OwoJCWJvcmRlci1yYWRpdXM6IDBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogMCBhdXRvOwoJCW1pbi1oZWlnaHQ6IDE2NnB4OwoJCW1pbi13aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTY2cHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkzcHg7CgkJdG9wOiAJCQkzcHg7CgkJYm9yZGVyLXJhZGl1czogM3B4OwogICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzs9Cgl9CgkKCS5sb2dpbgoJewoJCW1hcmdpbjogMCBhdXRvOwoJCWhlaWdodDogNTEycHg7CgkJd2lkdGg6IDEwMjRweDsKCQltYXJnaW4tdG9wOiAxMjhweDsKCQljb2xvcjogd2hpdGU7CgkJYm9yZGVyLXJhZGl1czogMTZweDsKICAgICAgICBvdmVyZmxvdy15OiBoaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogIzRENkZCMzsKCQlkaXNwbGF5OiBmbGV4OwoJCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJfQ==";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdj4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxPQUQgVFJBQ0tTPC9idXR0b24+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fc2F2ZSIgb25jbGljaz0iQnRuX1NhdmVQbGF5bGlzdCgpIj5TQVZFIENIQU5HRVM8L2J1dHRvbj4KCTwvZGl2PgoJPGRpdj5FbnRlciBTb3VuZGNsb3VkL1lvdXR1YmUgdHJhY2sgVVJMOjwvZGl2PgoJPGlucHV0IHR5cGU9InVybCIgaWQ9InRleHRfaW5wdXRfdXJsIj48L2lucHV0PgoJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fYWRkX3VybCIgb25jbGljaz0iQnRuX0FkZFRyYWNrVVJMKCkiPkFERDwvYnV0dG9uPgoJPGRpdiBpZD0ic2NfcHJldmlld19zY3JvbGwiIHN0eWxlPSJvdmVyZmxvdy15OnNjcm9sbDtwYWRkaW5nOjVweDttYXgtd2lkdGg6NjAwcHg7bWF4LWhlaWdodDo4MDBweCI+PC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19wbGF5ZXJfcGFnZSI+Cgk8ZGl2IGlkPSJ0aXRsZWJveCIgY2xhc3M9InRpdGxlYm94Ij4KCQk8c3BhbiBpZD0idGl0bGVzcGFuIj48L3NwYW4+Cgk8L2Rpdj4KCTxkaXYgY2xhc3M9Imljb25ib3giPgoJCTxpbWcgaWQ9Imljb24iIGNsYXNzPSJpY29uIiBzcmM9IiI+PC9pbWc+Cgk8L2Rpdj4KCTxkaXYgaWQ9ImNsaWVudF9wbGF5ZXJfYm94IiBjbGFzcz0iaWZyYW1lYm94Ij4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfcHJldmlldyI+Cgk8ZGl2IGlkPSJwcmV2aWV3X3Njcm9sbF8ldHJhY2slIj4KCQk8ZGl2PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9yZW1vdmVfdHJhY2siIG9uY2xpY2s9IkJ0bl9SZW1vdmVUcmFja0lEKCcldHJhY2slJykiPkRFTEVURTwvYnV0dG9uPgoJCQkldGl0bGUlCgkJPC9kaXY+CgkJPGRpdiBpZD0icHJldmlld19pZnJhbWVfJXRyYWNrJSI+PC9kaXY+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3l0X25vdGZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIgoJPjwvZGl2Pgo8L3RlbXBsYXRlPg==";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2024/12/27, 21:38:55";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	