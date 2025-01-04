	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CiAgICB9CgkKCS5pZnJhbWVib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTE3MnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJbWF4LWhlaWdodDogCQkxNzJweDsKCQltYXgtd2lkdGg6IAkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMHB4OwoJCXRvcDogCQkJCTUxMnB4OwoJCWJvcmRlci1yYWRpdXM6IAkJMHB4OwogICAgICAgIG92ZXJmbG93LXg6IAkJaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IAkJaGlkZGVuOwoJCWJhY2tncm91bmQtY29sb3I6IAkjNEQ2RkIzOwoJCWRpc3BsYXk6IAkJCWZsZXg7CgkJanVzdGlmeS1jb250ZW50OiAJbGVmdDsKCX0KCQoJLnd0eHQKCXsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTEycHg7CgkJY29sb3I6IAkJCQlyZ2JhKDI1NSwyNTUsMjU1LDEpOwoJCWZvbnQtZmFtaWx5OiAJCVRhaG9tYSwgc2Fucy1zZXJpZjsKCX0KCQoJLnRpdGxlYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJdGV4dC1hbGlnbjogCQljZW50ZXI7CgkJaGVpZ2h0OiAJCQkzMnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJMTJweDsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTEycHg7CgkJY29sb3I6IAkJCQlyZ2JhKDI1NSwyNTUsMjU1LDEpOwoJCWZvbnQtZmFtaWx5OiAJCVRhaG9tYSwgc2Fucy1zZXJpZjsKCX0KCQoJLmljb25ib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTQ4MHB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkxNnB4OwoJCXRvcDogCQkJCTMycHg7CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkuaWNvbgoJewoJCWhlaWdodDogCQkJMzJweDsKCQl3aWR0aDogCQkJCTMycHg7CgkJdmVydGljYWwtYWxpZ246CQltaWRkbGU7CgkJanVzdGlmeS1jb250ZW50OiAJY2VudGVyOwoJCW92ZXJmbG93OgkJCWhpZGRlbjsKCQlwb3NpdGlvbjogCQkJcmVsYXRpdmU7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkub3ZlcmxheWJ0bgoJewoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQl0b3A6IAkJCQkzMnB4OwoJCWxlZnQ6IAkJCQkxNnB4OwoJCWhlaWdodDogCQkJNDgwcHg7CgkJd2lkdGg6IAkJCQk0ODBweDsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCQl6LWluZGV4OiAJCQkyOwoJCWN1cnNvcjogCQkJcG9pbnRlcjsKCQl0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjZzOwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwwKTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQlib3JkZXI6CQkJCW5vbmU7Cgl9CgkKCS5vdmVybGF5YnRuX2xhYmVsCgl7CgkJY29sb3I6IGluaGVyaXQ7CgkJdGV4dC1hbGlnbjoJCQljZW50ZXI7CgkJdmVydGljYWwtYWxpZ246CQltaWRkbGU7CgkJZm9udC1zaXplOgkJCTEyOHB4OwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJCXRleHQtc2hhZG93OiAJCWluaGVyaXQ7Cgl9CgkKCS5vdmVybGF5YnRuOmhvdmVyCgl7CgkJY29sb3I6IAkJCQlyZ2JhKDMyLDMyLDMyLDEpOwoJCXRleHQtc2hhZG93OiAtMnB4IC0ycHggMCAjRkZGRkZGLCAycHggLTJweCAwICNGRkZGRkYsIC0ycHggMnB4IDAgI0ZGRkZGRiwgMnB4IDJweCAwICNGRkZGRkY7Cgl9CgkKCS5wcmV2aWV3dHJhY2sKCXsKCQl3aWR0aDogNDgwcHg7Cgl9CgkKCS53aWRnZXQKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTIwMHB4OwoJCXdpZHRoOiAJCQkJMTAwJTsKCQlwb3NpdGlvbjogCQkJYWJzb2x1dGU7CgkJbGVmdDogCQkJCTNweDsKCQl0b3A6IAkJCQkzcHg7CgkJYm9yZGVyLXJhZGl1czogCQkzcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMCwwLDAsMCk7Cgl9Cgk=";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdj4KCQk8c2VsZWN0IGlkPSJzZWxfcGxheWxpc3QiIGNsYXNzPSJzZXR1cCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCTwhLS08YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxvYWQgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4tLT4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9Ind0eHQiIGlkPSJidG5fc2F2ZSIgb25jbGljaz0iQnRuX1NhdmVQbGF5bGlzdCgpIj5TYXZlIFNlbGVjdGVkIFBsYXlsaXN0PC9idXR0b24+Cgk8L2Rpdj4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9Ind0eHQiIGlkPSJidG5fbmV3IiBvbmNsaWNrPSJCdG5fQWRkUGxheWxpc3QoKSI+TmV3IFBsYXlsaXN0PC9idXR0b24+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJ3dHh0IiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0id3R4dCIgaWQ9ImJ0bl9kZWwiIG9uY2xpY2s9IkJ0bl9EZWxQbGF5bGlzdCgpIj5EZWxldGUgUGxheWxpc3Q8L2J1dHRvbj4KCTxkaXY+Cgk8ZGl2PgoJCTxzcGFuPlBsYXlsaXN0IFNodWZmbGU6IFtTZXF1ZW5jZV08L3NwYW4+CgkJPGlucHV0IHR5cGU9InJhbmdlIiBpZD0idHJhY2tfcmFuZG9tbmVzcyIgbWluPSIwIiBtYXg9IjUiIHZhbHVlPSIxIj48L2lucHV0PgoJCTxzcGFuPltSYW5kb21dIDwvc3Bhbj4KCTwvZGl2PgoJPC9kaXY+Cgk8ZGl2PkVudGVyIFNvdW5kY2xvdWQvWW91dHViZSB0cmFjayBVUkw6PC9kaXY+Cgk8aW5wdXQgdHlwZT0idXJsIiBpZD0idGV4dF9pbnB1dF91cmwiPjwvaW5wdXQ+Cgk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9hZGRfdXJsIiBvbmNsaWNrPSJCdG5fQWRkVHJhY2tVUkwoKSI+QWRkIHRvIFBsYXlsaXN0PC9idXR0b24+Cgk8ZGl2IGlkPSJzY19wcmV2aWV3X3Njcm9sbCIgc3R5bGU9Im92ZXJmbG93LXk6c2Nyb2xsO3BhZGRpbmc6NXB4O21heC13aWR0aDo1MTJweDttYXgtaGVpZ2h0OjgwMHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW4iPjwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfcGxheWVyX3BhZ2UiPgoJPGRpdiBpZD0idGl0bGVib3giIGNsYXNzPSJ0aXRsZWJveCI+CgkJPHNwYW4gaWQ9InRpdGxlc3BhbiI+PC9zcGFuPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJpY29uYm94Ij4KCQk8aW1nIGlkPSJpY29uIiBjbGFzcz0iaWNvbiIgc3JjPSIiPjwvaW1nPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0ib3ZlcmxheWJ0biIgaWQ9ImJ0bl9wbGF5X3RyYWNrIiBvbmNsaWNrPSJCdG5fUGxheSgpIj4KCQkJPGRpdiBpZD0icGxheV9sYWJlbCIgY2xhc3M9Im92ZXJsYXlidG5fbGFiZWwiPiNMQjwvZGl2PgoJCTwvYnV0dG9uPgoJPC9kaXY+Cgk8ZGl2IGlkPSJjbGllbnRfcGxheWVyX2JveCIgY2xhc3M9ImlmcmFtZWJveCI+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3RyYWNrX3ByZXZpZXciPgoJPGRpdiBpZD0icHJldmlld19zY3JvbGxfJXRyYWNrJSIgY2xhc3M9InByZXZpZXd0cmFjayIgc3R5bGU9Im9yZGVyOiNPUkQiPgoJCTxkaXYgY2xhc3M9Ind0eHQiPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9yZW1vdmVfdHJhY2siIG9uY2xpY2s9IkJ0bl9SZW1vdmVUcmFja0lEKCcldHJhY2slJykiPiNERUw8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fdXBfdHJhY2siIG9uY2xpY2s9IkJ0bl9Nb3ZlVXBUcmFja0lEKCcldHJhY2slJykiPiNVUDwvYnV0dG9uPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9kb3duX3RyYWNrIiBvbmNsaWNrPSJCdG5fTW92ZURvd25UcmFja0lEKCcldHJhY2slJykiPiNEV048L2J1dHRvbj4KCQkJJXRpdGxlJQoJCTwvZGl2PgoJCTxkaXYgaWQ9InByZXZpZXdfaWZyYW1lXyV0cmFjayUiPjwvZGl2PgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF95dF9ub3RmcmFtZSI+Cgk8ZGl2IGlkPSIlaWQlIiBjbGFzcz0id2lkZ2V0IiBzdHlsZT0icG9zaXRpb246cmVsYXRpdmU7IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjM2MCIKCXNjcm9sbGluZz0ibm8iIGZyYW1lYm9yZGVyPSJubyIKCT48L2Rpdj4KPC90ZW1wbGF0ZT4=";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/03, 19:22:30";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	