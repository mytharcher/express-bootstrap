module.exports = function (req, res, next) {
	if (Boolean(req.session && req.session.accountId)) {
		next();
	} else {
		res.render('index');
	}
};
