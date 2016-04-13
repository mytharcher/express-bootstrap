var fs = require('fs');
var path = require('path');

var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL, {
	// default options for table definition
	define: {
		// don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,
		
		// disable the modification of tablenames; By default, sequelize will automatically
		// transform all passed model names (first parameter of define) into plural.
		// if you don't want that, set the following
		freezeTableName: true
	}
});

console.log('Postgresql database configuration initialized.')

fs.readdirSync(__dirname).forEach(function (file) {
	if (file.charAt(0) != '.' && file != __filename.replace(__dirname + path.sep, '')) {
		db['import'](file);

		console.log(`SQL table definition ${file} imported.`);
	}
});

// db.models.Oauth.belongsTo(db.models.User);

module.exports = db;
