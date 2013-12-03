var approot = process.env.PWD;

var Response = require(approot + '/lib/Response');

exports = module.exports = function (req, res, next) {
	console.log('processing authorization...');
	var session = req.session;
	if (session.accountId) {
		console.log('user(%d) in session', session.accoutId);
		next();
	} else {
		console.log('out of session');
		
		Response(res).forbidden();
	}
};
