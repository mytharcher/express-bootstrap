var express = require('express');
var rainbow = require('rainbow');
var hoganX  = require('hogan-express');
var mustlayout = require('mustlayout');

var config  = require('./config');

var startTime = new Date();

var app = express();

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
