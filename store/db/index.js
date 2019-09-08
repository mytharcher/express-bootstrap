var fs = require('fs');
var path = require('path');

require('dotenv').config();

var Sequelize = require('sequelize');

var rc = require('../../.sequelizerc');
var options = require('./options');

var db = new Sequelize(process.env.DATABASE_URL, options);

console.debug('Database configuration initialized.')

fs.readdirSync(path.join(process.env.PWD, rc['models-path'])).forEach(function (file) {
	if (!file.startsWith('.')) {
		db['import'](file);

		console.debug(`SQL table definition ${file} imported.`);
	}
});

module.exports = db;
