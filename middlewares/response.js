const extension = {
	// 200
	data(data) {
		this.format({
			'json': () => {
				this.status(200).json(data);
			}
		});

		return this;
	},

	// 201
	created(data) {
		this.status(201).json(data);

		return this;
	},

	// 204
	ok() {
		this.sendStatus(204);

		return this;
	},

	// 205
	done() {
		this.sendStatus(205);

		return this;
	},

	// 400
	badrequest() {
		this.sendStatus(400);

		return this;
	},

	// 401
	unauthorized() {
		this.sendStatus(401);

		return this;
	},

	// 403
	forbidden() {
		this.sendStatus(403);

		return this;
	},

	// 404
	notfound() {
		this.sendStatus(404);

		return this;
	},

	// 409
	conflict() {
		this.sendStatus(409);

		return this;
	},

	// 422
	invalid(fields) {
		this.status(422);
		if (fields) {
			this.json(fields);
		}

		return this;
	},

	// 500
	error(err) {
		this.status(500).send(err || '');

		return this;
	}
};

module.exports = function (req, res, next) {
	for (var method in extension) {
		res[method] = extension[method];
	}

	next(null, req, res);
};
