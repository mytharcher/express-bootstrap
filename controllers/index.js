exports.get = function (req, res) {
	res.render('home');
};

exports.get.filters = ['guest'];

exports.put = function (req, res) {
	// console.log('=====>', req.accepts('octet-stream'));
	res.ok();
};
