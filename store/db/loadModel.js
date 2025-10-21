const fs = require('fs');
const path = require('path');

module.exports = function (db, modelsPath) {
  const models = [];

  fs.readdirSync(modelsPath)
    .filter(file => (file[0] !== '.') && (file !== 'index.js') && (file.slice(-3) === '.js'))
    .forEach(function (file) {
      const fullPath = path.join(modelsPath, file);
      // logger.log('debug', `Database table definition ${fullPath} importing...`);
      const model = require(fullPath)(db, db.Sequelize);
      models.push(model);
      // logger.log('debug', `Database table definition ${fullPath} imported.`);
    });

  models.forEach(model => {
    if (typeof model.associate === 'function') {
      model.associate(db.models);
    }
  });
};
