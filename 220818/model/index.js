const Sequelize = require("sequelize");
const config = require("../config.js");
const User = require("./users.js");

const sequelize = new Sequelize(
  config.dev2.database,
  config.dev2.username,
  config.dev2.password,
  config.dev2
);

const db = {};

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;
