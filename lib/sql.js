/**
 * 数据库连接件
 */
exports.query = function () {
	var conn = require('mysql').createConnection(process.env.DATABASE_URL);
	var args = [].slice.call(arguments);
	conn.connect(function () {
		conn.query.apply(conn, args);
		conn.end();
	});
};
