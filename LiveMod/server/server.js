var http = require('http');

function handleRequest(request, response){
	console.log(request);
	response.end('It Works ! URL Visited: ' + request.url);
}

var server = http.createServer(handleRequest);

server.listen(8000, function(){
	console.log("Server listening on: http://localhost:8000");
});
