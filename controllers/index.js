var approot = process.env.PWD;

var Response = require(approot + '/lib/Response');

exports.get = function (req, res) {
	Response(res).render('home');
};

exports.get.filters = ['guest'];

exports.put = function (req, res) {
	console.log('=====>', req.accepts('octet-stream'));
	Response(res).ok();
};
