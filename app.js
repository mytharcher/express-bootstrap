var express = require('express');
var rainbow = require('rainbow');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();

app.set('x-powered-by', false);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(require('./middlewares/response'));

// routes managed by rainbow
app.use(rainbow());

module.exports = app;
