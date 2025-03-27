	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CgkJZm9udC1mYW1pbHk6IAkJVmVyZGFuYSwgc2Fucy1zZXJpZjsKICAgIH0KCQoJLmlmcmFtZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWhlaWdodDogCQkJMTcycHg7CgkJd2lkdGg6IAkJCQk1MTJweDsKCQltYXgtaGVpZ2h0OiAJCTE3MnB4OwoJCW1heC13aWR0aDogCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNTEycHg7CgkJYm9yZGVyLXJhZGl1czogCQkwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCSM0RDZGQjM7CgkJZGlzcGxheTogCQkJZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAlsZWZ0OwoJCXZpc2liaWxpdHk6IAkJaGlkZGVuOwoJfQoJCgkuYmxvY2tfbWlkCgl7CgkJc3R5bGU6CQkJCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCQl2ZXJ0aWNhbC1hbGlnbjogCW1pZGRsZTsKCX0KCQoJLmJ0bnR4dAoJewoJCWJvcmRlcjoJCQkJbm9uZTsKCQlmb250LXNpemU6CQkJMTZweDsKCQljb2xvcjogCQkJCXJnYmEoMCwwLDAsMSk7CgkJbWFyZ2luOiAJCQk0cHggMHB4IDRweCA0cHg7Cgl9CgkKCS53dHh0Cgl7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkxMnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgyNTUsMjU1LDI1NSwxKTsKCQkKCQltYXJnaW46IAkJCTQgYXV0bzsKCQl0ZXh0LWFsaWduOiAJCWNlbnRlcjsKCX0KCQoJLnNldHVwCgl7CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMTgwLDE4MCwxODAsMSk7CgkJYm9yZGVyOgkJCQlub25lOwoJCW1hcmdpbjogCQkJMCBhdXRvOwoJfQoJCgkudGl0bGVib3gKCXsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQl0ZXh0LWFsaWduOiAJCWNlbnRlcjsKCQloZWlnaHQ6IAkJCTY0cHg7CgkJd2lkdGg6IAkJCQkxMDI0cHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNTEycHg7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkzMnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgyNTUsMjU1LDI1NSwxKTsKCQlmb250LWZhbWlseTogCQlUYWhvbWEsIHNhbnMtc2VyaWY7Cgl9CgkKCS5pY29uYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJaGVpZ2h0OiAJCQk0ODBweDsKCQl3aWR0aDogCQkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMjcycHg7CgkJdG9wOiAJCQkJMzJweDsKCQlib3JkZXI6CQkJCW5vbmU7Cgl9CgkKCS5pY29uCgl7CgkJaGVpZ2h0OiAJCQkzMnB4OwoJCXdpZHRoOiAJCQkJMzJweDsKCQl2ZXJ0aWNhbC1hbGlnbjoJCW1pZGRsZTsKCQlvYmplY3QtZml0OiAJCWNvdmVyOwoJCWp1c3RpZnktY29udGVudDogCWNlbnRlcjsKCQlvdmVyZmxvdzoJCQloaWRkZW47CgkJcG9zaXRpb246IAkJCXJlbGF0aXZlOwoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWJvcmRlcjoJCQkJbm9uZTsKCX0KCQoJLm92ZXJsYXlidG4KCXsKCQlwb3NpdGlvbjogCQkJZml4ZWQ7CgkJdG9wOiAJCQkJMzJweDsKCQlsZWZ0OiAJCQkJMTZweDsKCQloZWlnaHQ6IAkJCTQ4MHB4OwoJCXdpZHRoOiAJCQkJNDgwcHg7CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMCwwLDAsMCk7CgkJei1pbmRleDogCQkJMjsKCQljdXJzb3I6IAkJCXBvaW50ZXI7CgkJdHJhbnNpdGlvbi1kdXJhdGlvbjogMC42czsKCQljb2xvcjogCQkJCXJnYmEoMCwwLDAsMCk7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkub3ZlcmxheWJ0bl9sYWJlbAoJewoJCWNvbG9yOiBpbmhlcml0OwoJCXRleHQtYWxpZ246CQkJY2VudGVyOwoJCWZvbnQtc2l6ZToJCQkxOTJweDsKCQlwb3NpdGlvbjogCQkJZml4ZWQ7CgkJaGVpZ2h0OiAJCQkzNjBweDsKCQl3aWR0aDogCQkJCTM2MHB4OwoJCXRvcDogCQkJCTEzMHB4OwoJCWxlZnQ6IAkJCQk3NnB4OwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJCXRleHQtc2hhZG93OiAJCWluaGVyaXQ7Cgl9CgkKCS5vdmVybGF5YnRuOmhvdmVyCgl7CgkJY29sb3I6IAkJCQlyZ2JhKDMyLDMyLDMyLDEpOwoJCXRleHQtc2hhZG93OiAtMnB4IC0ycHggMCAjRkZGRkZGLCAycHggLTJweCAwICNGRkZGRkYsIC0ycHggMnB4IDAgI0ZGRkZGRiwgMnB4IDJweCAwICNGRkZGRkY7Cgl9CgkKCS5wcmV2aWV3dHJhY2sKCXsKCQl3aWR0aDogNDgwcHg7Cgl9CgkKCS53aWRnZXQKCXsKCQltYXJnaW46IAkJCTFweCAwcHggOHB4IDBweDsKCQlib3JkZXI6IAkJCW5vbmU7CgkJaGVpZ2h0OiAJCQkyMDBweDsKCQl3aWR0aDogCQkJCTEwMCU7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCXRvcDogCQkJCTNweDsKICAgICAgICBvdmVyZmxvdy14OiAJCWhpZGRlbjsKICAgICAgICBvdmVyZmxvdy15OiAJCWhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCX0KCQ==";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdiBzdHlsZT0iZGlzcGxheTogZmxleCI+CgkJPGRpdiBzdHlsZT0iZmxvYXQ6IGxlZnQ7IHdpZHRoOiA1MTJweCI+CgkJCTxkaXYgY2xhc3M9InNldHVwIj4KCQkJCTxzZWxlY3QgaWQ9InNlbF9wbGF5bGlzdCIgY2xhc3M9ImJ0bnR4dCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fc2F2ZSIgb25jbGljaz0iQnRuX1NhdmVQbGF5bGlzdCgpIj5TYXZlIFNlbGVjdGVkIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9uZXciIG9uY2xpY2s9IkJ0bl9BZGRQbGF5bGlzdCgpIj5OZXcgUGxheWxpc3Q8L2J1dHRvbj4KCQkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fZGVsIiBvbmNsaWNrPSJCdG5fRGVsUGxheWxpc3QoKSI+RGVsZXRlIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8c3BhbiBjbGFzcz0iYmxvY2tfbWlkIj5QbGF5bGlzdCBTaHVmZmxlOiBbU2VxdWVuY2VdPC9zcGFuPgoJCQkJPGlucHV0IGNsYXNzPSJibG9ja19taWQiIHR5cGU9InJhbmdlIiBpZD0idHJhY2tfcmFuZG9tbmVzcyIgbWluPSIwIiBtYXg9IjUiIHZhbHVlPSIxIiBzdGVwPSIxIj48L2lucHV0PgoJCQkJPHNwYW4gY2xhc3M9ImJsb2NrX21pZCI+W1JhbmRvbV0gPC9zcGFuPgoJCQk8L2Rpdj4KCQkJPGRpdiBjbGFzcz0ic2V0dXAiPkVudGVyIFNvdW5kY2xvdWQvWW91dHViZSB0cmFjayBVUkw6PC9kaXY+CgkJCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCIgc3R5bGU9IndpZHRoOjM2MHB4Ij48L2lucHV0PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9hZGRfdXJsIiBvbmNsaWNrPSJCdG5fQWRkVHJhY2tVUkwoKSI+QWRkIHRvIFBsYXlsaXN0PC9idXR0b24+CgkJCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjUxMnB4O21heC1oZWlnaHQ6ODAwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbiI+PC9kaXY+CgkJPC9kaXY+CgkJPGRpdiBzdHlsZT0iZmxvYXQ6IHJpZ2h0OyB3aWR0aDogNTEycHgiPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9hZGRhZ2VudCIgb25jbGljaz0iQnRuX0FkZFVzZXIoKSI+QWRkIFVzZXIvQWRtaW48L2J1dHRvbj4KCQkJPGRpdiBpZD0iYWRtaW5fYWdlbnRfc2Nyb2xsIj48L2Rpdj4KCQk8L2Rpdj4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfcGxheWVyX3BhZ2UiPgoJPGRpdiBpZD0idGl0bGVib3giIGNsYXNzPSJ0aXRsZWJveCI+CgkJPHNwYW4gaWQ9InRpdGxlc3BhbiI+PC9zcGFuPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJpY29uYm94Ij4KCQk8aW1nIGlkPSJpY29uIiBjbGFzcz0iaWNvbiIgc3JjPSIiPjwvaW1nPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0ib3ZlcmxheWJ0biIgaWQ9ImJ0bl9wbGF5X3RyYWNrIiBvbmNsaWNrPSJCdG5fUGxheSgpIj4KCQkJPGRpdiBpZD0icGxheV9sYWJlbCIgY2xhc3M9Im92ZXJsYXlidG5fbGFiZWwiPiNMQjwvZGl2PgoJCTwvYnV0dG9uPgoJPC9kaXY+Cgk8ZGl2IGlkPSJjbGllbnRfcGxheWVyX2JveCIgY2xhc3M9ImlmcmFtZWJveCI+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3RyYWNrX3ByZXZpZXciPgoJPGRpdiBpZD0icHJldmlld19zY3JvbGxfJXRyYWNrJSIgY2xhc3M9InByZXZpZXd0cmFjayIgc3R5bGU9Im9yZGVyOiVPUkQlIj4KCQk8ZGl2PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9yZW1vdmVfdHJhY2tfJXRyYWNrJSIgb25jbGljaz0iQnRuX1JlbW92ZVRyYWNrSUQoJyV0cmFjayUnKSI+JURFTCU8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fdHJhY2tfdXBfJXRyYWNrJSIgb25jbGljaz0iQnRuX01vdmVVcFRyYWNrSUQoJyV0cmFjayUnKSI+JVVQJTwvYnV0dG9uPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl90cmFja19kb3duXyV0cmFjayUiIG9uY2xpY2s9IkJ0bl9Nb3ZlRG93blRyYWNrSUQoJyV0cmFjayUnKSI+JURXTiU8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fcmVuX3RyYWNrXyV0cmFjayUiIG9uY2xpY2s9IkJ0bl9SZW5hbWVUcmFja0lEKCcldHJhY2slJykiPkNoYW5nZSBUaXRsZTwvYnV0dG9uPgoJCQk8c3BhbiBjbGFzcz0id3R4dCBibG9ja19taWQiPiBWb2x1bWUgPC9zcGFuPgoJCQk8aW5wdXQgY2xhc3M9ImJsb2NrX21pZCIgdHlwZT0icmFuZ2UiIGlkPSJ0cmFja192b2xfJXRyYWNrJSIgbWluPSIlTUlOJSIgbWF4PSIlTUFYJSIgdmFsdWU9IiVWT0wlIiBzdGVwPSIxIgoJCQkJb25jaGFuZ2U9IlNsaWRlcl9UcmFja1ZvbHVtZSgnJXRyYWNrJScpIj48L2lucHV0PgoJCTwvZGl2PgoJCTxzcGFuIGNsYXNzPSJ3dHh0Ij4ldGl0bGUlPC9zcGFuPgoJCTxkaXYgaWQ9InByZXZpZXdfaWZyYW1lXyV0cmFjayUiPjwvZGl2PgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19pZnJhbWUiPgoJPGlmcmFtZSBpZD0iJWlkJSIgY2xhc3M9IndpZGdldCIgc3R5bGU9InBvc2l0aW9uOnJlbGF0aXZlOyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSIxNjYiCgkJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCQlzcmM9Imh0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbS9wbGF5ZXIvP3VybD1odHRwcyUzQS8vYXBpLnNvdW5kY2xvdWQuY29tL3RyYWNrcy9wbGFjZWhvbGRlciZhbXA7dmlzdWFsPWZhbHNlIj4KCTwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfeXRfaWZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIiBzY3JvbGxpbmc9Im5vIiBmcmFtZWJvcmRlcj0ibm8iPgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9hZG1pbl9hZ2VudCI+Cgk8ZGl2IGNsYXNzPSJzZXR1cCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBzdHJldGNoOyBmbGV4LWRpcmVjdGlvbjogcm93Ij4KCQk8c3BhbiBjbGFzcz0iYnRudHh0IiBzdHlsZT0idGV4dC1hbGlnbjogcmlnaHQ7IHdpZHRoOjM4NnB4Ij4lbmFtZSU8L3NwYW4+CgkJPHNlbGVjdCBpZD0ic2VsX2xldmVsXyVhZ2VudCUiIGNsYXNzPSJidG50eHQiIHN0eWxlPSJ3aWR0aDo5MHB4OyBmbG9hdDogcmlnaHQ7IG9yZGVyOiAxIiBvbmNoYW5nZT0iVXNlckxldmVsU2VsZWN0Q2hhbmdlKCclYWdlbnQlJykiPgoJCQk8b3B0aW9uIHZhbHVlPSIxIj5Vc2VyPC9vcHRpb24+CgkJCTxvcHRpb24gdmFsdWU9IjIiPk1hbmFnZXI8L29wdGlvbj4KCQk8L3NlbGVjdD4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgc3R5bGU9Im9yZGVyOiAyIiBpZD0iYnRuX3JlbW92ZV8lYWdlbnQlIiBvbmNsaWNrPSJCdG5fUmVtb3ZlVXNlcignJWFnZW50JScpIj4jREVMPC9idXR0b24+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4=";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/03/26, 20:17:36";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	