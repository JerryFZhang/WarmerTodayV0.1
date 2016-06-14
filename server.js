var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 3000);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//Set the view engine to ejs for renderring html content.

// Default landing page
app.get('/', function(req, res) {
    res.send('Welcome');
});


// Custom 404 page.
app.use(function (req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found'); 
});

// Custom 500 page.
app.use(function (err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');    
});

// Start the server
app.listen(app.get('port'), function(){
    console.log('Express started.');
});
    