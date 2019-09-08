module.exports = function (dbc, Sequelize) {
	return dbc.define('Account', {
		'username': {
			type: Sequelize.STRING,
			unique: true,
			validate: {
				is: ['\\w[\\w\\.-]*\\w', 'i'],
				notNull: true,
				len: [2, 40]
			}
		},
		
		'password': {
			type: Sequelize.STRING,
			validate: {
				notNull: true,
				len: [6, 40]
			}
		},
		
		'email': {
			type: Sequelize.STRING,
			unique: true,
			validate: {
				isEmail: true,
				notNull: true,
				len: [6, 80]
			}
		}
	});
};
