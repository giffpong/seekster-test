const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const pg = require('pg');
delete pg.native;
let db = {};

const connect = async () => {
  const user = 'xcpvslwrzebxxs';
  const password = 'cb2d7956f77f97d697ec9626907473c26062db9d4ece72e4b6587d12ede21e79';
  const host = 'ec2-52-71-153-228.compute-1.amazonaws.com';
  let sequelize = new Sequelize('d2okstbgvp3th', user, password, {
    dialect: 'postgres',
    host: host,
    port: 5432,
    logging: false,
    dialectOptions: {
      useUTC: true, //for reading from database
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 150,
      min: 0,
      acquire: 60000,
      idle: 900000,
    },
    operatorsAliases: '0',
  });

  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    /* istanbul ignore next */
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
};

module.exports = connect();
