var db = require('./lib/db');

var encrypt = require('./lib/util').sha1;

// db.connection.sync().success(function () {
// 	db.Account.create({
// 		username: 'duniang',
// 		password: encrypt('123456'),
// 		email: 'lvdao.product@gmail.com'
// 	}).success(function (user) {
// 		db.Notification.create({
// 			title: 'First for DuNiang.',
// 			content: 'blablabla~',
// 			sendAt: new Date()
// 		}).success(function (notification) {
// 			db.Notify.create({
// 				AccountId: user.id,
// 				NotificationId: notification.id
// 			});
// 		});
// 	});
// });


db.synchronize([
	{scope: db.connection, method: 'sync'},
	{scope: db.Account, method: 'create', args: [
		{
			username: 'firstuser',
			password: encrypt('123456'),
			email: 'firstuser@gmail.com'
		}
	]},
	{scope: db.Notification, method: 'create', args: [
		{
			title: 'First for DuNiang.',
			content: 'blablabla~',
			sendAt: new Date()
		}
	]}
], function () {
	console.log('All tasks has been done!');
}, function (err) {
	console.log(err);
});
