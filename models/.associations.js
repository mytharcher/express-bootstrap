exports.setup = function (db) {
	// 消息关联表
	db.Notification.hasMany(db.Notify);
	db.Account.hasMany(db.Notify);
	
};
