module.exports = function (dbc, Sequelize) {
	const Model = dbc.define('comments', {
		content: Sequelize.TEXT,
		authorName: Sequelize.STRING,
		authorEmail: Sequelize.STRING,
		authorUrl: Sequelize.STRING,
		ipAddress: Sequelize.STRING,
		userAgent: Sequelize.STRING,
		status: Sequelize.STRING,
		likeCount: Sequelize.INTEGER,
		dislikeCount: Sequelize.INTEGER,
		rating: Sequelize.DOUBLE,
		isApproved: Sequelize.BOOLEAN,
		isFeatured: Sequelize.BOOLEAN,
		isSticky: Sequelize.BOOLEAN,
		path: Sequelize.STRING,
		postId: Sequelize.INTEGER,
		parentId: Sequelize.INTEGER,
	}, {
		underscored: true,
	});

	Model.associate = function (models) {
		Model.belongsTo(models.posts, {
			foreignKey: 'postId',
			as: 'post',
		});

		Model.belongsTo(Model, {
			foreignKey: 'parentId',
			as: 'parent',
		});
		Model.hasMany(Model, {
			foreignKey: 'parentId',
			as: 'children',
		});
	};

	return Model;
};
