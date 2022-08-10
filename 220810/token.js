// jwt, express, router

const jwt = require("jsonwebtoken");
const express = require("express");
// express 라우터 설정을 위해 express.Router() 반환값 변수에 담기
const router = express.Router();
const dot = require("dotenv");
const fs = require("fs");

dot.config();

const secretKey = process.env.SECRETKEY;

router.post("/login", (req, res) => {
  const name = "snuni";
  let token = jwt.sign(
    {
      // 타입 설정
      type: "JWT",
      name: name,
    },
    secretKey,
    {
      // 토큰의 유효 시간
      expiresIn: "5m",
      // 토큰 발급한 사람
      issuer: "huni",
    }
  );
  req.session.token = token;
  let temp = {
    msg: "토큰 발급됨",
    token,
  };
  fs.readFile("view/page2.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

// 설정한 router 내보내기
module.exports = router;
