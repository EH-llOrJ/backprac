const dot = require("dotenv").config();

const config = {
  dev: {
    // 사용자 이름
    user: "root",
    // 연결할 DB명
    password: process.env.DB_PASSWORD,
    database: "test9",
    // 다중 쿼리문 사용 속성
    multipleStatements: true,
  },
  dev2: {
    // 사용자 이름
    username: "root",
    // 연결할 DB명
    password: process.env.DB_PASSWORD,
    database: "test10",
    // 호스트 주소
    host: "127.0.0.1",
    // 사용하는 데이터베이스
    dialect: "mysql",
  },
};

module.exports = config;
