// 암호화 시킨 JWT 토큰을 decode하여 보여주는 함수 생성

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const dot = require("dotenv");

dot.config();

// app.js에서 user() 함수로 요청 url을 설정해서
// /userView url 부터 시작
router.post("/", (req, res) => {
  // express session에서 token 가져와서 변수에 담고
  const token = req.session.token;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("정상적이지 않은 토큰입니다.");
    }
    // 해석된 객체 decoded
    console.log(decoded);
    res.send(decoded);
  });
});

module.exports = router;
