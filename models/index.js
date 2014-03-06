var approot = process.env.PWD;

var url = require('url');
var fs = require('fs');

var Sequelize = require("sequelize");

if (!global.hasOwnProperty('model')) {
	var dbo = url.parse(process.env.DATABASE_URL);
	var dbAuth = dbo.auth.split(':');

	var db = new Sequelize(dbo.path.slice(1), dbAuth[0], dbAuth.length > 1 ? dbAuth[1] : '', {
		host: dbo.hostname,
		
		// 定义数据模型时的默认参数
		define: {
			// don't add the timestamp attributes (updatedAt, createdAt)
			timestamps: false,
			
			// disable the modification of tablenames; By default, sequelize will automatically
			// transform all passed model names (first parameter of define) into plural.
			// if you don't want that, set the following
			freezeTableName: true
		}
	});

	global.model = {
		Sequelize: Sequelize,
		db: db
	};

	fs.readdirSync(__dirname).forEach(function (model) {
		if (model.charAt(0) != '.' && model != 'index.js') {
			var modelName = model.replace(/\.js$/i, '');
			global.model[modelName] = db['import'](__dirname + '/' + model);
		}
	});

	// 定义关联关系
	model.Notification.hasMany(model.Notify);
	model.Account.hasMany(model.Notify);
}

module.exports = global.model;

/**
 * 数据库操作同步队列
 * 
 * 为减少异步闭包函数定制此队列函数
 */
exports.synchronize = (function () {
	
	var nextId = 0;
	var tasks = {};
	
	function guid() {
		return 'T' + nextId++;
	}
	
	function next() {
		this.running = false;
		start();
	}
	
	function interrupt(err) {
		this.failure(err);
		delete tasks[this.id];
	}
	
	function start() {
		
		for (var i in tasks) {
			var task = tasks[i];
			if (task.running) {
				continue;
			}
			
			task.running = true;
			var successHandler = next.bind(task);
			var errorHandler = interrupt.bind(task);
		
			var todo = task.queue;
			if (todo.length) {
				todo = todo.shift();
				todo.scope[todo.method].apply(todo.scope, todo.args || [])
					.success(successHandler)
					.error(errorHandler);
			} else {
				task.success();
				task = null;
				delete tasks[i];
			}
		}
	}
	
	return function (queue, success, failure) {
		var syncId = guid();
		
		var task = tasks[syncId] = {
			id: syncId,
			queue: queue,
			success: success || new Function(),
			failure: failure || new Function(),
			running: false
		};
		
		start();
	};
})();

