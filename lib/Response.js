var Response = function (res) {
	if (!(this instanceof Response)) {
		return new Response(res);
	}
	
	this.res = res;
};

// 200
Response.prototype.data = function (data) {
	this.res.json(data);
};

// 201
Response.prototype.created = function (data) {
	this.res.json(201, data);
};

// 204
Response.prototype.ok = function () {
	this.res.send(204);
};

// 205
Response.prototype.done = function () {
	this.res.send(205);
};

// 400
Response.prototype.badrequest = function () {
	this.res.send(400, '');
};

// 403
Response.prototype.forbidden = function () {
	this.res.send(403, '');
};

// 404
Response.prototype.notfound = function () {
	this.res.send(404, '');
};

// 409
Response.prototype.conflict = function () {
	this.res.send(409, '');
};

// 422
Response.prototype.invalid = function (fields) {
	fields ? this.res.json(422, fields) :
		this.res.send(422, '');
};

// 500
Response.prototype.error = function (err) {
	this.res.send(500, err || '');
};

Response.prototype.render = function (path, locals) {
	var locClass = path.replace(/\//g, '-');
	locals = locals || {};
	locals.location = locClass;
	this.res.render.call(this.res, path, locals);
};

module.exports = Response;
