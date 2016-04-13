var xml = require('xml');

var extension = {
	// 200
	data: function (data) {
		var res = this;
		this.format({
			'json': function () {
				res.status(200).json(data);
			},
			'xml': function () {
				var xml = require('xml');
				
				res.status(200).send(xml(data));
			}
		});
	},

	// 201
	created: function (data) {
		this.status(201).json(data);
	},

	// 204
	ok: function () {
		this.sendStatus(204);
	},

	// 205
	done: function () {
		this.sendStatus(205);
	},

	// 400
	badrequest: function () {
		this.sendStatus(400);
	},

	// 403
	forbidden: function () {
		this.sendStatus(403);
	},

	// 404
	notfound: function () {
		this.sendStatus(404);
	},

	// 409
	conflict: function () {
		this.sendStatus(409);
	},

	// 422
	invalid: function (fields) {
		this.status(422);
		if (fields) {
			this.json(fields);
		}
	},

	// 500
	error: function (err) {
		this.status(500).send(err || '');
	},

	// for wechat text message reply
	wechatReply: function (data) {
		this.set('Content-Type', 'text/xml');
		this.send(xml({
			xml: [
				{
					FromUserName: {_cdata: data.from}
				},
				{
					ToUserName: {_cdata: data.to}
				},
				{
					CreateTime: Date.now()
				},
				{
					MsgType: {_cdata: 'text'}
				},
				{
					Content: {_cdata: data.message}
				}
			]
		}));
	}
};

module.exports = function (req, res, next) {
	for (var method in extension) {
		res[method] = extension[method];
	}

	next(null, req, res);
};
