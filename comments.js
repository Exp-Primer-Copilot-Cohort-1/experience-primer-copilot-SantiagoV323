//create web server
var http = require('http');
//create url parser
var url = require('url');
//create querystring parser
var querystring = require('querystring');
//create file system
var fs = require('fs');
//create path
var path = require('path');
//create mime type
var mime = require('mime');
//create cache
var cache = {};

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) { //check if file is cached in memory
		sendFile(response, absPath, cache[absPath]); //serve file from memory
	} else {
		fs.exists(absPath, function(exists) { //check if file exists
			if (exists) {
				fs.readFile(absPath, function(err, data) { //read file from disk
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data; //cache file in memory
						sendFile(response, absPath, data); //serve file read from disk
					}
				});
			} else {
				send404(response); //send 404 response
			}
		});
	}
}

//create HTTP server
var server = http.createServer(function(request, response) {
	var filePath = false;
	
	if (request.url == '/') {
		filePath = 'public/index.html'; //determine HTML file to be served by default
	} else {
		filePath = 'public' + request.url; //translate URL path to relative file path
	}
	var absPath = './' + filePath;
	serveStatic(response, cache, absPath); //serve static file
});

server.listen(3000, function() {
	console.log("Server listening on port 3000.");
});

//create socket.io server
var chatServer = require('./lib/chat_server');
chatServer.listen(server);