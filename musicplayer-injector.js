	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CgkJZm9udC1mYW1pbHk6IAkJVmVyZGFuYSwgc2Fucy1zZXJpZjsKICAgIH0KCQoJLmlmcmFtZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWhlaWdodDogCQkJMTcycHg7CgkJd2lkdGg6IAkJCQk1MTJweDsKCQltYXgtaGVpZ2h0OiAJCTE3MnB4OwoJCW1heC13aWR0aDogCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNTEycHg7CgkJYm9yZGVyLXJhZGl1czogCQkwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCSM0RDZGQjM7CgkJZGlzcGxheTogCQkJZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAlsZWZ0OwoJCXZpc2liaWxpdHk6IAkJY29sbGFwc2U7Cgl9CgkKCS5idG50eHQKCXsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTE2cHg7CgkJY29sb3I6IAkJCQlyZ2JhKDAsMCwwLDEpOwoJCW1hcmdpbjogCQkJNHB4IDBweCA0cHggNHB4OwoJfQoJCgkud3R4dAoJewoJCWJvcmRlcjoJCQkJbm9uZTsKCQlmb250LXNpemU6CQkJMTJweDsKCQljb2xvcjogCQkJCXJnYmEoMjU1LDI1NSwyNTUsMSk7CgkJCgkJbWFyZ2luOiAJCQk0IGF1dG87CgkJdGV4dC1hbGlnbjogCQljZW50ZXI7Cgl9CgkKCS5zZXR1cAoJewoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDE4MCwxODAsMTgwLDEpOwoJCWJvcmRlcjoJCQkJbm9uZTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCX0KCQoJLnRpdGxlYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJdGV4dC1hbGlnbjogCQljZW50ZXI7CgkJaGVpZ2h0OiAJCQkzMnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJMTJweDsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTEycHg7CgkJY29sb3I6IAkJCQlyZ2JhKDI1NSwyNTUsMjU1LDEpOwoJCWZvbnQtZmFtaWx5OiAJCVRhaG9tYSwgc2Fucy1zZXJpZjsKCX0KCQoJLmljb25ib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTQ4MHB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkxNnB4OwoJCXRvcDogCQkJCTMycHg7CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkuaWNvbgoJewoJCWhlaWdodDogCQkJMzJweDsKCQl3aWR0aDogCQkJCTMycHg7CgkJdmVydGljYWwtYWxpZ246CQltaWRkbGU7CgkJb2JqZWN0LWZpdDogCQljb3ZlcjsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAljZW50ZXI7CgkJb3ZlcmZsb3c6CQkJaGlkZGVuOwoJCXBvc2l0aW9uOiAJCQlyZWxhdGl2ZTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQlib3JkZXI6CQkJCW5vbmU7Cgl9CgkKCS5vdmVybGF5YnRuCgl7CgkJcG9zaXRpb246IAkJCWZpeGVkOwoJCXRvcDogCQkJCTMycHg7CgkJbGVmdDogCQkJCTE2cHg7CgkJaGVpZ2h0OiAJCQk0ODBweDsKCQl3aWR0aDogCQkJCTQ4MHB4OwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJCXotaW5kZXg6IAkJCTI7CgkJY3Vyc29yOiAJCQlwb2ludGVyOwoJCXRyYW5zaXRpb24tZHVyYXRpb246IDAuNnM7CgkJY29sb3I6IAkJCQlyZ2JhKDAsMCwwLDApOwoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWJvcmRlcjoJCQkJbm9uZTsKCX0KCQoJLm92ZXJsYXlidG5fbGFiZWwKCXsKCQljb2xvcjogaW5oZXJpdDsKCQl0ZXh0LWFsaWduOgkJCWNlbnRlcjsKCQl2ZXJ0aWNhbC1hbGlnbjoJCW1pZGRsZTsKCQlmb250LXNpemU6CQkJMjU2cHg7CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMCwwLDAsMCk7CgkJdGV4dC1zaGFkb3c6IAkJaW5oZXJpdDsKCX0KCQoJLm92ZXJsYXlidG46aG92ZXIKCXsKCQljb2xvcjogCQkJCXJnYmEoMzIsMzIsMzIsMSk7CgkJdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICNGRkZGRkYsIDJweCAtMnB4IDAgI0ZGRkZGRiwgLTJweCAycHggMCAjRkZGRkZGLCAycHggMnB4IDAgI0ZGRkZGRjsKCX0KCQoJLnByZXZpZXd0cmFjawoJewoJCXdpZHRoOiA0ODBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogCQkJMXB4IDBweCA4cHggMHB4OwoJCWJvcmRlcjogCQkJbm9uZTsKCQloZWlnaHQ6IAkJCTIwMHB4OwoJCXdpZHRoOiAJCQkJMTAwJTsKCQlwb3NpdGlvbjogCQkJYWJzb2x1dGU7CgkJdG9wOiAJCQkJM3B4OwogICAgICAgIG92ZXJmbG93LXg6IAkJaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IAkJaGlkZGVuOwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJfQoJ";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdiBjbGFzcz0ic2V0dXAiPgoJCTxzZWxlY3QgaWQ9InNlbF9wbGF5bGlzdCIgY2xhc3M9ImJ0bnR4dCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCTwhLS08YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9sb2FkIiBvbmNsaWNrPSJCdG5fTG9hZFBsYXlsaXN0KCkiPkxvYWQgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4tLT4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9zYXZlIiBvbmNsaWNrPSJCdG5fU2F2ZVBsYXlsaXN0KCkiPlNhdmUgU2VsZWN0ZWQgUGxheWxpc3Q8L2J1dHRvbj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0ic2V0dXAiPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX25ldyIgb25jbGljaz0iQnRuX0FkZFBsYXlsaXN0KCkiPk5ldyBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX2RlbCIgb25jbGljaz0iQnRuX0RlbFBsYXlsaXN0KCkiPkRlbGV0ZSBQbGF5bGlzdDwvYnV0dG9uPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJPHNwYW4+UGxheWxpc3QgU2h1ZmZsZTogW1NlcXVlbmNlXTwvc3Bhbj4KCQk8aW5wdXQgdHlwZT0icmFuZ2UiIGlkPSJ0cmFja19yYW5kb21uZXNzIiBtaW49IjAiIG1heD0iNSIgdmFsdWU9IjEiPjwvaW5wdXQ+CgkJPHNwYW4+W1JhbmRvbV0gPC9zcGFuPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJzZXR1cCI+RW50ZXIgU291bmRjbG91ZC9Zb3V0dWJlIHRyYWNrIFVSTDo8L2Rpdj4KCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCIgc3R5bGU9IndpZHRoOjM2MHB4Ij48L2lucHV0PgoJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fYWRkX3VybCIgb25jbGljaz0iQnRuX0FkZFRyYWNrVVJMKCkiPkFkZCB0byBQbGF5bGlzdDwvYnV0dG9uPgoJPGRpdiBpZD0ic2NfcHJldmlld19zY3JvbGwiIHN0eWxlPSJvdmVyZmxvdy15OnNjcm9sbDtwYWRkaW5nOjVweDttYXgtd2lkdGg6NTEycHg7bWF4LWhlaWdodDo4MDBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uIj48L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3BsYXllcl9wYWdlIj4KCTxkaXYgaWQ9InRpdGxlYm94IiBjbGFzcz0idGl0bGVib3giPgoJCTxzcGFuIGlkPSJ0aXRsZXNwYW4iPjwvc3Bhbj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0iaWNvbmJveCI+CgkJPGltZyBpZD0iaWNvbiIgY2xhc3M9Imljb24iIHNyYz0iIj48L2ltZz4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9Im92ZXJsYXlidG4iIGlkPSJidG5fcGxheV90cmFjayIgb25jbGljaz0iQnRuX1BsYXkoKSI+CgkJCTxkaXYgaWQ9InBsYXlfbGFiZWwiIGNsYXNzPSJvdmVybGF5YnRuX2xhYmVsIj4jTEI8L2Rpdj4KCQk8L2J1dHRvbj4KCTwvZGl2PgoJPGRpdiBpZD0iY2xpZW50X3BsYXllcl9ib3giIGNsYXNzPSJpZnJhbWVib3giPgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY190cmFja19wcmV2aWV3Ij4KCTxkaXYgaWQ9InByZXZpZXdfc2Nyb2xsXyV0cmFjayUiIGNsYXNzPSJwcmV2aWV3dHJhY2siIHN0eWxlPSJvcmRlcjojT1JEIj4KCQk8ZGl2PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9yZW1vdmVfdHJhY2siIG9uY2xpY2s9IkJ0bl9SZW1vdmVUcmFja0lEKCcldHJhY2slJykiPiNERUw8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fdXBfdHJhY2siIG9uY2xpY2s9IkJ0bl9Nb3ZlVXBUcmFja0lEKCcldHJhY2slJykiPiNVUDwvYnV0dG9uPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9kb3duX3RyYWNrIiBvbmNsaWNrPSJCdG5fTW92ZURvd25UcmFja0lEKCcldHJhY2slJykiPiNEV048L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fcmVuX3RyYWNrIiBvbmNsaWNrPSJCdG5fUmVuYW1lVHJhY2tJRCgnJXRyYWNrJScpIj5DaGFuZ2UgVGl0bGU8L2J1dHRvbj4KCQkJPHNwYW4gY2xhc3M9Ind0eHQiPiV0aXRsZSU8L3NwYW4+CgkJPC9kaXY+CgkJPGRpdiBpZD0icHJldmlld19pZnJhbWVfJXRyYWNrJSI+PC9kaXY+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3l0X25vdGZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIgoJPjwvZGl2Pgo8L3RlbXBsYXRlPg==";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/03, 22:20:38";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	