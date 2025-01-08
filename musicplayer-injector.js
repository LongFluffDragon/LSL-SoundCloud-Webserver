	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CgkJZm9udC1mYW1pbHk6IAkJVmVyZGFuYSwgc2Fucy1zZXJpZjsKICAgIH0KCQoJLmlmcmFtZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWhlaWdodDogCQkJMTcycHg7CgkJd2lkdGg6IAkJCQk1MTJweDsKCQltYXgtaGVpZ2h0OiAJCTE3MnB4OwoJCW1heC13aWR0aDogCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNTEycHg7CgkJYm9yZGVyLXJhZGl1czogCQkwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCSM0RDZGQjM7CgkJZGlzcGxheTogCQkJZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAlsZWZ0OwoJCXZpc2liaWxpdHk6IAkJY29sbGFwc2U7Cgl9CgkKCS5idG50eHQKCXsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTE2cHg7CgkJY29sb3I6IAkJCQlyZ2JhKDAsMCwwLDEpOwoJCW1hcmdpbjogCQkJNHB4IDBweCA0cHggNHB4OwoJfQoJCgkud3R4dAoJewoJCWJvcmRlcjoJCQkJbm9uZTsKCQlmb250LXNpemU6CQkJMTJweDsKCQljb2xvcjogCQkJCXJnYmEoMjU1LDI1NSwyNTUsMSk7CgkJCgkJbWFyZ2luOiAJCQk0IGF1dG87CgkJdGV4dC1hbGlnbjogCQljZW50ZXI7Cgl9CgkKCS5zZXR1cAoJewoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDE4MCwxODAsMTgwLDEpOwoJCWJvcmRlcjoJCQkJbm9uZTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCX0KCQoJLnRpdGxlYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJdGV4dC1hbGlnbjogCQljZW50ZXI7CgkJaGVpZ2h0OiAJCQkzMnB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJMTJweDsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTEycHg7CgkJY29sb3I6IAkJCQlyZ2JhKDI1NSwyNTUsMjU1LDEpOwoJCWZvbnQtZmFtaWx5OiAJCVRhaG9tYSwgc2Fucy1zZXJpZjsKCX0KCQoJLmljb25ib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQloZWlnaHQ6IAkJCTQ4MHB4OwoJCXdpZHRoOiAJCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkxNnB4OwoJCXRvcDogCQkJCTMycHg7CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkuaWNvbgoJewoJCWhlaWdodDogCQkJMzJweDsKCQl3aWR0aDogCQkJCTMycHg7CgkJdmVydGljYWwtYWxpZ246CQltaWRkbGU7CgkJb2JqZWN0LWZpdDogCQljb3ZlcjsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAljZW50ZXI7CgkJb3ZlcmZsb3c6CQkJaGlkZGVuOwoJCXBvc2l0aW9uOiAJCQlyZWxhdGl2ZTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQlib3JkZXI6CQkJCW5vbmU7Cgl9CgkKCS5vdmVybGF5YnRuCgl7CgkJcG9zaXRpb246IAkJCWZpeGVkOwoJCXRvcDogCQkJCTMycHg7CgkJbGVmdDogCQkJCTE2cHg7CgkJaGVpZ2h0OiAJCQk0ODBweDsKCQl3aWR0aDogCQkJCTQ4MHB4OwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJCXotaW5kZXg6IAkJCTI7CgkJY3Vyc29yOiAJCQlwb2ludGVyOwoJCXRyYW5zaXRpb24tZHVyYXRpb246IDAuNnM7CgkJY29sb3I6IAkJCQlyZ2JhKDAsMCwwLDApOwoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWJvcmRlcjoJCQkJbm9uZTsKCX0KCQoJLm92ZXJsYXlidG5fbGFiZWwKCXsKCQljb2xvcjogaW5oZXJpdDsKCQl0ZXh0LWFsaWduOgkJCWNlbnRlcjsKCQlmb250LXNpemU6CQkJMTkycHg7CgkJcG9zaXRpb246IAkJCWZpeGVkOwoJCWhlaWdodDogCQkJMzYwcHg7CgkJd2lkdGg6IAkJCQkzNjBweDsKCQl0b3A6IAkJCQkxMzBweDsKCQlsZWZ0OiAJCQkJNzZweDsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCQl0ZXh0LXNoYWRvdzogCQlpbmhlcml0OwoJfQoJCgkub3ZlcmxheWJ0bjpob3ZlcgoJewoJCWNvbG9yOiAJCQkJcmdiYSgzMiwzMiwzMiwxKTsKCQl0ZXh0LXNoYWRvdzogLTJweCAtMnB4IDAgI0ZGRkZGRiwgMnB4IC0ycHggMCAjRkZGRkZGLCAtMnB4IDJweCAwICNGRkZGRkYsIDJweCAycHggMCAjRkZGRkZGOwoJfQoJCgkucHJldmlld3RyYWNrCgl7CgkJd2lkdGg6IDQ4MHB4OwoJfQoJCgkud2lkZ2V0Cgl7CgkJbWFyZ2luOiAJCQkxcHggMHB4IDhweCAwcHg7CgkJYm9yZGVyOiAJCQlub25lOwoJCWhlaWdodDogCQkJMjAwcHg7CgkJd2lkdGg6IAkJCQkxMDAlOwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQl0b3A6IAkJCQkzcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMCwwLDAsMCk7Cgl9Cgk=";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdiBzdHlsZT0iZGlzcGxheTogZmxleCI+CgkJPGRpdiBzdHlsZT0iZmxvYXQ6IGxlZnQ7IHdpZHRoOiA1MTJweCI+CgkJCTxkaXYgY2xhc3M9InNldHVwIj4KCQkJCTxzZWxlY3QgaWQ9InNlbF9wbGF5bGlzdCIgY2xhc3M9ImJ0bnR4dCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fc2F2ZSIgb25jbGljaz0iQnRuX1NhdmVQbGF5bGlzdCgpIj5TYXZlIFNlbGVjdGVkIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9uZXciIG9uY2xpY2s9IkJ0bl9BZGRQbGF5bGlzdCgpIj5OZXcgUGxheWxpc3Q8L2J1dHRvbj4KCQkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fZGVsIiBvbmNsaWNrPSJCdG5fRGVsUGxheWxpc3QoKSI+RGVsZXRlIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8c3Bhbj5QbGF5bGlzdCBTaHVmZmxlOiBbU2VxdWVuY2VdPC9zcGFuPgoJCQkJPGlucHV0IHR5cGU9InJhbmdlIiBpZD0idHJhY2tfcmFuZG9tbmVzcyIgbWluPSIwIiBtYXg9IjUiIHZhbHVlPSIxIj48L2lucHV0PgoJCQkJPHNwYW4+W1JhbmRvbV0gPC9zcGFuPgoJCQk8L2Rpdj4KCQkJPGRpdiBjbGFzcz0ic2V0dXAiPkVudGVyIFNvdW5kY2xvdWQvWW91dHViZSB0cmFjayBVUkw6PC9kaXY+CgkJCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCIgc3R5bGU9IndpZHRoOjM2MHB4Ij48L2lucHV0PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9hZGRfdXJsIiBvbmNsaWNrPSJCdG5fQWRkVHJhY2tVUkwoKSI+QWRkIHRvIFBsYXlsaXN0PC9idXR0b24+CgkJCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjUxMnB4O21heC1oZWlnaHQ6ODAwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbiI+PC9kaXY+CgkJPC9kaXY+CgkJPGRpdiBzdHlsZT0iZmxvYXQ6IHJpZ2h0OyB3aWR0aDogNTEycHgiPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9hZGRhZ2VudCIgb25jbGljaz0iQnRuX0FkZFVzZXIoKSI+QWRkIFVzZXIvQWRtaW48L2J1dHRvbj4KCQkJPGRpdiBpZD0iYWRtaW5fYWdlbnRfc2Nyb2xsIj4KCQkJPC9kaXY+CgkJPC9kaXY+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3BsYXllcl9wYWdlIj4KCTxkaXYgaWQ9InRpdGxlYm94IiBjbGFzcz0idGl0bGVib3giPgoJCTxzcGFuIGlkPSJ0aXRsZXNwYW4iPjwvc3Bhbj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0iaWNvbmJveCI+CgkJPGltZyBpZD0iaWNvbiIgY2xhc3M9Imljb24iIHNyYz0iIj48L2ltZz4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9Im92ZXJsYXlidG4iIGlkPSJidG5fcGxheV90cmFjayIgb25jbGljaz0iQnRuX1BsYXkoKSI+CgkJCTxkaXYgaWQ9InBsYXlfbGFiZWwiIGNsYXNzPSJvdmVybGF5YnRuX2xhYmVsIj4jTEI8L2Rpdj4KCQk8L2J1dHRvbj4KCTwvZGl2PgoJPGRpdiBpZD0iY2xpZW50X3BsYXllcl9ib3giIGNsYXNzPSJpZnJhbWVib3giPgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY190cmFja19wcmV2aWV3Ij4KCTxkaXYgaWQ9InByZXZpZXdfc2Nyb2xsXyV0cmFjayUiIGNsYXNzPSJwcmV2aWV3dHJhY2siIHN0eWxlPSJvcmRlcjojT1JEIj4KCQk8ZGl2PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9yZW1vdmVfdHJhY2tfJXRyYWNrJSIgb25jbGljaz0iQnRuX1JlbW92ZVRyYWNrSUQoJyV0cmFjayUnKSI+I0RFTDwvYnV0dG9uPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl90cmFja191cF8ldHJhY2slIiBvbmNsaWNrPSJCdG5fTW92ZVVwVHJhY2tJRCgnJXRyYWNrJScpIj4jVVA8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fdHJhY2tfZG93bl8ldHJhY2slIiBvbmNsaWNrPSJCdG5fTW92ZURvd25UcmFja0lEKCcldHJhY2slJykiPiNEV048L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fcmVuX3RyYWNrXyV0cmFjayUiIG9uY2xpY2s9IkJ0bl9SZW5hbWVUcmFja0lEKCcldHJhY2slJykiPkNoYW5nZSBUaXRsZTwvYnV0dG9uPgoJCTwvZGl2PgoJCTxzcGFuIGNsYXNzPSJ3dHh0Ij4ldGl0bGUlPC9zcGFuPgoJCTxkaXYgaWQ9InByZXZpZXdfaWZyYW1lXyV0cmFjayUiPjwvZGl2PgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF95dF9ub3RmcmFtZSI+Cgk8ZGl2IGlkPSIlaWQlIiBjbGFzcz0id2lkZ2V0IiBzdHlsZT0icG9zaXRpb246cmVsYXRpdmU7IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjM2MCIKCXNjcm9sbGluZz0ibm8iIGZyYW1lYm9yZGVyPSJubyIKCT48L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX2FkbWluX2FnZW50Ij4KCTxkaXYgY2xhc3M9InNldHVwIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHN0cmV0Y2g7IGZsZXgtZGlyZWN0aW9uOiByb3ciPgoJCTxzcGFuIGNsYXNzPSJidG50eHQiIHN0eWxlPSJ0ZXh0LWFsaWduOiByaWdodDsgd2lkdGg6Mzg2cHgiPiVuYW1lJTwvc3Bhbj4KCQk8c2VsZWN0IGlkPSJzZWxfbGV2ZWxfJWFnZW50JSIgY2xhc3M9ImJ0bnR4dCIgc3R5bGU9IndpZHRoOjkwcHg7IGZsb2F0OiByaWdodDsgb3JkZXI6IDEiIG9uY2hhbmdlPSJVc2VyTGV2ZWxTZWxlY3RDaGFuZ2UoJyVhZ2VudCUnKSI+CgkJCTxvcHRpb24gdmFsdWU9IjEiPlVzZXI8L29wdGlvbj4KCQkJPG9wdGlvbiB2YWx1ZT0iMiI+TWFuYWdlcjwvb3B0aW9uPgoJCTwvc2VsZWN0PgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBzdHlsZT0ib3JkZXI6IDIiIGlkPSJidG5fcmVtb3ZlXyVhZ2VudCUiIG9uY2xpY2s9IkJ0bl9SZW1vdmVVc2VyKCclYWdlbnQlJykiPiNERUw8L2J1dHRvbj4KCTwvZGl2Pgo8L3RlbXBsYXRlPg==";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/07, 20:09:46";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	