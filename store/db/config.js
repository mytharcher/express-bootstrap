require('dotenv').config();

const options = require('./options');

module.exports = {
	use_env_variable: 'DATABASE_URL',
	seederStorage: 'json',
	seederStoragePath: 'store/db/seedData.json',
	options
};
