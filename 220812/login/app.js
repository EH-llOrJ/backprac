/*
로그인 만들어보자

packjson 생성
npm init -y

express, dotenv, fs, jsonwebtoken, express-session, mysql2
개발용으로 nodemon

경환이가 알려주는 방법 더 좋고 편함
npm i ejs
== fs에 관한 것들
*/

// express 모듈 가져오기
const express = require("express");
// .env파일을 사용하기 위해 모듈 가져오면서 설정
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mysql = require("mysql2");
const ejs = require("ejs");
const app = express();
const PORT = 3000;

// app.use(express.static('cssandejs')); 선언해줘야지 폴더 경로를 인식함
app.use(express.urlencoded({ extended: false })); // req.body 객체를 사용할 것이기 때문에 express 12버전쯤인가 버전업 되면서 express 설정으로 body 객체를 사용하게 설정할 수 있다.
app.use(
  session({
    // 세션 발급할 때 사용되는 키
    // 노출되면 안되니까 .env파일에 값을 저장해놓고 사용 process.env.SESSION_KEY
    secret: process.env.SESSION_KEY,
    // 세션을 저장하고 불러올 때 세션을 다시 저장할지 여부
    resave: false,
    // 세션에 저장할 때 초기화 여부를 설정
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.set("views", "./views"); // 백에서 프론트를 가져오기 위함

// mysql 로컬 데이터 베이스 연결
// mysql createConnection 함수를 이용해서 연결 및 생성
const client = mysql.createConnection({
  // 데이터 베이스 계정의 이름
  user: "root",
  // root 계정의 비밀번호
  password: "xogns",
  // 연결할 데이터 베이스의 이름
  database: "test7",
  // multipleStatements 다중 쿼리문을 사용 할 수 있도록 하는 옵션
  multipleStatements: true,
});

app.get("/", (req, res) => {
  //   res.render("main");
  res.render("login");
});

app.get("/join", (req, res) => {
  res.render("join");
});

// app.get("/", (req, res) => {
//   fs.readFile("views/login.html", "utf-8", (err, data) => {
//     res.send(data);
//   });
// });

// const sql =
// // id는 AUTO_INCREMENT PRIMARY KEY 컬럼 값을 추가하지 않아도 자동으로 증가하는 숫자
// // user_id 이름으로 컬럼을 만들고 VARCCHAR(255)문자 255자까지 허용
//   "create table users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), password VARCHAR(255), refresh VARCHAR(255))";
// //client 객체 안의 query 함수로 쿼리문 실행
// client.query();

app.post("/join", (req, res) => {
  //req.body 객체에 있는 키값으로 변수에 할당
  //req.body.userId가 userId에 담긴다.
  //req.body.password도 password에 담긴다.
  // {요 안에 키값} 객체 구문으로 묶어서 변수를 받으면 해당 객체의 키값의 밸류를 받을 수 있다.
  const { userId, password } = req.body;
  const sql = "INSERT INTO users (user_id, password) VALUES(?,?)";
  //   console.log(req.body);
  // VALUES(?,?)값의 밸류는 옵션으로 전달한다.
  client.query(sql, [userId, password], () => {
    // redirect 함수로 매개변수 url 해당 경로로 페이지를 이동시켜준다.
    res.redirect("/");
    // res.send("회원가입");
  });
});

app.post("/login", (req, res) => {
  const { userId, password } = req.body;
  res.send(userId + password);
});

app.listen(PORT, () => {
  console.log("서버 열림");
});
