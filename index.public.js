var http = require('http'),
    port = 3000,
    fs = require('fs');

var express = require('express');

//https://github.com/soplakanets/node-forecastio
var forecastIO = require('forecastio');
var forecastio = new forecastIO('******API Goes here*****');

var path = require('path');

http.createServer(function(req,res){ 
    var path = req.url.replace(/\?(?:\?.*)?$/,'').toLowerCase();
    switch(path){
        case '/':
            fs.readFile('index.html', function(err,data){
                if (err) {
                    throw err;
                    console.log(err);
                }
                res.writeHead(
                    200,
                    {'Content-Type': 'text/html',
                    'Content-Length':data.length}
                );
                res.write(data);
                res.end();
            });
            break;
        
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain'});
            res.end('About');
            break;
            
        case 'position':
        default:
            console.error('Not Found');
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
            break;
    }
    
}).listen(port);
console.log('Server stared on localhost:' + port);