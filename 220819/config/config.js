const dot = require("dotenv").config();

const config = {
  dev: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "test11",
    host: "127.0.0.1", // 여기에 만약 우리가 AWS RDMS 쓰거나 지원 데이터 베이스 등등 사용한다면, 이곳에 주소를 넣어주면 된다.
    dialect: "mysql",
  },
};

module.exports = config;
