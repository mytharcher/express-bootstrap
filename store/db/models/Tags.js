module.exports = function (dbc, Sequelize) {
	const Model = dbc.define('tags', {
		name: Sequelize.STRING,
		description: Sequelize.TEXT,
        color: Sequelize.STRING,
		icon: Sequelize.STRING,
		slug: Sequelize.STRING,
		usageCount: Sequelize.INTEGER,
		followerCount: Sequelize.INTEGER,
        synonyms: Sequelize.JSON,
		isOfficial: Sequelize.BOOLEAN,
		lastUsedAt: Sequelize.DATE,
		moderationStatus: Sequelize.STRING,
		group: Sequelize.STRING,
		seoTitle: Sequelize.STRING,
        seoDescription: Sequelize.TEXT,
        reviewNotes: Sequelize.TEXT,
	}, {
		underscored: true,
    });

	Model.associate = function (models) {
	};

	return Model;
};
