var express = require('express');

//https://github.com/soplakanets/node-forecastio
var forecaseIO = require('forecastio');
var forecaseio = new forecaseIO('**********API KEY*************');

var app = express();
var path = require('path');

// Set the default port to localhost 3000.
app.set('port', process.env.PORT || 3000);

//// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //Set the view engine to ejs for renderring html content.

app.use(express.static(path.join(__dirname, 'public')));

// Default landing page
app.get('/', function (req, res) {
    res.render('index');
});

// Serving weather data at the moment using current location.
app.get('/current', function (req, res) {
    forecastio.forecast('51.506', '-0.127').then(function (data) {
        var weatherInfo = data,
            requestedLatitude = data.latitude,
            requestedLongitude = data.longitude,
            currentSummary = data.currently.summary;
        console.log(weatherInfo);
        console.log('******');
        console.log(currentSummary);
    res.send(data);
    });
    
});

// serving historical data
app.get('/old', function (req, res) {
    forecastio.timeMachine('51.506', '-0.127', '2008-01-01T00:00:01Z').then(function (data) {
        res.send(JSON.stringify(data, null, 2));
    });

})

//Serving static content directly from public folder, will consider do the same thing for html later as well.
app.use('/static', express.static('public'));

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