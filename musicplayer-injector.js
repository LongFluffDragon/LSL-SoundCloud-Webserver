	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CgkJZm9udC1mYW1pbHk6IAkJVmVyZGFuYSwgc2Fucy1zZXJpZjsKICAgIH0KCQoJLmlmcmFtZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWhlaWdodDogCQkJMTcycHg7CgkJd2lkdGg6IAkJCQk1MTJweDsKCQltYXgtaGVpZ2h0OiAJCTE3MnB4OwoJCW1heC13aWR0aDogCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNTEycHg7CgkJYm9yZGVyLXJhZGl1czogCQkwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCSM0RDZGQjM7CgkJZGlzcGxheTogCQkJZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAlsZWZ0OwoJfQoJCgkuYnRudHh0Cgl7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkxNnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwxKTsKCQkKCQltYXJnaW46IAkJCTQgYXV0bzsKCX0KCQoJLnd0eHQKCXsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTEycHg7CgkJY29sb3I6IAkJCQlyZ2JhKDI1NSwyNTUsMjU1LDEpOwoJCQoJCW1hcmdpbjogCQkJNCBhdXRvOwoJCXRleHQtYWxpZ246IAkJY2VudGVyOwoJfQoJCgkuc2V0dXAKCXsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgxODAsMTgwLDE4MCwxKTsKCQlib3JkZXI6CQkJCW5vbmU7CgkJbWFyZ2luOiAJCQkwIGF1dG87Cgl9CgkKCS50aXRsZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCXRleHQtYWxpZ246IAkJY2VudGVyOwoJCWhlaWdodDogCQkJMzJweDsKCQl3aWR0aDogCQkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMHB4OwoJCXRvcDogCQkJCTEycHg7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkxMnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgyNTUsMjU1LDI1NSwxKTsKCQlmb250LWZhbWlseTogCQlUYWhvbWEsIHNhbnMtc2VyaWY7Cgl9CgkKCS5pY29uYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJaGVpZ2h0OiAJCQk0ODBweDsKCQl3aWR0aDogCQkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMTZweDsKCQl0b3A6IAkJCQkzMnB4OwoJCWJvcmRlcjoJCQkJbm9uZTsKCX0KCQoJLmljb24KCXsKCQloZWlnaHQ6IAkJCTMycHg7CgkJd2lkdGg6IAkJCQkzMnB4OwoJCXZlcnRpY2FsLWFsaWduOgkJbWlkZGxlOwoJCW9iamVjdC1maXQ6IAkJY292ZXI7CgkJanVzdGlmeS1jb250ZW50OiAJY2VudGVyOwoJCW92ZXJmbG93OgkJCWhpZGRlbjsKCQlwb3NpdGlvbjogCQkJcmVsYXRpdmU7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkub3ZlcmxheWJ0bgoJewoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQl0b3A6IAkJCQkzMnB4OwoJCWxlZnQ6IAkJCQkxNnB4OwoJCWhlaWdodDogCQkJNDgwcHg7CgkJd2lkdGg6IAkJCQk0ODBweDsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCQl6LWluZGV4OiAJCQkyOwoJCWN1cnNvcjogCQkJcG9pbnRlcjsKCQl0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjZzOwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwwKTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQlib3JkZXI6CQkJCW5vbmU7Cgl9CgkKCS5vdmVybGF5YnRuX2xhYmVsCgl7CgkJY29sb3I6IGluaGVyaXQ7CgkJdGV4dC1hbGlnbjoJCQljZW50ZXI7CgkJdmVydGljYWwtYWxpZ246CQltaWRkbGU7CgkJZm9udC1zaXplOgkJCTEyOHB4OwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJCXRleHQtc2hhZG93OiAJCWluaGVyaXQ7Cgl9CgkKCS5vdmVybGF5YnRuOmhvdmVyCgl7CgkJY29sb3I6IAkJCQlyZ2JhKDMyLDMyLDMyLDEpOwoJCXRleHQtc2hhZG93OiAtMnB4IC0ycHggMCAjRkZGRkZGLCAycHggLTJweCAwICNGRkZGRkYsIC0ycHggMnB4IDAgI0ZGRkZGRiwgMnB4IDJweCAwICNGRkZGRkY7Cgl9CgkKCS5wcmV2aWV3dHJhY2sKCXsKCQl3aWR0aDogNDgwcHg7Cgl9CgkKCS53aWRnZXQKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQlib3JkZXI6IAkJCW5vbmU7CgkJaGVpZ2h0OiAJCQkyMDBweDsKCQl3aWR0aDogCQkJCTEwMCU7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCXRvcDogCQkJCTNweDsKCQlib3R0b206IAkJCTZweDsKICAgICAgICBvdmVyZmxvdy14OiAJCWhpZGRlbjsKICAgICAgICBvdmVyZmxvdy15OiAJCWhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCX0KCQ==";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdiBjbGFzcz0ic2V0dXAiPgoJCTxzZWxlY3QgaWQ9InNlbF9wbGF5bGlzdCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCTwhLS08YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxvYWQgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4tLT4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9zYXZlIiBvbmNsaWNrPSJCdG5fU2F2ZVBsYXlsaXN0KCkiPlNhdmUgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0ic2V0dXAiPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX25ldyIgb25jbGljaz0iQnRuX0FkZFBsYXlsaXN0KCkiPk5ldyBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX2RlbCIgb25jbGljaz0iQnRuX0RlbFBsYXlsaXN0KCkiPkRlbGV0ZSBQbGF5bGlzdDwvYnV0dG9uPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJPHNwYW4+UGxheWxpc3QgU2h1ZmZsZTogW1NlcXVlbmNlXTwvc3Bhbj4KCQk8aW5wdXQgdHlwZT0icmFuZ2UiIGlkPSJ0cmFja19yYW5kb21uZXNzIiBtaW49IjAiIG1heD0iNSIgdmFsdWU9IjEiPjwvaW5wdXQ+CgkJPHNwYW4+W1JhbmRvbV0gPC9zcGFuPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJzZXR1cCI+RW50ZXIgU291bmRjbG91ZC9Zb3V0dWJlIHRyYWNrIFVSTDo8L2Rpdj4KCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCI+PC9pbnB1dD4KCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2FkZF91cmwiIG9uY2xpY2s9IkJ0bl9BZGRUcmFja1VSTCgpIj5BZGQgdG8gUGxheWxpc3Q8L2J1dHRvbj4KCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjUxMnB4O21heC1oZWlnaHQ6ODAwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbiI+PC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19wbGF5ZXJfcGFnZSI+Cgk8ZGl2IGlkPSJ0aXRsZWJveCIgY2xhc3M9InRpdGxlYm94Ij4KCQk8c3BhbiBpZD0idGl0bGVzcGFuIj48L3NwYW4+Cgk8L2Rpdj4KCTxkaXYgY2xhc3M9Imljb25ib3giPgoJCTxpbWcgaWQ9Imljb24iIGNsYXNzPSJpY29uIiBzcmM9IiI+PC9pbWc+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJvdmVybGF5YnRuIiBpZD0iYnRuX3BsYXlfdHJhY2siIG9uY2xpY2s9IkJ0bl9QbGF5KCkiPgoJCQk8ZGl2IGlkPSJwbGF5X2xhYmVsIiBjbGFzcz0ib3ZlcmxheWJ0bl9sYWJlbCI+I0xCPC9kaXY+CgkJPC9idXR0b24+Cgk8L2Rpdj4KCTxkaXYgaWQ9ImNsaWVudF9wbGF5ZXJfYm94IiBjbGFzcz0iaWZyYW1lYm94Ij4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfcHJldmlldyI+Cgk8ZGl2IGlkPSJwcmV2aWV3X3Njcm9sbF8ldHJhY2slIiBjbGFzcz0icHJldmlld3RyYWNrIiBzdHlsZT0ib3JkZXI6I09SRCI+CgkJPGRpdj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fcmVtb3ZlX3RyYWNrIiBvbmNsaWNrPSJCdG5fUmVtb3ZlVHJhY2tJRCgnJXRyYWNrJScpIj4jREVMPC9idXR0b24+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3VwX3RyYWNrIiBvbmNsaWNrPSJCdG5fTW92ZVVwVHJhY2tJRCgnJXRyYWNrJScpIj4jVVA8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fZG93bl90cmFjayIgb25jbGljaz0iQnRuX01vdmVEb3duVHJhY2tJRCgnJXRyYWNrJScpIj4jRFdOPC9idXR0b24+CgkJCTxzcGFuIGNsYXNzPSJ3dHh0Ij4ldGl0bGUlPC9zcGFuPgoJCTwvZGl2PgoJCTxkaXYgaWQ9InByZXZpZXdfaWZyYW1lXyV0cmFjayUiPjwvZGl2PgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF95dF9ub3RmcmFtZSI+Cgk8ZGl2IGlkPSIlaWQlIiBjbGFzcz0id2lkZ2V0IiBzdHlsZT0icG9zaXRpb246cmVsYXRpdmU7IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjM2MCIKCXNjcm9sbGluZz0ibm8iIGZyYW1lYm9yZGVyPSJubyIKCT48L2Rpdj4KPC90ZW1wbGF0ZT4=";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/03, 20:09:30";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	