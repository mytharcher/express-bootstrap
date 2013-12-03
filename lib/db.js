var approot = process.env.PWD;

// import native node packages:
var fs = require('fs');
var url = require('url');

// import third-party packages:
var Sequelize = require("sequelize");

// import local app packages:
var config = require(approot + '/config');

var modelPath = approot + config.path.models;
var associations = require(approot + config.path.associations);

var dbo = url.parse(process.env.DATABASE_URL);
var dbAuth = dbo.auth.split(':');

var connection = new Sequelize(dbo.path.slice(1), dbAuth[0], dbAuth[1], {
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

/**
 * 数据库连接实例
 * @type {Sequelize}
 */
exports.connection = connection;

// 读取所有模型类并挂载到DB模块上
// 每个Service都定义一遍模型可能有性能问题！
fs.readdirSync(modelPath).forEach(function (model) {
	if (model.charAt(0) != '.') {
		var modelName = model.replace(/\.js$/i, '');
		exports[modelName] = connection['import'](modelPath + '/' + model);
	}
});

// 读取所有模型关系
associations.setup(exports);

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
