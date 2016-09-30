var express = require('express');

//https://github.com/soplakanets/node-forecastio
var forecaseIO = require('forecastio');
var forecaseio = new forecaseIO('**********API KEY*************');

var app = express();
var path = require('path');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
//var locationFile  = './public/json/data.json';


// Set the default port to localhost 3000.
app.set('port', process.env.PORT || 3000);

// View engine setup
app.set('views', path.join(__dirname, 'views'));

// Parsing coming JSON object
app.use(bodyParser()); 

// Serving all public content only from ./public
app.use(express.static(path.join(__dirname, 'public')));

// Default landing page
app.get('/', function (req, res) {
    res.render('index');
});

// Serving weather data at the moment using current location.
app.post('/current', function (req, res) {
    var now = new Date();
    var requestedTime = now.toISOString().substr(0,19)+'Z';
    //Fetching and parsing weather information
    getWeather(req, requestedTime, function (returned){
        res.send(JSON.stringify(returned, null, 2));
    });
});

// serving historical data
app.post('/old', function (req, res) {
    

    // Parsing date
    var now = new Date();
    var yesterday = new Date();
    yesterday.setDate(now.getDate()-1);
    var requestedTime = yesterday.toISOString().substr(0,19)+'Z';
    
    //Fetching and parsing weather information
    getWeather(req, requestedTime, function (returned){
        res.send(JSON.stringify(returned, null, 2));
    });
    
});

// Custom 404 page.
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// Custom 500 page.
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

// Start the server
app.listen(app.get('port'), function () {
    console.log('Express started.');
});

function parseHourlyData(data){
   var temp = [];    
    for (var i = 0; i < data.length; i++) {
    temp[i] = data[i].temperature;    
    }
    return temp;
}

function getWeather(location, time, callback){
    var data = forecastio.timeMachine(location.body.lat, location.body.lng, time).then(function (weather) {
        callback(weather);
    });
}


