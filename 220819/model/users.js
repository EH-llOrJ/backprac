const Sequelize = require("sequelize");

// User 클래스에서 시퀄라이즈 안에 모듈 객체의 기능을 상속 시켜주기위해서
// User 클래스에서 Sequelize.Model 기능을 준다.
class User extends Sequelize.Model {
  // static init() 메서드는 테이블을 생성 및 연결(매핑)까지 구성
  static init(sequelize) {
    // super 상속받은 함수를 쓰기 위해
    // init 함수의 첫번째 매개변수는 테이블의 구성 (컬럼 내용) , 두번째 매개변수는 테이블의 설정값
    return super.init(
      {
        name: {
          // 시퀄라이즈 모델안에 있는 데이터 타입을 사용해야한다.
          // 그래서 가져온 시퀄라이즈 모듈 안에 잇는 STRING 객체를 사용
          type: Sequelize.STRING(20),
          // 이 값이 무조건 있어야 하는지
          allowNull: false,
          // primaryKey는 기본키로 설정할것인지
          // 기본키 컬럼에 하나는 무조건 있다.
          // 중복 X
          // primaryKey: true,

          // 고유키로 사용할것인지
          // 여기서는 컬럼에 name 값이 겹치지 않도록 사용
          // 주민번호,전화번호 등등
          unique: true,
        },
        age: {
          // 나이의 값은 숫자로 받을거니까
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        msg: {
          // 문자로 받을거니까
          type: Sequelize.TEXT,
          allowNull: true,
        },
        // // 생성시간이 필요하다 할때 사용하면 된다 or timestamps : true 로 설정
        // created_at: {
        //   // 시간 타입으로 받고
        //   type: Sequelize.DATE,
        //   allowNull: false,
        //   // 기본값 설정
        //   // NOW : 지금 현재 시간
        //   defaultValue: Sequelize.NOW,
        // },
      },
      {
        // 위에 매개변수 쓴걸 연결시켜주는 옵션
        sequelize,
        // update 시간과 create 시간도 자동으로 두개 생김
        timestamps: true,
        // 스네이크 표기법으로 바꿔주는 옵션 userData >> user_data (true 시)
        // create_at >> createAt (false 시)
        underscored: false,
        // 모델의 이름을 설정할수 있다.
        // 관계형으로 구성할때 사용
        modelName: "User",
        // database에 테이블의 이름을 설정할수 있다.
        tableName: "users",
        // paranoid true 로 설정하면 deletedAt 생성 (삭제 시간 추가 , 컬럼 값은 남아있다.)
        paranoid: false,
        // charset , collate : 아래와 같이 설정 시 한글 입력가능
        // 이모티콘 사용할 경우 : utf8mb4 , utf8mb4-general_ci
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // 1:N (foreignKey) 외래키
  static associate(db) {
    // 1:N 관계 (hasMany , belongTo)
    // 시퀄라이즈에서 1:N 관계를 hasMany 함수로 테이블의 관계를 정의를 한다.
    // 첫번째 매개변수 : 연결할 테이블 , 두번째 매개변수 : sourceKey User 테이블안에 무슨키를 foreignKey와 연결할지
    // hasMAny() 첫번째로 넘겨준 테이블이 foreignKey 연결되고 foreignKey 이름은 user_id 이다.
    db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "id" });
  }
}

module.exports = User;
