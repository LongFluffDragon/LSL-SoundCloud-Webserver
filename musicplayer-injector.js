	
	var pagecss = "CWJvZHkKICAgIHsKICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgfQoJCgkuaWZyYW1lYm94Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiAxNzJweDsKCQl3aWR0aDogNTEycHg7CgkJbWF4LWhlaWdodDogMTcycHg7CgkJbWF4LXdpZHRoOiA1MTJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQk1MTJweDsKCQlib3JkZXItcmFkaXVzOiAwcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBsZWZ0OwoJfQoJCgkuaWNvbgoJewoJCWhlaWdodDogMzJweDsKCQl3aWR0aDogMzJweDsKCQlwb3NpdGlvbjogCQlhYnNvbHV0ZTsKCQlsZWZ0OiAJCQkwcHg7CgkJdG9wOiAJCQkwcHg7CgkJYm9yZGVyLXJhZGl1czogMHB4OwoJfQoJCgkud2lkZ2V0Cgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJbWluLWhlaWdodDogMTY2cHg7CgkJbWluLXdpZHRoOiA1MTJweDsKCQltYXgtaGVpZ2h0OiAxNjZweDsKCQltYXgtd2lkdGg6IDUxMnB4OwoJCXBvc2l0aW9uOiAJCWFic29sdXRlOwoJCWxlZnQ6IAkJCTNweDsKCQl0b3A6IAkJCTNweDsKCQlib3JkZXItcmFkaXVzOiAzcHg7CiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuOwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOz0KCX0KCQoJLmxvZ2luCgl7CgkJbWFyZ2luOiAwIGF1dG87CgkJaGVpZ2h0OiA1MTJweDsKCQl3aWR0aDogMTAyNHB4OwoJCW1hcmdpbi10b3A6IDEyOHB4OwoJCWNvbG9yOiB3aGl0ZTsKCQlib3JkZXItcmFkaXVzOiAxNnB4OwogICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjNEQ2RkIzOwoJCWRpc3BsYXk6IGZsZXg7CgkJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cgl9";
	var pagetemplates = "PHRlbXBsYXRlIGlkPSJUTVBfc2NfaWZyYW1lIj4KCTxpZnJhbWUgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMTY2IgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIiBvbmxvYWQ9IlNDX0lmcmFtZVRlbXBsYXRlX29ubG9hZCh0aGlzKSIKCXNyYz0iaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8/dXJsPWh0dHBzJTNBLy9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzL3BsYWNlaG9sZGVyJmFtcDt2aXN1YWw9ZmFsc2UiPjwvaWZyYW1lPgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfc2V0dXAiPgoJPGRpdj4KCQk8c2VsZWN0IGlkID0gInNlbF9wbGF5bGlzdCIgb25DaGFuZ2U9IlBsYXlsaXN0U2VsZWN0Q2hhbmdlKCkiPjwvc2VsZWN0PgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX2xvYWQiIG9uY2xpY2s9IkJ0bl9Mb2FkUGxheWxpc3QoKSI+TG9hZCBTZWxlY3RlZCBQbGF5bGlzdDwvYnV0dG9uPgoJCTxidXR0b24gdHlwZT0iYnV0dG9uIiBpZD0iYnRuX3NhdmUiIG9uY2xpY2s9IkJ0bl9TYXZlUGxheWxpc3QoKSI+U2F2ZSBTZWxlY3RlZCBQbGF5bGlzdDwvYnV0dG9uPgoJPC9kaXY+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fbmV3IiBvbmNsaWNrPSJCdG5fQWRkUGxheWxpc3QoKSI+TmV3IFBsYXlsaXN0PC9idXR0b24+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fcmVuIiBvbmNsaWNrPSJCdG5fUmVuUGxheWxpc3QoKSI+UmVuYW1lIFBsYXlsaXN0PC9idXR0b24+CgkJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fZGVsIiBvbmNsaWNrPSJCdG5fRGVsUGxheWxpc3QoKSI+RGVsZXRlIFBsYXlsaXN0PC9idXR0b24+Cgk8ZGl2PgoJPGRpdj4KCQk8c3Bhbj5QbGF5bGlzdCBTaHVmZmxlOiBbU2VxdWVuY2VdPC9zcGFuPgoJCTxpbnB1dCB0eXBlPSJyYW5nZSIgaWQ9InRyYWNrX3JhbmRvbW5lc3MiIG1pbj0iMCIgbWF4PSI1IiB2YWx1ZT0iMSI+PC9pbnB1dD4KCQk8c3Bhbj5bUmFuZG9tXSA8L3NwYW4+Cgk8L2Rpdj4KCTwvZGl2PgoJPGRpdj5FbnRlciBTb3VuZGNsb3VkL1lvdXR1YmUgdHJhY2sgVVJMOjwvZGl2PgoJPGlucHV0IHR5cGU9InVybCIgaWQ9InRleHRfaW5wdXRfdXJsIj48L2lucHV0PgoJPGJ1dHRvbiB0eXBlPSJidXR0b24iIGlkPSJidG5fYWRkX3VybCIgb25jbGljaz0iQnRuX0FkZFRyYWNrVVJMKCkiPkFkZCB0byBQbGF5bGlzdDwvYnV0dG9uPgoJPGRpdiBpZD0ic2NfcHJldmlld19zY3JvbGwiIHN0eWxlPSJvdmVyZmxvdy15OnNjcm9sbDtwYWRkaW5nOjVweDttYXgtd2lkdGg6NjAwcHg7bWF4LWhlaWdodDo4MDBweCI+PC9kaXY+CjwvdGVtcGxhdGU+Cgo8dGVtcGxhdGUgaWQ9IlRNUF9zY19wbGF5ZXJfcGFnZSI+Cgk8ZGl2IGlkPSJ0aXRsZWJveCIgY2xhc3M9InRpdGxlYm94Ij4KCQk8c3BhbiBpZD0idGl0bGVzcGFuIj48L3NwYW4+Cgk8L2Rpdj4KCTxkaXYgY2xhc3M9Imljb25ib3giPgoJCTxpbWcgaWQ9Imljb24iIGNsYXNzPSJpY29uIiBzcmM9IiI+PC9pbWc+Cgk8L2Rpdj4KCTxkaXYgaWQ9ImNsaWVudF9wbGF5ZXJfYm94IiBjbGFzcz0iaWZyYW1lYm94Ij4KCTwvZGl2Pgo8L3RlbXBsYXRlPgoKPHRlbXBsYXRlIGlkPSJUTVBfc2NfdHJhY2tfcHJldmlldyI+Cgk8ZGl2IGlkPSJwcmV2aWV3X3Njcm9sbF8ldHJhY2slIj4KCQk8ZGl2PgoJCQk8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgaWQ9ImJ0bl9yZW1vdmVfdHJhY2siIG9uY2xpY2s9IkJ0bl9SZW1vdmVUcmFja0lEKCcldHJhY2slJykiPkRFTEVURTwvYnV0dG9uPgoJCQkldGl0bGUlCgkJPC9kaXY+CgkJPGRpdiBpZD0icHJldmlld19pZnJhbWVfJXRyYWNrJSI+PC9kaXY+Cgk8L2Rpdj4KPC90ZW1wbGF0ZT4KCjx0ZW1wbGF0ZSBpZD0iVE1QX3l0X25vdGZyYW1lIj4KCTxkaXYgaWQ9IiVpZCUiIGNsYXNzPSJ3aWRnZXQiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsiIHdpZHRoPSI1MTIiIGhlaWdodD0iMzYwIgoJc2Nyb2xsaW5nPSJubyIgZnJhbWVib3JkZXI9Im5vIgoJPjwvZGl2Pgo8L3RlbXBsYXRlPg==";
	var pagebody = "PGRpdiBpZD0ibWFpbl9ib2R5IiBjbGFzcz0ibWFpbl9ib2R5Ij4KPC9kaXY+Cg==";
	var build_date = "2025/01/02, 16:50:26";
	
	console.log("Page Injector Build Date: " + build_date);
	document.head.innerHTML = atob(pagetemplates);
	var icss = document.createElement("style");
	icss.type = "text/css";
	icss.innerText = atob(pagecss);
	document.head.appendChild(icss);
	document.body.innerHTML=atob(pagebody);
	console.log("completed injection");
	