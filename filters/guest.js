var approot = process.env.PWD;

var Util = require(approot + '/services/Util');
var Response = require(approot + '/lib/Response');

module.exports = function (req, res, next) {
	if (Util.isIDLoginedSync(req)) {
		next();
	} else {
		Response(res).render('index');
	}
};
