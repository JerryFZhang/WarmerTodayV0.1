var express = require('express');

//https://github.com/soplakanets/node-forecastio
var forecaseIO = require('forecastio');
var forecaseio = new forecaseIO('**********API KEY*************');

var app = express();
var path = require('path');
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var locationFile  = './public/json/data.json';
var now = new Date();

//Parsing date object using different ways.
console.log(now);
console.log(Date.parse(now));
console.log(now.toUTCString());
console.log(now.toDateString());
console.log(now.toTimeString());
console.log(now.toLocaleTimeString());
console.log(now.toLocaleDateString());
console.log(now.toISOString());
console.log(Date.parse(now.toISOString()));

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
app.get('/current', function (req, res) {
    var currentLocation = jsonfile.readFileSync(locationFile);
    forecastio.forecast(currentLocation.lat, currentLocation.lng).then(function (data) {
        var weatherInfo = data;
        var weatherInfoStringify = JSON.stringify(data);
        res.send(weatherInfoStringify);
    });
});

// serving historical data
app.get('/old', function (req, res) {
    var currentLocation = jsonfile.readFileSync(locationFile);
    // The time could be like this. 
    //'2008-01-01T00:00:01Z'
    forecastio.timeMachine(currentLocation.lat, currentLocation.lng, timeObjectWsantDefinedDoNotUse).then(function (data) {
        res.send(JSON.stringify(data, null, 2));
    });

});

// Pass location information to backed and stored it in global variable
app.post('/position', function(req, res){
    var current = req.body;
    
    jsonfile.writeFile(locationFile, current, function (err) {
    console.error(err);
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