	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CiAgICB9CgkKCS5pZnJhbWVib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTE3MnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJbWF4LWhlaWdodDogCQkxNzJweDsKCQltYXgtd2lkdGg6IAkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMHB4OwoJCXRvcDogCQkJCTUxMnB4OwoJCWJvcmRlci1yYWRpdXM6IAkJMHB4OwogICAgICAgIG92ZXJmbG93LXg6IAkJaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IAkJaGlkZGVuOwoJCWJhY2tncm91bmQtY29sb3I6IAkjNEQ2RkIzOwoJCWRpc3BsYXk6IAkJCWZsZXg7CgkJanVzdGlmeS1jb250ZW50OiAJbGVmdDsKCX0KCQoJLnRpdGxlYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJdGV4dC1hbGlnbjogCQljZW50ZXI7CgkJaGVpZ2h0OiAJCQkzMnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNHB4OwoJCWJvcmRlci1yYWRpdXM6IAkJMHB4OwoJCWZvbnQtc2l6ZToJCQkxMnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgxLDEsMCwxKSAhSW1wb3J0YW50OwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKC41LC41LDEsMSk7CgkJdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICNGRkZGRkYsIDJweCAtMnB4IDAgI0ZGRkZGRiwgLTJweCAycHggMCAjRkZGRkZGLCAycHggMnB4IDAgI0ZGRkZGRjsKCX0KCQoJLmljb25ib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTQ4MHB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkxNnB4OwoJCXRvcDogCQkJCTMycHg7CgkJYm9yZGVyLXJhZGl1czogCQkwcHg7Cgl9CgkKCS5pY29uCgl7CgkJaGVpZ2h0OiAJCQkzMnB4OwoJCXdpZHRoOiAJCQkJMzJweDsKCQl2ZXJ0aWNhbC1hbGlnbjoJCW1pZGRsZTsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAljZW50ZXI7CgkJb3ZlcmZsb3c6CQkJaGlkZGVuOwoJCXBvc2l0aW9uOiAJCQlyZWxhdGl2ZTsKCQlvYmplY3QtZml0OiAJCWNvdmVyOwoJCW9iamVjdC1wb3NpdGlvbjogCTUwJSAwOwoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWJvcmRlci1yYWRpdXM6IAkJMHB4OwoJfQoJCgkub3ZlcmxheWJ0bgoJewoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQl0b3A6IAkJCQkzMnB4OwoJCWxlZnQ6IAkJCQkxNnB4OwoJCWhlaWdodDogCQkJNDgwcHg7CgkJd2lkdGg6IAkJCQk0ODBweDsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCQl6LWluZGV4OiAJCQkyOwoJCWN1cnNvcjogCQkJcG9pbnRlcjsKCQl0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjZzOwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwwKTsKCX0KCQoJLm92ZXJsYXlidG5fbGFiZWwKCXsKCQljb2xvcjogaW5oZXJpdDsKCQl0ZXh0LWFsaWduOgkJCWNlbnRlcjsKCQl2ZXJ0aWNhbC1hbGlnbjoJCW1pZGRsZTsKCQlmb250LXNpemU6CQkJMTI4cHg7CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMCwwLDAsMCk7CgkJdGV4dC1zaGFkb3c6IAkJaW5oZXJpdDsKCX0KCQoJLm92ZXJsYXlidG46aG92ZXIKCXsKCQljb2xvcjogCQkJCXJnYmEoMCwwLDEsMSk7CgkJdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICNGRkZGRkYsIDJweCAtMnB4IDAgI0ZGRkZGRiwgLTJweCAycHggMCAjRkZGRkZGLCAycHggMnB4IDAgI0ZGRkZGRjsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCW1pbi1oZWlnaHQ6IAkJMTY2cHg7CgkJbWluLXdpZHRoOiAJCQk1MTJweDsKCQltYXgtaGVpZ2h0OiAJCTE2NnB4OwoJCW1heC13aWR0aDogCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkzcHg7CgkJdG9wOiAJCQkJM3B4OwoJCWJvcmRlci1yYWRpdXM6IAkJM3B4OwogICAgICAgIG92ZXJmbG93LXg6IAkJaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IAkJaGlkZGVuOwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKC41LC41LDEsMSk7Cgl9Cgk=";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdj4KCQk8c2VsZWN0IGlkID0gInNlbF9wbGF5bGlzdCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCTwhLS08YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxvYWQgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4tLT4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9zYXZlIiBvbmNsaWNrPSJCdG5fU2F2ZVBsYXlsaXN0KCkiPlNhdmUgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4KCTwvZGl2PgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX25ldyIgb25jbGljaz0iQnRuX0FkZFBsYXlsaXN0KCkiPk5ldyBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2RlbCIgb25jbGljaz0iQnRuX0RlbFBsYXlsaXN0KCkiPkRlbGV0ZSBQbGF5bGlzdDwvYnV0dG9uPgoJPGRpdj4KCTxkaXY+CgkJPHNwYW4+UGxheWxpc3QgU2h1ZmZsZTogW1NlcXVlbmNlXTwvc3Bhbj4KCQk8aW5wdXQgdHlwZT0icmFuZ2UiIGlkPSJ0cmFja19yYW5kb21uZXNzIiBtaW49IjAiIG1heD0iNSIgdmFsdWU9IjEiPjwvaW5wdXQ+CgkJPHNwYW4+W1JhbmRvbV0gPC9zcGFuPgoJPC9kaXY+Cgk8L2Rpdj4KCTxkaXY+RW50ZXIgU291bmRjbG91ZC9Zb3V0dWJlIHRyYWNrIFVSTDo8L2Rpdj4KCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCI+PC9pbnB1dD4KCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2FkZF91cmwiIG9uY2xpY2s9IkJ0bl9BZGRUcmFja1VSTCgpIj5BZGQgdG8gUGxheWxpc3Q8L2J1dHRvbj4KCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjYwMHB4O21heC1oZWlnaHQ6ODAwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbiI+PC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19wbGF5ZXJfcGFnZSI+Cgk8ZGl2IGlkPSJ0aXRsZWJveCIgY2xhc3M9InRpdGxlYm94Ij4KCQk8c3BhbiBpZD0idGl0bGVzcGFuIj48L3NwYW4+Cgk8L2Rpdj4KCTxkaXYgY2xhc3M9Imljb25ib3giPgoJCTxpbWcgaWQ9Imljb24iIGNsYXNzPSJpY29uIiBzcmM9IiI+PC9pbWc+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJvdmVybGF5YnRuIiBpZD0iYnRuX3BsYXlfdHJhY2siIG9uY2xpY2s9IkJ0bl9QbGF5KCkiPgoJCQk8ZGl2IGlkPSJwbGF5X2xhYmVsIiBjbGFzcz0ib3ZlcmxheWJ0bl9sYWJlbCI+I0xCPC9kaXY+CgkJPC9idXR0b24+Cgk8L2Rpdj4KCTxkaXYgaWQ9ImNsaWVudF9wbGF5ZXJfYm94IiBjbGFzcz0iaWZyYW1lYm94Ij4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfcHJldmlldyI+Cgk8ZGl2IGlkPSJwcmV2aWV3X3Njcm9sbF8ldHJhY2slIiBzdHlsZT0ib3JkZXI6I09SRCI+CgkJPGRpdj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fcmVtb3ZlX3RyYWNrIiBvbmNsaWNrPSJCdG5fUmVtb3ZlVHJhY2tJRCgnJXRyYWNrJScpIj4jREVMPC9idXR0b24+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3VwX3RyYWNrIiBvbmNsaWNrPSJCdG5fTW92ZVVwVHJhY2tJRCgnJXRyYWNrJScpIj4jVVA8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fZG93bl90cmFjayIgb25jbGljaz0iQnRuX01vdmVEb3duVHJhY2tJRCgnJXRyYWNrJScpIj4jRFdOPC9idXR0b24+CgkJCSV0aXRsZSUKCQk8L2Rpdj4KCQk8ZGl2IGlkPSJwcmV2aWV3X2lmcmFtZV8ldHJhY2slIj48L2Rpdj4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfeXRfbm90ZnJhbWUiPgoJPGRpdiBpZD0iJWlkJSIgY2xhc3M9IndpZGdldCIgc3R5bGU9InBvc2l0aW9uOnJlbGF0aXZlOyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSIzNjAiCglzY3JvbGxpbmc9Im5vIiBmcmFtZWJvcmRlcj0ibm8iCgk+PC9kaXY+CjwvdGVtcGxhdGU+";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/03, 18:59:44";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	