	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoJCgkuaWZyYW1lYm94Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiAxNzJweDsKCQl3aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTcycHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQk1MTJweDsKCQlib3JkZXItcmFkaXVzOiAwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBsZWZ0OwoJfQoJCgkuaWNvbgoJewoJCWhlaWdodDogMzJweDsKCQl3aWR0aDogMzJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQkwcHg7CgkJYm9yZGVyLXJhZGl1czogMHB4OwoJfQoJCgkud2lkZ2V0Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJbWluLWhlaWdodDogMTY2cHg7CgkJbWluLXdpZHRoOiA1MTJweDsKCQltYXgtaGVpZ2h0OiAxNjZweDsKCQltYXgtd2lkdGg6IDUxMnB4OwoJCXBvc2l0aW9uOiAJCWFic29sdXRlOwoJCWxlZnQ6IAkJCTNweDsKCQl0b3A6IAkJCTNweDsKCQlib3JkZXItcmFkaXVzOiAzcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOz0KCX0KCQoJLmxvZ2luCgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiA1MTJweDsKCQl3aWR0aDogMTAyNHB4OwoJCW1hcmdpbi10b3A6IDEyOHB4OwoJCWNvbG9yOiB3aGl0ZTsKCQlib3JkZXItcmFkaXVzOiAxNnB4OwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cgl9";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdj4KCQk8c2VsZWN0IGlkID0gInNlbF9wbGF5bGlzdCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCTwhLS08YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxvYWQgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4tLT4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9zYXZlIiBvbmNsaWNrPSJCdG5fU2F2ZVBsYXlsaXN0KCkiPlNhdmUgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4KCTwvZGl2PgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX25ldyIgb25jbGljaz0iQnRuX0FkZFBsYXlsaXN0KCkiPk5ldyBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2RlbCIgb25jbGljaz0iQnRuX0RlbFBsYXlsaXN0KCkiPkRlbGV0ZSBQbGF5bGlzdDwvYnV0dG9uPgoJPGRpdj4KCTxkaXY+CgkJPHNwYW4+UGxheWxpc3QgU2h1ZmZsZTogW1NlcXVlbmNlXTwvc3Bhbj4KCQk8aW5wdXQgdHlwZT0icmFuZ2UiIGlkPSJ0cmFja19yYW5kb21uZXNzIiBtaW49IjAiIG1heD0iNSIgdmFsdWU9IjEiPjwvaW5wdXQ+CgkJPHNwYW4+W1JhbmRvbV0gPC9zcGFuPgoJPC9kaXY+Cgk8L2Rpdj4KCTxkaXY+RW50ZXIgU291bmRjbG91ZC9Zb3V0dWJlIHRyYWNrIFVSTDo8L2Rpdj4KCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCI+PC9pbnB1dD4KCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2FkZF91cmwiIG9uY2xpY2s9IkJ0bl9BZGRUcmFja1VSTCgpIj5BZGQgdG8gUGxheWxpc3Q8L2J1dHRvbj4KCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjYwMHB4O21heC1oZWlnaHQ6ODAwcHg7ZGlzcGxheTpmbGV4Ij48L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3BsYXllcl9wYWdlIj4KCTxkaXYgaWQ9InRpdGxlYm94IiBjbGFzcz0idGl0bGVib3giPgoJCTxzcGFuIGlkPSJ0aXRsZXNwYW4iPjwvc3Bhbj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0iaWNvbmJveCI+CgkJPGltZyBpZD0iaWNvbiIgY2xhc3M9Imljb24iIHNyYz0iIj48L2ltZz4KCTwvZGl2PgoJPGRpdiBpZD0iY2xpZW50X3BsYXllcl9ib3giIGNsYXNzPSJpZnJhbWVib3giPgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY190cmFja19wcmV2aWV3Ij4KCTxkaXYgaWQ9InByZXZpZXdfc2Nyb2xsXyV0cmFjayUiPgoJCTxkaXY+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3JlbW92ZV90cmFjayIgb25jbGljaz0iQnRuX1JlbW92ZVRyYWNrSUQoJyV0cmFjayUnKSI+I0RFTDwvYnV0dG9uPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl91cF90cmFjayIgb25jbGljaz0iQnRuX01vdmVVcFRyYWNrSUQoJyV0cmFjayUnKSI+I1VQPC9idXR0b24+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2Rvd25fdHJhY2siIG9uY2xpY2s9IkJ0bl9Nb3ZlRG93blRyYWNrSUQoJyV0cmFjayUnKSI+I0RXTjwvYnV0dG9uPgoJCQkldGl0bGUlCgkJPC9kaXY+CgkJPGRpdiBpZD0icHJldmlld19pZnJhbWVfJXRyYWNrJSI+PC9kaXY+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3l0X25vdGZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIgoJPjwvZGl2Pgo8L3RlbXBsYXRlPg==";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/02, 19:20:06";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	