import base64
import datetime

with open("src_injector.js", "r") as src_injector:
	injector = str(src_injector.read())
	src_injector.close()

with open("src_css.html", "r") as src_css:
	css = str(src_css.read())
	src_css.close()
 

with open("src_templates.html", "r") as src_templates:
	templates = str(src_templates.read())
	src_templates.close()
  

with open("src_body.html", "r") as src_body:
	body = str(src_body.read())
	src_body.close()
   
css = base64.b64encode(css.encode("ascii")).decode("ascii")
templates = base64.b64encode(templates.encode("ascii")).decode("ascii")
body = base64.b64encode(body.encode("ascii")).decode("ascii")

injector = injector.replace("#CSS", css).replace("#TEMP", templates).replace("#BODY", body).replace("#BUILD_DATE", datetime.datetime.now())


with open("musicplayer-injector.js", "w") as injector_js:
	injector_js.write(injector)
	injector_js.close()