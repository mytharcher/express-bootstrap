require('dotenv').config();

var app = require('./app');

var port = process.env.PORT;
var startTime = new Date();

app.listen(port, function() {
	console.log("Server start at %s. Listening on %d", startTime, port);
});
