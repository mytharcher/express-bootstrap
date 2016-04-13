module.exports = function (dbc, Sequelize) {
	return dbc.define('Notify', {
		'readAt': {
			type: Sequelize.DATE,
			allowNull: true
		}
	});
};
