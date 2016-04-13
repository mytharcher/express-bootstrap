#!/usr/bin/env node

var db = require('../store/postgres');

db.sync().then(function (result) {
	console.log('resolved');
	// console.log(result);
	process.exit(0);
}, function (reason) {
	console.log('rejected');
	console.log(reason);
	process.exit(1);
});
