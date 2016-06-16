var express = require('express');
var app = express();
var path = require('path');

// Set the default port to localhost 3000.
app.set('port', process.env.PORT || 3000);

//// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//Set the view engine to ejs for renderring html content.

app.use(express.static(path.join(__dirname, 'public')));

// Default landing page
app.get('/', function(req, res) {
    res.render('index');
});

//Serving static content directly from public folder, will consider do the same thing for html later as well.
app.use('/static', express.static('public'));

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
    