/*
채팅방 만들기
방개념

사용할 것들
express, socket.io, fs, nodemon
+ npm init -y

*/

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");

// ---------------express만 ------
// 서버의 몸체가 되는 객체만 만들어지고
const app = express();

// 서버를 3000번 포트에서 듣고 있게 한다.
// 대기상태
// const server = app.listen(3000);
const server = app.listen(3000, () => {
  console.log(3000, "번 포트 열림");
  // 콜백함수로 잘 열린지 확인
});
// -------------------------------

// socketio 생성 및 실행
const io = socketio(server);
// "/socket.io/socket.io.js" 이 경로로 js 파일에 접근할 수 있다.

app.get("/", (req, res) => {
  fs.readFile("page.html", "utf-8", (err, data) => {
    // console.log(err);
    // 파일 읽기가 처리되었으면 err는 NULL
    res.send(data);
  });
});

// 클라이언트가 접속 했을 때 connection
io.on("connection", (socket) => {
  // console.log(socket);
  console.log("유저 접속");
  socket.on("joinRoom", (room, name) => {
    // 방개념으로 접속 시켜주는 함수 join(방이름)
    socket.join(room);
    // to(room) 현재 그 방에 있는 클라이언트에게 요청
    io.to(room).emit("joinRoom", room, name);
  });

  socket.on("leaveRoom", (room, name) => {
    // 방개념으로 떠나게 해주는 함수 leave(방 이름)
    socket.leave(room);
    io.to(room).emit("leaveRoom", room, name);
  });

  socket.on("chat", (room, name, msg) => {
    io.to(room).emit("chat", name, msg);
  });
});

/*
접속된 모든 클라이언트에게 메세지를 전송
io.emit('이벤트명', 보내줄 데이터)

메세지를 전송한 클라이언트에게만 메시지 전송
socket.emit('이벤트명', 보내줄 데이터)

메세지를 전송하는데 자기 제외 전송
socket.broadcast.emit('')

특정 클라이언트에게만 귓속말
io.to(아이디).emit('이벤트명')

클라이언트 접속과 종료 들어왔을 때 나갔을 때
io.on("connection"(접속 했을 때)/"disconnection"(나갔을 때), (socket)=>{})
*/
