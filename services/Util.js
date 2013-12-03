

/**
 * 判断用户是否在登录状态
 * @return {Boolean}
 */
exports.isIDLoginedSync = function (req) {
	var session = req.session;
	return Boolean(session && session.accountId);
};