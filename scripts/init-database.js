#!/usr/bin/env node

var db = require('../store/postgres');

if (process.env.NODE_ENV === 'production') {
  console.error('This script is forbidden to run in production.');
  return process.exit(1);
}

db.sync({
	force: true
}).then(function (result) {
	console.log('resolved');
	// console.log(result);
	process.exit(0);
}, function (reason) {
	console.log('rejected');
	console.log(reason);
	process.exit(1);
});
