module.exports = function(req, res, next) {
	if (!req.is('text/plain')) {
		return next();
	}
	req.body = '';
	req.on('data', function(data) {
		return req.body += data;
	});
	return req.on('end', next);
};