const express = require("express");
const fs = require("fs");
const socketio = require("socket.io");

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(PORT, "에 잘 열림");
});

const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("page2.html", (err, data) => {
    res.end(data);
  });
});

/*
io.sockets.on("connection") 클라이언트가 접속했을 때
io.sockets.on("disconnect") 클라이언트가 종료했을 때
*/
io.sockets.on("connection", (socket) => {
  // 클라이언트에서 socket.emit("message", data);
  socket.on("message", (data) => {
    // 웹소켓에 연결되어있는 message 이벤트를 실행시켜준다.
    io.sockets.emit("message", data);
  });
});
