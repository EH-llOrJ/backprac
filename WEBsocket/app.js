/*
웹소켓과 클라이언트가 양방향 통신할 수 있게 도와주는 소켓io
socket.io는 왜 쓰고 무엇일까
실시간 웹을 위한 자바스크립트 라이브러리
웹 클라이언트와 서버간의 실시간 양방향 통신을 가능하게 해주는
node.js 모듈

가상화폐 거래소 같은 데이터 전송이 많은 경우 빠르고 비용이 싸게
표준 웹소켓을 사용하는게 좋다.

실제 업비트나 바이낸스 소켓 API를 사용하면
데이터가 정말 많이 들어온다.

socket.io는 웹소켓 프로토콜을 지원해주는 네트워킹 라이브러리
비동기 이벤트 방식으로 실시간으로 간단하게 데이터를 요청하고 받을 수 있다.

예를 들어 웹에 고객센터 채팅 같은 것도 socket.io 라이브러리를 
사용해 페이지를 새로고침 하지 않아도 실시간으로 응답한다.

socket.io 많이 쓰는 메서드
on : 이벤트에 매칭해서 소켓 이벤트 연결
emit : 소켓 이벤트 발생

express, fs, socket.io
nodemon

설치 명령어
------------------------------------------------
npm i express
npm i socket.io
npm i nodemon -g
// fs는 일반적으로 설치 되어있다.(기본 제공 모듈)
------------------------------------------------

*/

const express = require("express");
const fs = require("fs");
const socket = require("socket.io");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(PORT, "번 포트 사용중");
});

app.get("/", (req, res) => {
  fs.redFile("page.html", (err, data) => {
    res.end(data);
  });
});
