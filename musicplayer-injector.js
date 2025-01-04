	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCXdoaXRlOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CiAgICB9CgkKCS5pZnJhbWVib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTE3MnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJbWF4LWhlaWdodDogCQkxNzJweDsKCQltYXgtd2lkdGg6IAkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMHB4OwoJCXRvcDogCQkJCTUxMnB4OwoJCWJvcmRlci1yYWRpdXM6IAkJMHB4OwogICAgICAgIG92ZXJmbG93LXg6IAkJaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IAkJaGlkZGVuOwoJCWJhY2tncm91bmQtY29sb3I6IAkjNEQ2RkIzOwoJCWRpc3BsYXk6IAkJCWZsZXg7CgkJanVzdGlmeS1jb250ZW50OiAJbGVmdDsKCX0KCQoJLnRpdGxlYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJdGV4dC1hbGlnbjogCQljZW50ZXI7CgkJaGVpZ2h0OiAJCQkzMnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJOHB4OwoJCWJvcmRlci1yYWRpdXM6IAkJMHB4OwoJCWZvbnQtc2l6ZToJCQkyNHB4OwoJfQoJCgkuaWNvbmJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWhlaWdodDogCQkJNDgwcHg7CgkJd2lkdGg6IAkJCQk1MTJweDsKCQlwb3NpdGlvbjogCQkJYWJzb2x1dGU7CgkJbGVmdDogCQkJCTE2cHg7CgkJdG9wOiAJCQkJMzJweDsKCQlib3JkZXItcmFkaXVzOiAJCTBweDsKCX0KCQoJLmljb24KCXsKCQloZWlnaHQ6IAkJCTMycHg7CgkJd2lkdGg6IAkJCQkzMnB4OwoJCQoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJMHB4OwoJCWJvcmRlci1yYWRpdXM6IAkJMHB4OwoJfQoJCgkub3ZlcmxheWJ0bgoJewoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQl0b3A6IAkJCQkzMnB4OwoJCWxlZnQ6IAkJCQkxNnB4OwoJCWhlaWdodDogCQkJNDgwcHg7CgkJd2lkdGg6IAkJCQk0ODBweDsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwLjIpOwoJCXotaW5kZXg6IAkJCTI7CgkJY3Vyc29yOiAJCQlwb2ludGVyOwoJfQoJCgkud2lkZ2V0Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJbWluLWhlaWdodDogCQkxNjZweDsKCQltaW4td2lkdGg6IAkJCTUxMnB4OwoJCW1heC1oZWlnaHQ6IAkJMTY2cHg7CgkJbWF4LXdpZHRoOiAJCQk1MTJweDsKCQlwb3NpdGlvbjogCQkJYWJzb2x1dGU7CgkJbGVmdDogCQkJCTNweDsKCQl0b3A6IAkJCQkzcHg7CgkJYm9yZGVyLXJhZGl1czogCQkzcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCSM0RDZGQjM7Cgl9Cgk=";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdj4KCQk8c2VsZWN0IGlkID0gInNlbF9wbGF5bGlzdCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCTwhLS08YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxvYWQgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4tLT4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9zYXZlIiBvbmNsaWNrPSJCdG5fU2F2ZVBsYXlsaXN0KCkiPlNhdmUgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4KCTwvZGl2PgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX25ldyIgb25jbGljaz0iQnRuX0FkZFBsYXlsaXN0KCkiPk5ldyBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2RlbCIgb25jbGljaz0iQnRuX0RlbFBsYXlsaXN0KCkiPkRlbGV0ZSBQbGF5bGlzdDwvYnV0dG9uPgoJPGRpdj4KCTxkaXY+CgkJPHNwYW4+UGxheWxpc3QgU2h1ZmZsZTogW1NlcXVlbmNlXTwvc3Bhbj4KCQk8aW5wdXQgdHlwZT0icmFuZ2UiIGlkPSJ0cmFja19yYW5kb21uZXNzIiBtaW49IjAiIG1heD0iNSIgdmFsdWU9IjEiPjwvaW5wdXQ+CgkJPHNwYW4+W1JhbmRvbV0gPC9zcGFuPgoJPC9kaXY+Cgk8L2Rpdj4KCTxkaXY+RW50ZXIgU291bmRjbG91ZC9Zb3V0dWJlIHRyYWNrIFVSTDo8L2Rpdj4KCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCI+PC9pbnB1dD4KCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2FkZF91cmwiIG9uY2xpY2s9IkJ0bl9BZGRUcmFja1VSTCgpIj5BZGQgdG8gUGxheWxpc3Q8L2J1dHRvbj4KCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjYwMHB4O21heC1oZWlnaHQ6ODAwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbiI+PC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19wbGF5ZXJfcGFnZSI+Cgk8ZGl2IGlkPSJ0aXRsZWJveCIgY2xhc3M9InRpdGxlYm94Ij4KCQk8c3BhbiBpZD0idGl0bGVzcGFuIj48L3NwYW4+Cgk8L2Rpdj4KCTxkaXYgY2xhc3M9Imljb25ib3giPgoJCTxpbWcgaWQ9Imljb24iIGNsYXNzPSJpY29uIiBzcmM9IiI+PC9pbWc+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJvdmVybGF5YnRuIiBpZD0iYnRuX3BsYXlfdHJhY2siIG9uY2xpY2s9IkJ0bl9QbGF5KCkiPjwvYnV0dG9uPgoJPC9kaXY+Cgk8ZGl2IGlkPSJjbGllbnRfcGxheWVyX2JveCIgY2xhc3M9ImlmcmFtZWJveCI+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3RyYWNrX3ByZXZpZXciPgoJPGRpdiBpZD0icHJldmlld19zY3JvbGxfJXRyYWNrJSIgc3R5bGU9Im9yZGVyOiNPUkQiPgoJCTxkaXY+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3JlbW92ZV90cmFjayIgb25jbGljaz0iQnRuX1JlbW92ZVRyYWNrSUQoJyV0cmFjayUnKSI+I0RFTDwvYnV0dG9uPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl91cF90cmFjayIgb25jbGljaz0iQnRuX01vdmVVcFRyYWNrSUQoJyV0cmFjayUnKSI+I1VQPC9idXR0b24+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2Rvd25fdHJhY2siIG9uY2xpY2s9IkJ0bl9Nb3ZlRG93blRyYWNrSUQoJyV0cmFjayUnKSI+I0RXTjwvYnV0dG9uPgoJCQkldGl0bGUlCgkJPC9kaXY+CgkJPGRpdiBpZD0icHJldmlld19pZnJhbWVfJXRyYWNrJSI+PC9kaXY+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3l0X25vdGZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIgoJPjwvZGl2Pgo8L3RlbXBsYXRlPg==";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/03, 17:32:25";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	