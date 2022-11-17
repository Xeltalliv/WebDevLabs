#!/bin/env python

import http.server
import socketserver

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
	def do_PUT(self):
		if self.path == '/stored/settings.json':
			file_length = int(self.headers['Content-Length'])
			with open('stored/settings.json', 'wb') as output_file:
				output_file.write(self.rfile.read(file_length))
			self.send_response(200)
			self.send_header('Content-Type', 'application/json')
			self.end_headers()
			self.wfile.write(bytes('{"status":"ok"}', 'utf-8'))
		else:
			self.send_response(403)
			self.send_header("Content-type", "text/html")
			self.end_headers()
			self.wfile.write(bytes("<h1>Error 403</h1><br>You shouldn't access those files", "utf8"))

	def do_GET(self):
		allowed = False
		if self.path == '/canvas':
			self.path = '/html/view_on_canvas.html'
			allowed = True
		if self.path == '/css':
			self.path = '/html/view_on_css.html'
			allowed = True
		if self.path == '/admin':
			self.path = '/html/admin.html'
			allowed = True
		if self.path[0:4] == '/js/' or self.path[0:5] == '/css/' or self.path[0:8] == '/stored/' or self.path[0:8] == '/images/':
			allowed = True
		
		if allowed:
			return http.server.SimpleHTTPRequestHandler.do_GET(self)
		else:
			self.send_response(403)
			self.send_header("Content-type", "text/html")
			self.end_headers()
			self.wfile.write(bytes("<h1>Error 403</h1><br>You shouldn't access those files", "utf8"))


handler = MyHTTPRequestHandler
PORT = 8000

with socketserver.TCPServer(("", PORT), handler) as httpd:
	print("Server started at localhost:" + str(PORT))
	httpd.serve_forever()