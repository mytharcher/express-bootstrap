module.exports = function (dbc, Sequelize) {
	const Model = dbc.define('posts', {
		title: Sequelize.STRING,
		subTitle: Sequelize.STRING,
		content: Sequelize.TEXT,
		excerpt: Sequelize.STRING,
		slug: Sequelize.STRING,
		coverImage: Sequelize.STRING,
		musicUrl: Sequelize.STRING,
		status: Sequelize.STRING,
		allowComments: Sequelize.BOOLEAN,
		featured: Sequelize.BOOLEAN,
		publishedAt: Sequelize.DATE,
		viewCount: Sequelize.INTEGER,
		read: Sequelize.INTEGER,
		score: Sequelize.DOUBLE,
	}, {
		underscored: true,
	});

	Model.associate = function (models) {
		Model.belongsTo(models.categories, {
			foreignKey: 'categoryId',
			as: 'category',
		});

		Model.belongsToMany(models.tags, {
            through: 'post_tags',
            foreignKey: 'postId',
			otherKey: 'tagId',
			as: 'tags',
		});
	};

	return Model;
};
