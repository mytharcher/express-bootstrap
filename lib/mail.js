var nodemailer = require('nodemailer');

var mailConfig = process.env.SYSTEM_MAIL;
var splitIndex = mailConfig.indexOf(':');
var auth = {
	user: mailConfig.substr(0, splitIndex),
	pass: mailConfig.slice(splitIndex + 1)
};


exports.send = function (options, callback) {
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: auth
	});
	
	smtpTransport.sendMail(options, function (err, res) {
		if (err) {
			console.log(err);
		}
		callback && callback(err, res);
		smtpTransport.close();
	});
};
