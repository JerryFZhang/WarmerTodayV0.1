var http = require('http');
var express = require('express');
var port = 3000;

http.createServer(function(req,res){ 
    var path = req.url.replace(/\?(?:\?.*)?$/,'').toLowerCase();
    switch(path){
        case '':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello world');
            break;
        
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain'});
            res.end('About');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
            break;
    }
    
    
    
}).listen(port);

console.log('Server stared on localhost:' + port);