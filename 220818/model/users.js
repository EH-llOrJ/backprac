const Sequelize = require("sequelize");
// sequelize 모듈을 탑재한 user 클래스
class User extends Sequelize.Model {
  // init 함수에서 테이블을 설정해준다.
  static init(sequelize) {
    // super.init함수의 첫번째 매개변수는 테이블 컬럼에 대한 설정
    // 두번째는 테이블 자체의 설정
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          // Null이면 안된다.
          allowNull: false,
          // 고유키
          // 중복되면 안되는 값들을 쓸때 사용
          // 반드시 입력할 필요는 없음
          unique: true,

          // primarykey
          // 기본키
          // 값이 중복되지 않고 반드시 입력해야하는 값
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        msg: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      // 여기부터가 테이블에 대한 설정
      {
        // sequelize : init함수의 매개변수를 연결시켜주는 옵션
        sequelize,
        // timestamps : true로 하면 createAt과 updatedAt 컬럼들이 추가되고 생성시간과 수정시간에 자동으로 입력해준다.
        timestamps: true,
        // underscored : 시퀄라이즈는 테이블명과 컬럼명을 카멜표기법으로 표시해주는데
        // 스네이크 표기법으로 바꿔주는 옵션(aaaAa -> aaa_aa)
        underscored: false,
        // modelName : 모델의 이름을 설정해준다.
        // class 이름과 같게 설정
        modelName: "User",
        // tableName : 실제 데이터베이스에 등록되는 이름 , 보통 이름을 소문자로 복수형으로 만들어준다.
        tableName: "users",
        // paranoid : false로 설정하면 deletedAt이라는 컬럼이 추가된다.
        // 삭제하면 컬럼 내용은 남고 , 삭제한 시간이 추가된다.
        // 삭제했을때 값을 남겨둬야 할때 사용(복원해야할 경우)
        paranoid: false,
        // charset , collate : 각각 utf-8 , utf_general_ci 이렇게 설정해야 한글 입력 가능
        // 이모티콘도 사용하려면 utf-8md4, utf-8md4_general_ci 입력해줘여한다.
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // associate 함수에서 다른 모델과 관계를 적어준다.
  // mysql JOIN과 같은 기능으로 여러 테이블간의 관계를 만들어준다.
  // 시퀄라이즈는 JOIN 기능도 알아서 구현한다.
  // 테이블간의 관계성만 알려주면
  static associate(db) {}
}

module.exports = User;
