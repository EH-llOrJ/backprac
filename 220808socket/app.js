/*
쿠키랑 세션

쿠키와 세션을 쓰는 이유는
데이터나 인증(권한)을 유지하기 위해서

쿠키는 pc에 남아있고 세션은 웹을 끄면 종료 된다.
웹 사이트에 방문할 때 사용자의 컴퓨터에 기록할 데이터
클라이언트 상태 정보를 pc에 저장했다가 재사용 할 수 있다.

1. 웹페이지에서 팝업 오늘 보지 않기 체크 박스
며칠동안 쿠키를 저장할지

2. 자동로그인 비밀번호 아이디 자동으로 입력 시킬지도 쿠키로
쿠키의 특징
이름, 값, 유효기간, 경로 정보로 구성되어 있다.
클라이언트에 총 300개까지 쿠키를 저장할 수 있다.
하나의 도메인당 20개의 쿠키를 가질 수 있다.
쿠키 하나는 4kb까지 저장 가능

url / 루트 경로에서 쓰는 쿠키들도 따로 관리
url /user 이 경로에서 사용할 쿠키도 따로 관리할 수 있다.

키값이랑 밸류가 있고 date객체로 언제까지
유지할지 설정
쿠키 생성 함수
*/

// 쿠키 생성 함수 (이름, 값, 유효기간)
let createCookie = function (name, value, time) {
  // date객체를 생성해서 변수에 담고
  let date = new Date();
  // date객체의 시간을 설정하는데 setTime
  // time에 값이 1이면 1일 하루
  // date.getTime() 현재 시간에 time을 더하면
  // 생성한 시간부터 1일 지난 시간
  date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
  // 쿠키의 구조
  // 키 = 값 문자열로 저장
  // 객체 사용하는 것처럼 키로 접근해서 쿠키의 값을 가져온다.

  // 쿠키의 경로(path)
  // 도메인 하위로 하위 쿠키 경로를 지정할 수 있다.
  // 쿠키 갯수가 적으면 거의 루트만 사용

  // 만료일(expires)
  // 만료일은 GMT 시간 문자열 쿠키는 삭제하는 기능이 없다.
  // 이전 만료일을 지정해주면 만료되서 삭제된다.
  // 아예 무척 과거 시간을 지정해줘서 삭제 보안 문제나 개인정보
  // 노출이 이슈이니까 시간은 웬만해선 짧게 1개월 ~ 3개월 정도 추천
  // 1년은 절대 넘기면 안된다. 민감한 데이터 유출 위험
  // document.cookie
  // toUTCString() 함수를 사용해서 expires = Sat, 02 Oct 2021 15:50:50 GMT 이렇게 변경
  // 쿠키이름 = 쿠키값; expires = Sat, 02 Oct 2021 15:50:50 GMT; path=/
  document.cookie =
    name + "=" + value + ";expires" + date.toUTCString() + ";path=/";
};

// 쿠키 값 가져오는 함수
let getCookie = function (name) {
  // 현재 저장된 쿠키 중 name에 맞는 쿠키가 저장되어 있으면
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  // 있으면 값을 내보낸다.
  // 콘솔로그로 value, value[0], value[1], value[2]를 확인해보면
  // 쿠키의 값이 있는 인덱스가 2번이라서 2번 인덱스 값을 가져온다.
  return value ? value[2] : null;
};

// 쿠키 유무 확인 함수
let isActiveCookie = function (key) {
  return getCookie(key) != null ? true : false;
};

// 쿠키 제거 함수
let isDeleteCookie = function (key) {
  // 쿠키 제거 기능은 없기에 제일 예전 날짜를 넣어줘서 자동으로 삭제되게 만든다.
  document.cookie = key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT";
};

/*
세션

사용자(브라우저)에서 들어오는 요구를 하나의 상태로 보고
상태를 유지시키는 기술 브라우저를 종료할 때까지 유지된다.
사용자가 웹 서버에 접속해 있는 상태를 세션
웹 사이트에서 로그인했을 때 구매나 장바구니
티켓을 보여주고 팔찌를 차고 끝나면 찢고

로그인 사용자의 프로필 정보
로그인 유무

*/

// 세션에 저장 setItem() 매개변수 키, 값
sessionStorage.setItem("myItem", "저장할 데이터"); // 저장

// 세션에 저장한 아이템을 가져오는 것 getItem() 매개변수 키값
sessionStorage.getItem("myItem");

// 세션이 몇 개 들어있는지 길이 구하는 방법
sessionStorage.length; // 1

// 세션의 아이템을 인덱스로 가져오기
sessionStorage.key(0); // myItem

sessionStorage.clear(); // 전체 삭제
