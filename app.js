var express = require('express');
var rainbow = require('rainbow');
var hoganX  = require('hogan-express');
var mustlayout = require('mustlayout');

var config  = require('./config');

var startTime = new Date();

var app = express();

// 配置http请求处理中间件
app.configure(function () {
	// 所有请求记录日志
	app.use(express.logger());
	
	// 启用请求参数丰富形式的解析
	// http://expressjs.com/api.html#req.body
	app.use(express.bodyParser());
	
	// 启用cookie自动解析
	app.use(express.cookieParser());
	
	// 启用session
	app.use(express.session({
		key: config.session.key,
		secret: startTime.toString(),
		cookie: {maxAge: config.session.maxAge}
	}));
	
	// 启用gzip压缩
	app.use(express.compress());
	
	// 指明网站静态资源目录
	app.use(express['static'](__dirname + config.path.assets));
});

app.configure('development', function () {
	app.use(express.session({
		key: config.session.key,
		secret: startTime.toString(),
		cookie: {maxAge: 60000}
	}));
});

// 路由处理
rainbow.route(app, config.path);

// 模板引擎配置
mustlayout.engine(app, {
    engine: hoganX,
    ext: config.viewExt,
    views: config.path.views,
    partials: config.path.partials,
    layouts: config.path.layouts,
    cache: config.path.cache
});

var port = process.env.PORT;

app.listen(port, function() {
	console.log("Server start at %s. Listening on %d", startTime, port);
});
