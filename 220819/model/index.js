const Sequelize = require("sequelize");
const config = require("../config/config.js");
const User = require("./users");
const Post = require("./posts");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;

// 이 구문이 없으면 테이블 생성 안됨
User.init(sequelize);
Post.init(sequelize);

// 관계형 맺어주는 함수 사용
User.associate(db);
// 관계형 맺어주는 함수 사용
Post.associate(db);

module.exports = db;
