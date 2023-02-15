const express = require("express");
const fs = require("fs");
// path는 기본 경로를 다룰수 있게 도와주는 모듈
const path = require("path");
const ejs = require("ejs");
const { sequelize, User, Post } = require("./model");

const app = express();

// path.join 함수는 매개변수로 받은 문자열들을 주소처럼 합쳐줌
// path.join('a','b') >> a/b 주소처러 만들어줌
// app2.js가 있는 위치 __dirname
// views 폴더까지의 경로가 기본값 렌더링 할 파일을 모둔 폴더
// app.set express에 값을 저장가능  밑에 구문은 views 키에 주소값 넣은 부분
app.set("views", path.join(__dirname, "view"));

// 렌더링하는 기본 엔진을 ejs처럼 사용한다고 알려주는것
// engine('파일의 타입' , ejs 그릴때 방식을)  뷰 엔진이 그릴때
// html의 뷰 엔진을 ejs 렌더링 방식으로 바꾼다.
app.engine("html", ejs.renderFile);

// 뷰 엔진 설정을 html을 렌더링할때 사용한다.
// app.set은 express에 값을 저장할때 사용
app.set("view engine", "html");

app.use(express.urlencoded({ extended: false }));

// sequelize 구성해보자 연결 및 테이블 생성 >> 여기가 처음 매핑
sequelize
  // sync : 데이터베이스 동기화하는 함수 (객체모델과 매핑)
  // 실행될때 필요한 테이블을 생성
  // 필요한 테이블 다 생성되고 매핑 >> 처음부터 생성과 동시에 매핑을 하기 때문에 테이블의 내용이 달라도 어긋나지 않는다.
  // 여기서 create table 문이 여기서 실행

  // force : 테이블 내용을 강제 초기화 시킬것인지 여부
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  // create 함수를 사용하면 해당 테이블에 컬럼을 추가할수 있다.
  const { name, age, msg } = req.body;
  const create = User.create({
    name: name,
    age: age,
    msg: msg,
  });
  res.render("/create");
});

app.get("/user", (req, res) => {
  // 여기는 추가된 유저들을 봐야하니까
  // 조회를 하는데 전체를 조회해야한다.
  // findAll()
  // 매개변수로 검색할 옵션을 받는다.
  // where , order 등등
  // 조건이 없으면 전부다 가져온다.
  User.findAll({}).then((e) => {
    res.render("page", { data: e });
  });
});

app.post("/create_post", (req, res) => {
  const { name, text } = req.body;
  // User 테이블과 Post 랑 연결되었는데
  // User id 기본키로 되어있고 Post 는 user_id
  // 테이블에서 하나의 컬럼값 가져온다.
  // 하나를 검색할때 사용
  User.findOne({
    where: { name: name },
  }).then((e) => {
    Post.create({
      msg: text,
      // foreignKey = user_id 이고 유저의 id와 모델에 연결한다고 정의 (users.js 와 posts.js)
      user_id: e.id,
    });
  });
});

// params 값으로 받음
app.get("/view/:name", (req, res) => {
  // 해당 유저를 이름으로 조회하고
  User.findOne({
    where: {
      // 조건문 누구 찾을건지
      // params로 name 키값에 있는 value로 이름 검색
      name: req.params.name,
    },
    // 리턴값을 단일 객체로 변형해서 보여준다.
    // raw: true,
    // 관계형 모델 불러오기
    // 관계를 맺어놀은 모델을 조회할수있다.
    // 여기선 해당 검색된 유저와 맞는 user 모델의 id가 1번이면 Post 모델의 user_id 키가 같은 애들을 조회
    include: [
      {
        // Post 모델이 조회 되었으면 하니까 Post 모델 써줌
        model: Post,
      },
    ],
  }).then((e) => {
    e.dataValues.Posts = e.dataValues.Posts.map((i) => i.dataValues);
    const Posts = e.dataValues;
    console.log(Posts);
    //console.log(e.dataValues);
    res.render("view", { data: Posts });
  });
});

app.post("/view_Updata", (req, res) => {
  const { id, msg, text } = req.body;
  // 수정 쿼리문
  // 객체가 들어가는데
  // 첫번째 매개변수 : 수정할 내용
  // 두번째 매개변수 : 검색조건
  // 검색조건은 id와 msg 둘다 검색해서 맞는애 탐색
  Post.update({ msg: msg }, { where: { id: id, msg: text } });
});

app.get("/delete/:id", (req, res) => {
  // 삭제 쿼리문
  // 매개변수 객체 내용은 검색 조건
  Post.destroy({
    // 검색은 params의 안에 있는 id 키값
    where: { id: req.params.id },
  }).then(() => {
    // 잘 끝나면 유저 페이지로 이동
    res.redirect("/user");
  });
});

app.listen(3000, () => {
  console.log(3000, "server running");
});
