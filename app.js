var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/about', function (req, res) {
 res.render('about', {
  title: 'About'
 }); 
});

app.get('/contact', function (req, res) {
 res.render('contact', {
  title: 'Contact'
 }); 
});
app.get('/work', function (req, res) {
 res.render('work', {
  title: 'Work'
 }); 
});


app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  'use strict';
  console.log('Express server listening on port ' + app.get('port'));
});