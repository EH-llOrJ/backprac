// 20220809 >> 입장 토큰만 사용해서 로그인 검증을 했는데
// Access Token만 쓴 방식은

// 1. 이용자가 로그인을 시도
// 2. 서버에서 이용자를 확인하고 입장권을 발급하는데, JWT토큰 인증정보를 payload에 할당하고 생성
// 3. 생성한 토큰을 client에 반환해주고 client가 이 토큰을 가지고 있는다.
// 4. client에서 권한을 인증 요청을 할때, 이 토큰을 같이 보낸다
// 5. 서버는 토큰을 확인하고 payload의 인코딩된 값을 decode해서 사용자의 권한을 확인(입장권이 맞는지)하고 데이터를 변환한다.
// 6. 토큰이 정상적인지 확인( ex..입장권 시간이 지났는지.. )
// 7. 날짜가 지난 토큰이면 새로 로그인 시킨다. 토큰 재발급(입장권을 새로 산다.)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Refresh Token과 같이 사용하면
// Access Token만 사용하면 인증보안에 취약할수 있고,
// 다른 사람이 악의적으로 토큰을 취득하면 토큰의 유효기간이 끝나기 전까지는 막을 수 없다.(이미 입장권 보여주고 입장함)
// Access Token의 유효기간을 짧게하고 유효기간이 짧으니까 로그인을 자주 해야하는 문제 발생
// 그래서 Refresh Token으로 해결가능하다.
// Refresh Token과 Access Token은 둘다 JWT토큰이고,
// Refresh Token은 유효기간을 길게 주고 , Access Token이 유효기간이 끝났을 때 발급해주는 역할만 한다.
// Refresh Token은 Access Token을 갱신시키기 위한 역할
// Refresh Token은 서버 DB에 저장

// 보통 Access Token을 30분 주면 , Refresh Token의 유효기간을 1일 주고
// Access Token의 유효기간이 끝나면 , Refresh Token의 유효기간을 확인하고
// Access Token을 재발급 해준다.

// Access Token과 Refresh를 둘다 이용한 방식
// 1. 이용자가 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를 payload에 할당해서 생성
//     Refresh Token도 생성해서 서버에 저장하고 두 토큰 모두 client에 반환한다.
// 3. client도 두 토큰을 저장한다.
// 4. client가 권한 인증이 필요해서 요청하면 Access Token을 전달해서 요청한다.
// 5. 서버는 전달받은 토큰을 확인하고 payload에 인코딩된 값을 디코딩해서 사용자의 권한을 확인한다.
// 6. 만약 토큰이 정상정인지 확인을 하고
// 7. 날짜가 지난 토큰이면 새로 로그인 시켜서 토큰을 발급 받게 한다.
//    (만료된 Access Token과 Refresh Token을 헤더에 실어서 서버에 보낸다)
// 8. 서버는 Access Token과 Refresh Token을 확인하고 Refresh Token이 만료되지 않았으면
//    새로운 Access Token을 발급해서 client에 전달한다.

// dotenv , express , cookie-parser , jsonwebtoken , fs

const express = require("express");
const dot = require("dotenv");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cookie = require("cookie-parser");
const { decode } = require("punycode");

dot.config();

const app = express();

// body 객체를 사용하기 위해 설정
app.use(express.urlencoded({ extended: false }));

// header에 cookie를 추가하기 위해 사용
app.use(cookie());

// 사용자 정보 객체 하나 더미
const user = {
  id: "123",
  password: "123",
};

app.get("/", (req, res) => {
  fs.readFile("view/login.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

const key1 = process.env.ACCESS_TOKEN_KEY;
const key2 = process.env.REFRESH_TOKEN_KEY;

app.post("/login", (req, res) => {
  // req.body 객체안에 있는
  // 아이디,비밀번호
  // 키값으로 받아 놓기
  const { user_id, user_pw } = req.body;
  // 아이디 비밀번호 검증
  if (user_id === user.id && user_pw === user.password) {
    // access token 발급
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      key1,
      {
        expiresIn: "5m",
      }
    );
    // refresh token 발급
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      key2,
      {
        expiresIn: "1d",
      }
    );

    // 쿠키의 이름은 "refresh" , 유효기간은 maxAge = 하루
    res.cookie("refresh", refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
    // fs에 readFile함수를 사용해서 join.html 불러온다. res의 send 함수로 응답
    fs.readFile("view/join.html", "utf-8", (err, data) => {
      res.send(accessToken + data);
    });
    // return res.send(accessToken);
  } else {
    return res.send("아이디/비밀번호 오류");
  }
});

app.post("/refresh", (req, res) => {
  // ? 뒤에 refresh 유무 확인 후 불러온다.
  if (req.cookies?.refresh) {
    const refreshtoken = req.cookies.refresh;
    // refresh token이 정상인지 확인
    jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
      // err가 있으면 refresh token이 썩었기 때문에 다시 로그인 시킨다.
      if (err) {
        res.send("로그인을 다시 해주세요");
      } else {
        // err가 없고 정상적인 토큰이면 다시 access token 발급
        // jwt에 sign 함수로 토큰 다시 생성
        const accessToken = jwt.sign(
          {
            // 토큰의 payload 값들
            id: user.id,
          },
          // 토큰을 암호화 시킬 키값
          process.env.ACCESS_TOKEN_KEY,
          {
            // 토큰의 유효기간 10분
            expiresIn: "10m",
          }
        );
        res.send(accessToken);
      }
    });
  } else {
    res.send("다시 로그인 해주세요");
  }
});

app.listen(3000, () => {
  console.log(3000, "서버 열림");
});

/*
access token을 왜 짧게 하고 새로 로그인 정보를 갱신해줄까.
해커가 악의적으로 access token을 얻었을 때 로그인이 이미 되어있는 상태라 막기 힘들어서
access token의 유효기간을 짧게하고 refresh token의 유효기간을
길게해서 사용자가 로그인을 자주 하는 불편함을 보완해준다.
그리고 악의적으로 탈취된 access token을 갱신해주는 역할도 해준다.
refresh token을 다시 확인 시켜서.
좀 더 해킹이 힘들게
*/
