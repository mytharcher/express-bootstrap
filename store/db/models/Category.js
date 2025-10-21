module.exports = function (dbc, Sequelize) {
	const Model = dbc.define('categories', {
		title: Sequelize.STRING,
		subTitle: Sequelize.STRING,
		description: Sequelize.TEXT,
		slug: Sequelize.STRING,
        sort: Sequelize.INTEGER,
		coverImageUrl: Sequelize.STRING,
		url: Sequelize.STRING,
		followerCount: Sequelize.INTEGER,
		articleCount: Sequelize.INTEGER,
		themeColor: Sequelize.STRING,
		icon: Sequelize.STRING,
		hidden: Sequelize.BOOLEAN,
		lastPostedAt: Sequelize.DATE,
        allowComments: Sequelize.BOOLEAN,
	}, {
		underscored: true,
    });

	Model.associate = function (models) {
		Model.belongsTo(Model, {
			foreignKey: 'parentId',
			as: 'parent',
		});
		Model.hasMany(Model, {
			foreignKey: 'parentId',
			as: 'children',
		});
		Model.hasMany(models.posts, {
			foreignKey: 'categoryId',
			as: 'posts',
		});
	};

	return Model;
};
