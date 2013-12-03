var approot = process.env.PWD;

var path = require('path');

var glob = require('glob');

var config  = require(approot + '/config');

var partialsPath = path.join(approot, config.path.views, config.path.partials);
var RE = new RegExp('^' + partialsPath + '/|\\.' + config.viewExt + '$', 'g');

glob.sync(partialsPath + '/**/*.' + config.viewExt).forEach(function (file) {
	var partPath = file.replace(RE, '');
	exports[partPath] = file;
});
