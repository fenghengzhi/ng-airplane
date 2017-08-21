#qpy:webapp:Hello Qpython
#qpy://127.0.0.1:8080/
"""
This is a sample for qpython webapp
"""

from bottle import Bottle, ServerAdapter
from bottle import run, debug, route, error, static_file, template, request, response
import requests
import os
os.chdir(os.path.dirname(__file__))
######### QPYTHON WEB SERVER ###############

class MyWSGIRefServer(ServerAdapter):
    server = None

    def run(self, handler):
        from wsgiref.simple_server import make_server, WSGIRequestHandler
        if self.quiet:
            class QuietHandler(WSGIRequestHandler):
                def log_request(*args, **kw): pass
            self.options['handler_class'] = QuietHandler
        self.server = make_server(self.host, self.port, handler, **self.options)
        self.server.serve_forever()

    def stop(self):
        #sys.stderr.close()
        import threading
        threading.Thread(target=self.server.shutdown).start()
        #self.server.shutdown()
        self.server.server_close() #<--- alternative but causes bad fd exception
        print("# qpyhttpd stop")


######### BUILT-IN ROUTERS ###############

@route('/proxy')
def proxy():
    url = request.query.url
    return requests.get(url).text

@route('/proxy1/<url:path>')
def proxy1(url):
    headers={};
    for key in request.headers:
        if key!='Host' and key!='Connection' and key!='Referer':
            #print(key)
            #print(request.headers[key])
            headers[key]=request.headers[key]
            #print(key)
        print(key,request.headers[key])
        if key=='Referer':
            headers['Referer']=(request.headers['Referer']).replace('://localhost:8080/proxy1/','://')
    headers['Host']=(url.split('/'))[0]
    print(headers)
    response1=requests.get('http://'+url,headers=headers,allow_redirects=False)
    result = response1.text
    print(response1.headers)
    print(response1.status_code)
    response.status=response1.status_code
    for key in response1.headers:
        if key!='Server'and key!='Date'and key!='Connection'and key!='Content-Encoding'and key!='Access-Control-Allow-Origin'and key!='Transfer-Encoding'and key!='Content-Language':
            #content-language
            #print(key)
            #print(response1.headers[key])
            response.set_header(key,response1.headers[key])
            #print(key)
    return result.replace('href="/','href="/proxy1/'+(url.split('/'))[0]+'/').replace('href="http://','href="/proxy1/')

@route('/__exit', method=['GET','HEAD'])
def __exit():
    global server
    server.stop()

@route('/__ping')
def __ping():
    return "ok"


@route('/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./')

appurl='http://localhost:8080/manga_ng/index.html'
######### WEBAPP ROUTERS ###############
@route('/')
def home():
    return '<html><body><script>milib.openUrl("'+appurl+'")</script></body></html>'


######### WEBAPP ROUTERS ###############
app = Bottle()
app.route('/', method='GET')(home)
app.route('/__exit', method=['GET','HEAD'])(__exit)
app.route('/__ping', method=['GET','HEAD'])(__ping)
app.route('/proxy', method='GET')(proxy)
app.route('/proxy1/<url:path>', method='GET')(proxy1)
app.route('/<filepath:path>', method='GET')(server_static)

import webbrowser
try:
    server = MyWSGIRefServer(host="0.0.0.0", port="8080")
    webbrowser.open_new(appurl)
    app.run(server=server,reloader=False)
except (Exception) as ex:
    print("Exception: %s" % repr(ex))
