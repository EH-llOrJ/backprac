// sequelize 사용

const { sequelize, User } = require("./model");
// 연산자 사용하기 위해서 가져온다.
const { Op } = require("sequelize");

// 처음에 연결할때 테이블들의 값을 초기화 할것인지
// true : 기존 테이블 초기화
// false : 기존 테이블 초기화X
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결되엇습니다.");
  })
  .catch((err) => {
    console.log(err);
  });

// 쿼리문일땐 INSERT INTO 테이블 VALUES (?,?,?)
// 생성 쿼리문 create
User.create({
  name: "안녕2",
  age: 23,
  msg: "message",
});

// 조회 쿼리문
// select * from users

// attributes : 원하는 컬럼만 가져온다.
// where : 검색 조건 설정
// order : 생성 순서 정렬 DESC, ASC (내림차순 , 오름차순) >> order : [['age' , 'DESC']]
// limit : 조회할 갯수
// offset : 스킵할 갯수
// DESC , ASC 자주 쓰임
// Op.gt : (값의 이상)
// Op.
async function select() {
  const user = await User.findAll({
    where: {
      age: { [Op.gt]: 22 },
      [Op.or]: [{ age: { [Op.gt]: 23 } }, { name: "안녕2" }],
    },

    order: [["age", "ASC"]],
    // limit: 1,
  });
  const temp = user.map((i) => i.dataValues);
  console.log(temp);
}
select();

// findOne 구성은 같고 하나만 데이터를 가져온다.
// findOne은 검색조건을 사용해서 쓰자.

// 수정 쿼리문
User.update(
  {
    // msg 내용을 바꿔준다
    msg: "수정할 내용",
  },
  // 아이디가 1번인 애를 찾아서
  {
    where: { id: 1 },
  }
);

// 삭제 쿼리문
User.destroy({
  where: { id: 1 },
});

// 관계 쿼리문 join
