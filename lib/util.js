var crypto = require('crypto');

exports.sha1 = function (str) {
	return crypto.createHash('sha1').update(str).digest('hex');
};

exports.getHost = function (req) {
	var port = process.env.PORT;
	return req.host + (port == 80 ? '' : ':' + port);
};
