	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiAJCWJsYWNrOwogICAgICAgIG92ZXJmbG93OiAJCQloaWRkZW47CgkJZm9udC1mYW1pbHk6IAkJVmVyZGFuYSwgc2Fucy1zZXJpZjsKICAgIH0KCQoJLmlmcmFtZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCWhlaWdodDogCQkJMTcycHg7CgkJd2lkdGg6IAkJCQk1MTJweDsKCQltYXgtaGVpZ2h0OiAJCTE3MnB4OwoJCW1heC13aWR0aDogCQkJNTEycHg7CgkJcG9zaXRpb246IAkJCWFic29sdXRlOwoJCWxlZnQ6IAkJCQkwcHg7CgkJdG9wOiAJCQkJNTEycHg7CgkJYm9yZGVyLXJhZGl1czogCQkwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogCQloaWRkZW47CiAgICAgICAgb3ZlcmZsb3cteTogCQloaWRkZW47CgkJYmFja2dyb3VuZC1jb2xvcjogCSM0RDZGQjM7CgkJZGlzcGxheTogCQkJZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IAlsZWZ0OwoJCXZpc2liaWxpdHk6IAkJaGlkZGVuOwoJfQoJCgkuYnRudHh0Cgl7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkxNnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwxKTsKCQltYXJnaW46IAkJCTRweCAwcHggNHB4IDRweDsKCX0KCQoJLnd0eHQKCXsKCQlib3JkZXI6CQkJCW5vbmU7CgkJZm9udC1zaXplOgkJCTEycHg7CgkJY29sb3I6IAkJCQlyZ2JhKDI1NSwyNTUsMjU1LDEpOwoJCQoJCW1hcmdpbjogCQkJNCBhdXRvOwoJCXRleHQtYWxpZ246IAkJY2VudGVyOwoJfQoJCgkuc2V0dXAKCXsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgxODAsMTgwLDE4MCwxKTsKCQlib3JkZXI6CQkJCW5vbmU7CgkJbWFyZ2luOiAJCQkwIGF1dG87Cgl9CgkKCS50aXRsZWJveAoJewoJCW1hcmdpbjogCQkJMCBhdXRvOwoJCXRleHQtYWxpZ246IAkJY2VudGVyOwoJCWhlaWdodDogCQkJMzJweDsKCQl3aWR0aDogCQkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMHB4OwoJCXRvcDogCQkJCTEycHg7CgkJYm9yZGVyOgkJCQlub25lOwoJCWZvbnQtc2l6ZToJCQkxMnB4OwoJCWNvbG9yOiAJCQkJcmdiYSgyNTUsMjU1LDI1NSwxKTsKCQlmb250LWZhbWlseTogCQlUYWhvbWEsIHNhbnMtc2VyaWY7Cgl9CgkKCS5pY29uYm94Cgl7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJaGVpZ2h0OiAJCQk0ODBweDsKCQl3aWR0aDogCQkJCTUxMnB4OwoJCXBvc2l0aW9uOiAJCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkJMTZweDsKCQl0b3A6IAkJCQkzMnB4OwoJCWJvcmRlcjoJCQkJbm9uZTsKCX0KCQoJLmljb24KCXsKCQloZWlnaHQ6IAkJCTMycHg7CgkJd2lkdGg6IAkJCQkzMnB4OwoJCXZlcnRpY2FsLWFsaWduOgkJbWlkZGxlOwoJCW9iamVjdC1maXQ6IAkJY292ZXI7CgkJanVzdGlmeS1jb250ZW50OiAJY2VudGVyOwoJCW92ZXJmbG93OgkJCWhpZGRlbjsKCQlwb3NpdGlvbjogCQkJcmVsYXRpdmU7CgkJbWFyZ2luOiAJCQkwIGF1dG87CgkJYm9yZGVyOgkJCQlub25lOwoJfQoJCgkub3ZlcmxheWJ0bgoJewoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQl0b3A6IAkJCQkzMnB4OwoJCWxlZnQ6IAkJCQkxNnB4OwoJCWhlaWdodDogCQkJNDgwcHg7CgkJd2lkdGg6IAkJCQk0ODBweDsKCQliYWNrZ3JvdW5kLWNvbG9yOiAJcmdiYSgwLDAsMCwwKTsKCQl6LWluZGV4OiAJCQkyOwoJCWN1cnNvcjogCQkJcG9pbnRlcjsKCQl0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjZzOwoJCWNvbG9yOiAJCQkJcmdiYSgwLDAsMCwwKTsKCQltYXJnaW46IAkJCTAgYXV0bzsKCQlib3JkZXI6CQkJCW5vbmU7Cgl9CgkKCS5vdmVybGF5YnRuX2xhYmVsCgl7CgkJY29sb3I6IGluaGVyaXQ7CgkJdGV4dC1hbGlnbjoJCQljZW50ZXI7CgkJZm9udC1zaXplOgkJCTE5MnB4OwoJCXBvc2l0aW9uOiAJCQlmaXhlZDsKCQloZWlnaHQ6IAkJCTM2MHB4OwoJCXdpZHRoOiAJCQkJMzYwcHg7CgkJdG9wOiAJCQkJMTMwcHg7CgkJbGVmdDogCQkJCTc2cHg7CgkJYmFja2dyb3VuZC1jb2xvcjogCXJnYmEoMCwwLDAsMCk7CgkJdGV4dC1zaGFkb3c6IAkJaW5oZXJpdDsKCX0KCQoJLm92ZXJsYXlidG46aG92ZXIKCXsKCQljb2xvcjogCQkJCXJnYmEoMzIsMzIsMzIsMSk7CgkJdGV4dC1zaGFkb3c6IC0ycHggLTJweCAwICNGRkZGRkYsIDJweCAtMnB4IDAgI0ZGRkZGRiwgLTJweCAycHggMCAjRkZGRkZGLCAycHggMnB4IDAgI0ZGRkZGRjsKCX0KCQoJLnByZXZpZXd0cmFjawoJewoJCXdpZHRoOiA0ODBweDsKCX0KCQoJLndpZGdldAoJewoJCW1hcmdpbjogCQkJMXB4IDBweCA4cHggMHB4OwoJCWJvcmRlcjogCQkJbm9uZTsKCQloZWlnaHQ6IAkJCTIwMHB4OwoJCXdpZHRoOiAJCQkJMTAwJTsKCQlwb3NpdGlvbjogCQkJYWJzb2x1dGU7CgkJdG9wOiAJCQkJM3B4OwogICAgICAgIG92ZXJmbG93LXg6IAkJaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IAkJaGlkZGVuOwoJCWJhY2tncm91bmQtY29sb3I6IAlyZ2JhKDAsMCwwLDApOwoJfQoJ";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdiBzdHlsZT0iZGlzcGxheTogZmxleCI+CgkJPGRpdiBzdHlsZT0iZmxvYXQ6IGxlZnQ7IHdpZHRoOiA1MTJweCI+CgkJCTxkaXYgY2xhc3M9InNldHVwIj4KCQkJCTxzZWxlY3QgaWQ9InNlbF9wbGF5bGlzdCIgY2xhc3M9ImJ0bnR4dCIgb25jaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fc2F2ZSIgb25jbGljaz0iQnRuX1NhdmVQbGF5bGlzdCgpIj5TYXZlIFNlbGVjdGVkIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0bnR4dCIgaWQ9ImJ0bl9uZXciIG9uY2xpY2s9IkJ0bl9BZGRQbGF5bGlzdCgpIj5OZXcgUGxheWxpc3Q8L2J1dHRvbj4KCQkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3JlbiIgb25jbGljaz0iQnRuX1JlblBsYXlsaXN0KCkiPlJlbmFtZSBQbGF5bGlzdDwvYnV0dG9uPgoJCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fZGVsIiBvbmNsaWNrPSJCdG5fRGVsUGxheWxpc3QoKSI+RGVsZXRlIFBsYXlsaXN0PC9idXR0b24+CgkJCTwvZGl2PgoJCQk8ZGl2IGNsYXNzPSJzZXR1cCI+CgkJCQk8c3Bhbj5QbGF5bGlzdCBTaHVmZmxlOiBbU2VxdWVuY2VdPC9zcGFuPgoJCQkJPGlucHV0IHR5cGU9InJhbmdlIiBpZD0idHJhY2tfcmFuZG9tbmVzcyIgbWluPSIwIiBtYXg9IjUiIHZhbHVlPSIxIiwgc3RlcD0iMSI+PC9pbnB1dD4KCQkJCTxzcGFuPltSYW5kb21dIDwvc3Bhbj4KCQkJPC9kaXY+CgkJCTxkaXYgY2xhc3M9InNldHVwIj5FbnRlciBTb3VuZGNsb3VkL1lvdXR1YmUgdHJhY2sgVVJMOjwvZGl2PgoJCQk8aW5wdXQgdHlwZT0idXJsIiBpZD0idGV4dF9pbnB1dF91cmwiIHN0eWxlPSJ3aWR0aDozNjBweCI+PC9pbnB1dD4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fYWRkX3VybCIgb25jbGljaz0iQnRuX0FkZFRyYWNrVVJMKCkiPkFkZCB0byBQbGF5bGlzdDwvYnV0dG9uPgoJCQk8ZGl2IGlkPSJzY19wcmV2aWV3X3Njcm9sbCIgc3R5bGU9Im92ZXJmbG93LXk6c2Nyb2xsO3BhZGRpbmc6NXB4O21heC13aWR0aDo1MTJweDttYXgtaGVpZ2h0OjgwMHB4O2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW4iPjwvZGl2PgoJCTwvZGl2PgoJCTxkaXYgc3R5bGU9ImZsb2F0OiByaWdodDsgd2lkdGg6IDUxMnB4Ij4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fYWRkYWdlbnQiIG9uY2xpY2s9IkJ0bl9BZGRVc2VyKCkiPkFkZCBVc2VyL0FkbWluPC9idXR0b24+CgkJCTxkaXYgaWQ9ImFkbWluX2FnZW50X3Njcm9sbCI+CgkJCTwvZGl2PgoJCTwvZGl2PgoJPC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19wbGF5ZXJfcGFnZSI+Cgk8ZGl2IGlkPSJ0aXRsZWJveCIgY2xhc3M9InRpdGxlYm94Ij4KCQk8c3BhbiBpZD0idGl0bGVzcGFuIj48L3NwYW4+Cgk8L2Rpdj4KCTxkaXYgY2xhc3M9Imljb25ib3giPgoJCTxpbWcgaWQ9Imljb24iIGNsYXNzPSJpY29uIiBzcmM9IiI+PC9pbWc+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJvdmVybGF5YnRuIiBpZD0iYnRuX3BsYXlfdHJhY2siIG9uY2xpY2s9IkJ0bl9QbGF5KCkiPgoJCQk8ZGl2IGlkPSJwbGF5X2xhYmVsIiBjbGFzcz0ib3ZlcmxheWJ0bl9sYWJlbCI+I0xCPC9kaXY+CgkJPC9idXR0b24+Cgk8L2Rpdj4KCTxkaXYgaWQ9ImNsaWVudF9wbGF5ZXJfYm94IiBjbGFzcz0iaWZyYW1lYm94Ij4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfcHJldmlldyI+Cgk8ZGl2IGlkPSJwcmV2aWV3X3Njcm9sbF8ldHJhY2slIiBjbGFzcz0icHJldmlld3RyYWNrIiBzdHlsZT0ib3JkZXI6I09SRCI+CgkJPGRpdj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fcmVtb3ZlX3RyYWNrXyV0cmFjayUiIG9uY2xpY2s9IkJ0bl9SZW1vdmVUcmFja0lEKCcldHJhY2slJykiPiNERUw8L2J1dHRvbj4KCQkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIGlkPSJidG5fdHJhY2tfdXBfJXRyYWNrJSIgb25jbGljaz0iQnRuX01vdmVVcFRyYWNrSUQoJyV0cmFjayUnKSI+I1VQPC9idXR0b24+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3RyYWNrX2Rvd25fJXRyYWNrJSIgb25jbGljaz0iQnRuX01vdmVEb3duVHJhY2tJRCgnJXRyYWNrJScpIj4jRFdOPC9idXR0b24+CgkJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRudHh0IiBpZD0iYnRuX3Jlbl90cmFja18ldHJhY2slIiBvbmNsaWNrPSJCdG5fUmVuYW1lVHJhY2tJRCgnJXRyYWNrJScpIj5DaGFuZ2UgVGl0bGU8L2J1dHRvbj4KCQkJPHNwYW4+Vm9sdW1lOjwvc3Bhbj4KCQkJPGlucHV0IHR5cGU9InJhbmdlIiBpZD0idHJhY2tfdm9sXyV0cmFjayUiIG1pbj0iNTAiIG1heD0iMTAwIiB2YWx1ZT0iNzUiIHN0ZXA9IjUiIG9uY2hhbmdlPSJTbGlkZXJfVHJhY2tWb2x1bWUoJyV0cmFjayUnKSI+PC9pbnB1dD4KCQk8L2Rpdj4KCQk8c3BhbiBjbGFzcz0id3R4dCI+JXRpdGxlJTwvc3Bhbj4KCQk8ZGl2IGlkPSJwcmV2aWV3X2lmcmFtZV8ldHJhY2slIj48L2Rpdj4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfeXRfaWZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIgoJPjwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfYWRtaW5fYWdlbnQiPgoJPGRpdiBjbGFzcz0ic2V0dXAiIHN0eWxlPSJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogc3RyZXRjaDsgZmxleC1kaXJlY3Rpb246IHJvdyI+CgkJPHNwYW4gY2xhc3M9ImJ0bnR4dCIgc3R5bGU9InRleHQtYWxpZ246IHJpZ2h0OyB3aWR0aDozODZweCI+JW5hbWUlPC9zcGFuPgoJCTxzZWxlY3QgaWQ9InNlbF9sZXZlbF8lYWdlbnQlIiBjbGFzcz0iYnRudHh0IiBzdHlsZT0id2lkdGg6OTBweDsgZmxvYXQ6IHJpZ2h0OyBvcmRlcjogMSIgb25jaGFuZ2U9IlVzZXJMZXZlbFNlbGVjdENoYW5nZSgnJWFnZW50JScpIj4KCQkJPG9wdGlvbiB2YWx1ZT0iMSI+VXNlcjwvb3B0aW9uPgoJCQk8b3B0aW9uIHZhbHVlPSIyIj5NYW5hZ2VyPC9vcHRpb24+CgkJPC9zZWxlY3Q+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG50eHQiIHN0eWxlPSJvcmRlcjogMiIgaWQ9ImJ0bl9yZW1vdmVfJWFnZW50JSIgb25jbGljaz0iQnRuX1JlbW92ZVVzZXIoJyVhZ2VudCUnKSI+I0RFTDwvYnV0dG9uPgoJPC9kaXY+CjwvdGVtcGxhdGU+";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/02/06, 16:32:22";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	