module.exports = function (dbc, Sequelize) {
	return dbc.define('Notification', {
		// 'id': {
		// 	type: Sequelize.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true
		// },
		
		'title': {
			type: Sequelize.STRING,
			unique: true,
			validate: {
				len: [2, 40]
			}
		},
		
		'content': Sequelize.TEXT,
		
		'sendAt': Sequelize.DATE
	});
};
