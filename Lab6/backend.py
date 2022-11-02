#!/bin/env python

from flask import Flask, render_template, request, Response, redirect
import json

app = Flask(__name__)

@app.route('/')
def index():
	return redirect('/edit/')

@app.route('/edit/')
def edit():
	return render_template('edit.html')

@app.route('/view/')
def view():
	return render_template('view.html')

@app.route('/api/load/', methods=['GET'])
def load():
	try:
		with open('usertext.txt','r') as f:
			return Response(json.dumps({"status": "ok", "values": f.read().split('\n')}), status=200, mimetype='application/json');
	except Exception:
		return Response('{"status":"failed"}', status=500, mimetype='application/json');

@app.route("/api/save/", methods=['PUT'])
def save():
	try:
		with open('usertext.txt','w') as f:
			f.write('\n'.join(request.get_json()))
			return Response('{"status": "ok"}', status=200, mimetype='application/json');
	except Exception:
		return Response('{"status":"failed"}', status=500, mimetype='application/json');