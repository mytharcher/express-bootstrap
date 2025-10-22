const express = require('express');
const rainbow = require('rainbow');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { Op } = require('sequelize');


const app = express();

app.set('x-powered-by', false);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(require('./middlewares/response'));

const operatorsMap = {
	'$eq': Op.eq,
	'$ne': Op.ne,
	'$gt': Op.gt,
	'$gte': Op.gte,
	'$lt': Op.lt,
	'$lte': Op.lte,
	'$like': Op.like,
	'$iLike': Op.iLike,
	'$notLike': Op.notLike,
	'$in': Op.in,
	'$notIn': Op.notIn,
	'$between': Op.between,
	'$notBetween': Op.notBetween,
	'$and': Op.and,
	'$or': Op.or,
};

function parseFilter(filters) {
	return Object.entries(filters).reduce((acc, [key, value]) => {
		if (operatorsMap[key]) {
			acc[operatorsMap[key]] = value;
		} else {
			if (typeof value === 'object' && value !== null) {
				acc[key] = parseFilter(value);
			} else {
				acc[key] = value;
			}
		}
		return acc;
	}, {});
}

app.use((req, res, next) => {
	if (req.method === 'GET' && !req.params || !Object.keys(req.params).length) {
		return next();
	}
	const { filter, sort = 'id', page = 1, pageSize = 20 } = req.query;
	const order = [[sort.startsWith('-') ? sort.slice(1) : sort, sort.startsWith('-') ? 'DESC' : 'ASC']];
	
	res.locals.queryOptions = {
		where: filter ? parseFilter(JSON.parse(filter)) : {},
		order,
		limit: pageSize,
		offset: (page - 1) * pageSize,
	}

	next();
});

// routes managed by rainbow
app.use(rainbow());

module.exports = app;
