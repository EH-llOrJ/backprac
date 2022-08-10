// 사용하는 모듈
// env(dotenv), fs, body-parser, nodemon, express, jsonwebtoken, express-session, session-file-store

// 설치할 모듈
// --------------------------------
// npm i express-session
// 저장된 세션의 정보를 파일로 보기위해
// npm i session-file-store
// --------------------------------

// // const express = require("express"); 와 const app = express(); 를 합쳐서 써서 아래의 코드
// const express = require("express");

const express = require("express");

// express-session 모듈 가져오고
const session = require("express-session");

// session-file-store 모듈을 가져오면서 함수 실행
const FileStore = require("session-file-store")(session);
const fs = require("fs");

const jwt = require("jsonwebtoken");

// page.js에서 내보낸 router를 받는다
const page = require("./view/page.js");
const createToken = require("./token.js");
const verify = require("./verify.js");

const app = express();

// 루트로 절대경로 설정
app.use(express.static(__dirname));

app.use(
  session({
    // 세션을 발급할 때 사용되는 키(소스코드 노출이 되지 않게)
    secret: "secret key",
    // 세션을 저장하고 , 불러올 때 다시 저장할지의 여부
    resave: false,
    // 세션에 저장할 때 초기화 여부
    saveUninitialized: true,
    // 저장소를 만들지의 여부
    // 눈으로 확인하기 위해서 세션정보 파일을 생성해주는 것
    // 사용자가 보면 안되기 때문에 개발할 때만 사용한다.
    store: new FileStore(),
  })
);

// 앞에 url이 있으면 해당 url 요청에서 사용할 것이라는 뜻
// 모든 요청에서 사용
app.use(page);
app.use(createToken);
app.use("/userView", verify);

// express session
app.listen(3000, () => {
  console.log("서버 열었음");
});
