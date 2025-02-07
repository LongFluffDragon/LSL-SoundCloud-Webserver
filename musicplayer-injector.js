	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CgkJZm9udC1mYW1pbHk6IAkJVmVyZGFuYSwgc2Fucy1zZXJpZjsKICAgIH0KCQoJLmlmcmFtZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWhlaWdodDogCQkJMTcycHg7CgkJd2lkdGg6IAkJCQk1MTJweDsKCQltYXgtaGVpZ2h0OiAJCTE3MnB4OwoJCW1heC13aWR0aDogCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNTEycHg7CgkJYm9yZGVyLXJhZGl1czogCQkwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCSM0RDZGQjM7CgkJZGlzcGxheTogCQkJZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAlsZWZ0OwoJCXZpc2liaWxpdHk6IAkJaGlkZGVuOwoJfQoJCgkuYnRudHh0Cgl7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkxNnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwxKTsKCQltYXJnaW46IAkJCTRweCAwcHggNHB4IDRweDsKCX0KCQoJLnd0eHQKCXsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTEycHg7CgkJY29sb3I6IAkJCQlyZ2JhKDI1NSwyNTUsMjU1LDEpOwoJCQoJCW1hcmdpbjogCQkJNCBhdXRvOwoJCXRleHQtYWxpZ246IAkJY2VudGVyOwoJfQoJCgkuc2V0dXAKCXsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgxODAsMTgwLDE4MCwxKTsKCQlib3JkZXI6CQkJCW5vbmU7CgkJbWFyZ2luOiAJCQkwIGF1dG87Cgl9CgkKCS50aXRsZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCXRleHQtYWxpZ246IAkJY2VudGVyOwoJCWhlaWdodDogCQkJMzJweDsKCQl3aWR0aDogCQkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMHB4OwoJCXRvcDogCQkJCTEycHg7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkxMnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgyNTUsMjU1LDI1NSwxKTsKCQlmb250LWZhbWlseTogCQlUYWhvbWEsIHNhbnMtc2VyaWY7Cgl9CgkKCS5pY29uYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJaGVpZ2h0OiAJCQk0ODBweDsKCQl3aWR0aDogCQkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMTZweDsKCQl0b3A6IAkJCQkzMnB4OwoJCWJvcmRlcjoJCQkJbm9uZTsKCX0KCQoJLmljb24KCXsKCQloZWlnaHQ6IAkJCTMycHg7CgkJd2lkdGg6IAkJCQkzMnB4OwoJCXZlcnRpY2FsLWFsaWduOgkJbWlkZGxlOwoJCW9iamVjdC1maXQ6IAkJY292ZXI7CgkJanVzdGlmeS1jb250ZW50OiAJY2VudGVyOwoJCW92ZXJmbG93OgkJCWhpZGRlbjsKCQlwb3NpdGlvbjogCQkJcmVsYXRpdmU7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkub3ZlcmxheWJ0bgoJewoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQl0b3A6IAkJCQkzMnB4OwoJCWxlZnQ6IAkJCQkxNnB4OwoJCWhlaWdodDogCQkJNDgwcHg7CgkJd2lkdGg6IAkJCQk0ODBweDsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCQl6LWluZGV4OiAJCQkyOwoJCWN1cnNvcjogCQkJcG9pbnRlcjsKCQl0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjZzOwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwwKTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQlib3JkZXI6CQkJCW5vbmU7Cgl9CgkKCS5vdmVybGF5YnRuX2xhYmVsCgl7CgkJY29sb3I6IGluaGVyaXQ7CgkJdGV4dC1hbGlnbjoJCQljZW50ZXI7CgkJZm9udC1zaXplOgkJCTE5MnB4OwoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQloZWlnaHQ6IAkJCTM2MHB4OwoJCXdpZHRoOiAJCQkJMzYwcHg7CgkJdG9wOiAJCQkJMTMwcHg7CgkJbGVmdDogCQkJCTc2cHg7CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMCwwLDAsMCk7CgkJdGV4dC1zaGFkb3c6IAkJaW5oZXJpdDsKCX0KCQoJLm92ZXJsYXlidG46aG92ZXIKCXsKCQljb2xvcjogCQkJCXJnYmEoMzIsMzIsMzIsMSk7CgkJdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICNGRkZGRkYsIDJweCAtMnB4IDAgI0ZGRkZGRiwgLTJweCAycHggMCAjRkZGRkZGLCAycHggMnB4IDAgI0ZGRkZGRjsKCX0KCQoJLnByZXZpZXd0cmFjawoJewoJCXdpZHRoOiA0ODBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogCQkJMXB4IDBweCA4cHggMHB4OwoJCWJvcmRlcjogCQkJbm9uZTsKCQloZWlnaHQ6IAkJCTIwMHB4OwoJCXdpZHRoOiAJCQkJMTAwJTsKCQlwb3NpdGlvbjogCQkJYWJzb2x1dGU7CgkJdG9wOiAJCQkJM3B4OwogICAgICAgIG92ZXJmbG93LXg6IAkJaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IAkJaGlkZGVuOwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJfQoJ";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdiBzdHlsZT0iZGlzcGxheTogZmxleCI+CgkJPGRpdiBzdHlsZT0iZmxvYXQ6IGxlZnQ7IHdpZHRoOiA1MTJweCI+CgkJCTxkaXYgY2xhc3M9InNldHVwIj4KCQkJCTxzZWxlY3QgaWQ9InNlbF9wbGF5bGlzdCIgY2xhc3M9ImJ0bnR4dCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fc2F2ZSIgb25jbGljaz0iQnRuX1NhdmVQbGF5bGlzdCgpIj5TYXZlIFNlbGVjdGVkIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9uZXciIG9uY2xpY2s9IkJ0bl9BZGRQbGF5bGlzdCgpIj5OZXcgUGxheWxpc3Q8L2J1dHRvbj4KCQkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fZGVsIiBvbmNsaWNrPSJCdG5fRGVsUGxheWxpc3QoKSI+RGVsZXRlIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8c3Bhbj5QbGF5bGlzdCBTaHVmZmxlOiBbU2VxdWVuY2VdPC9zcGFuPgoJCQkJPGlucHV0IHR5cGU9InJhbmdlIiBpZD0idHJhY2tfcmFuZG9tbmVzcyIgbWluPSIwIiBtYXg9IjUiIHZhbHVlPSIxIiBzdGVwPSIxIj48L2lucHV0PgoJCQkJPHNwYW4+W1JhbmRvbV0gPC9zcGFuPgoJCQk8L2Rpdj4KCQkJPGRpdiBjbGFzcz0ic2V0dXAiPkVudGVyIFNvdW5kY2xvdWQvWW91dHViZSB0cmFjayBVUkw6PC9kaXY+CgkJCTxpbnB1dCB0eXBlPSJ1cmwiIGlkPSJ0ZXh0X2lucHV0X3VybCIgc3R5bGU9IndpZHRoOjM2MHB4Ij48L2lucHV0PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9hZGRfdXJsIiBvbmNsaWNrPSJCdG5fQWRkVHJhY2tVUkwoKSI+QWRkIHRvIFBsYXlsaXN0PC9idXR0b24+CgkJCTxkaXYgaWQ9InNjX3ByZXZpZXdfc2Nyb2xsIiBzdHlsZT0ib3ZlcmZsb3cteTpzY3JvbGw7cGFkZGluZzo1cHg7bWF4LXdpZHRoOjUxMnB4O21heC1oZWlnaHQ6ODAwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbiI+PC9kaXY+CgkJPC9kaXY+CgkJPGRpdiBzdHlsZT0iZmxvYXQ6IHJpZ2h0OyB3aWR0aDogNTEycHgiPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9hZGRhZ2VudCIgb25jbGljaz0iQnRuX0FkZFVzZXIoKSI+QWRkIFVzZXIvQWRtaW48L2J1dHRvbj4KCQkJPGRpdiBpZD0iYWRtaW5fYWdlbnRfc2Nyb2xsIj48L2Rpdj4KCQk8L2Rpdj4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfcGxheWVyX3BhZ2UiPgoJPGRpdiBpZD0idGl0bGVib3giIGNsYXNzPSJ0aXRsZWJveCI+CgkJPHNwYW4gaWQ9InRpdGxlc3BhbiI+PC9zcGFuPgoJPC9kaXY+Cgk8ZGl2IGNsYXNzPSJpY29uYm94Ij4KCQk8aW1nIGlkPSJpY29uIiBjbGFzcz0iaWNvbiIgc3JjPSIiPjwvaW1nPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0ib3ZlcmxheWJ0biIgaWQ9ImJ0bl9wbGF5X3RyYWNrIiBvbmNsaWNrPSJCdG5fUGxheSgpIj4KCQkJPGRpdiBpZD0icGxheV9sYWJlbCIgY2xhc3M9Im92ZXJsYXlidG5fbGFiZWwiPiNMQjwvZGl2PgoJCTwvYnV0dG9uPgoJPC9kaXY+Cgk8ZGl2IGlkPSJjbGllbnRfcGxheWVyX2JveCIgY2xhc3M9ImlmcmFtZWJveCI+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3NjX3RyYWNrX3ByZXZpZXciPgoJPGRpdiBpZD0icHJldmlld19zY3JvbGxfJXRyYWNrJSIgY2xhc3M9InByZXZpZXd0cmFjayIgc3R5bGU9Im9yZGVyOiVPUkQlIj4KCQk8ZGl2PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9yZW1vdmVfdHJhY2tfJXRyYWNrJSIgb25jbGljaz0iQnRuX1JlbW92ZVRyYWNrSUQoJyV0cmFjayUnKSI+JURFTCU8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fdHJhY2tfdXBfJXRyYWNrJSIgb25jbGljaz0iQnRuX01vdmVVcFRyYWNrSUQoJyV0cmFjayUnKSI+JVVQJTwvYnV0dG9uPgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl90cmFja19kb3duXyV0cmFjayUiIG9uY2xpY2s9IkJ0bl9Nb3ZlRG93blRyYWNrSUQoJyV0cmFjayUnKSI+JURXTiU8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fcmVuX3RyYWNrXyV0cmFjayUiIG9uY2xpY2s9IkJ0bl9SZW5hbWVUcmFja0lEKCcldHJhY2slJykiPkNoYW5nZSBUaXRsZTwvYnV0dG9uPgoJCQk8c3BhbiBjbGFzcz0id3R4dCIgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgdmVydGljYWwtYWxpZ246IG1pZGRsZSI+IFZvbHVtZSA8L3NwYW4+CgkJCTxpbnB1dCB0eXBlPSJyYW5nZSIgaWQ9InRyYWNrX3ZvbF8ldHJhY2slIiBtaW49IiVNSU4lIiBtYXg9IiVNQVglIiB2YWx1ZT0iNzUiIHN0ZXA9IjUiIHN0eWxlPSJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGUiIAoJCQkJb25jaGFuZ2U9IlNsaWRlcl9UcmFja1ZvbHVtZSgnJXRyYWNrJScpIj48L2lucHV0PgoJCTwvZGl2PgoJCTxzcGFuIGNsYXNzPSJ3dHh0Ij4ldGl0bGUlPC9zcGFuPgoJCTxkaXYgaWQ9InByZXZpZXdfaWZyYW1lXyV0cmFjayUiPjwvZGl2PgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19pZnJhbWUiPgoJPGlmcmFtZSBpZD0iJWlkJSIgY2xhc3M9IndpZGdldCIgc3R5bGU9InBvc2l0aW9uOnJlbGF0aXZlOyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSIxNjYiCgkJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCQlzcmM9Imh0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbS9wbGF5ZXIvP3VybD1odHRwcyUzQS8vYXBpLnNvdW5kY2xvdWQuY29tL3RyYWNrcy9wbGFjZWhvbGRlciZhbXA7dmlzdWFsPWZhbHNlIj4KCTwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfeXRfaWZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIiBzY3JvbGxpbmc9Im5vIiBmcmFtZWJvcmRlcj0ibm8iPgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9hZG1pbl9hZ2VudCI+Cgk8ZGl2IGNsYXNzPSJzZXR1cCIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBzdHJldGNoOyBmbGV4LWRpcmVjdGlvbjogcm93Ij4KCQk8c3BhbiBjbGFzcz0iYnRudHh0IiBzdHlsZT0idGV4dC1hbGlnbjogcmlnaHQ7IHdpZHRoOjM4NnB4Ij4lbmFtZSU8L3NwYW4+CgkJPHNlbGVjdCBpZD0ic2VsX2xldmVsXyVhZ2VudCUiIGNsYXNzPSJidG50eHQiIHN0eWxlPSJ3aWR0aDo5MHB4OyBmbG9hdDogcmlnaHQ7IG9yZGVyOiAxIiBvbmNoYW5nZT0iVXNlckxldmVsU2VsZWN0Q2hhbmdlKCclYWdlbnQlJykiPgoJCQk8b3B0aW9uIHZhbHVlPSIxIj5Vc2VyPC9vcHRpb24+CgkJCTxvcHRpb24gdmFsdWU9IjIiPk1hbmFnZXI8L29wdGlvbj4KCQk8L3NlbGVjdD4KCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgc3R5bGU9Im9yZGVyOiAyIiBpZD0iYnRuX3JlbW92ZV8lYWdlbnQlIiBvbmNsaWNrPSJCdG5fUmVtb3ZlVXNlcignJWFnZW50JScpIj4jREVMPC9idXR0b24+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4=";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/02/06, 18:29:09";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	