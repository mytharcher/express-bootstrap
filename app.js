var express = require('express');
var hoganX  = require('hogan-express');
var rainbow = require('rainbow');

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

	// 路由处理
	rainbow.route(app, config.path);
	
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

// 配置模板引擎
app.engine(config.viewExt, hoganX);
app.set('view engine', config.viewExt);
app.set('views', __dirname + config.path.views);
app.set('partials', require('./lib/partials'));
app.set('layout', 'layouts/page');

var port = process.env.PORT;

app.listen(port, function() {
	console.log("Server start at %s. Listening on %d", startTime, port);
});
