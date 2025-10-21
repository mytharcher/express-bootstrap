var fs = require('fs');
var path = require('path');

require('dotenv').config();

var Sequelize = require('sequelize');

const loadModel = require('./loadModel');
var options = require('./options');

var db = new Sequelize(process.env.DATABASE_URL, options);

loadModel(db, path.join(__dirname, './models'));

module.exports = db;
