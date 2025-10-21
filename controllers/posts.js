const db = require('../store/db');

exports.GET = async function (req, res) {
	const posts = await db.models.posts.findAll({
		order: [['createdAt', 'DESC']],
		limit: 20,
	});
	res.json(posts);
};

exports['GET /:id'] = async function (req, res) {
	const postId = req.params.id;
	const post = await db.models.posts.findByPk(postId);
	if (post) {
		res.json(post);
	} else {
		res.status(404).json({ error: 'Post not found' });
	}
};

exports.POST = async function (req, res) {
	const post = await db.models.posts.create(req.body);
	res.status(201).json(post);
};
