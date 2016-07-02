var http = require('http'),
    port = 3000,
    fs = require('fs');

var express = require('express');

//https://github.com/soplakanets/node-forecastio
var forecastIO = require('forecastio');
var forecastio = new forecastIO('******API Goes here*****');

var path = require('path');

//http.createServer(function(req,res){ 
//    var path = req.url.replace(/\?(?:\?.*)?$/,'').toLowerCase();
//    switch(path){
//        case '':
//            res.writeHead(200, {'Content-Type': 'text/plain'});
//            res.write(html);
//            res.end('Hello world');
//            break;
//        
//        case '/about':
//            res.writeHead(200, { 'Content-Type': 'text/plain'});
//            res.end('About');
//            break;
//        default:
//            res.writeHead(404, {'Content-Type': 'text/plain'});
//            res.end('404 Not Found');
//            break;
//    }
//    
//}).listen(port);

fs.readFile('./views/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port);
});


console.log('Server stared on localhost:' + port);