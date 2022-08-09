const app = require("express")();
// express-session 모듈 가져오고
const session = require("express-session");
// session-file-store모듈을 가져오면서 함수 실행
const FileStore = require("session-file-store")();

/*
설치할 모듈
npm init -y로 시작
npm i express-session
저장된 세션의 정보를 파일로 보기 위해
npm i session-file-store
*/

app.listen(3000, () => {
  console.log("열림");
});
