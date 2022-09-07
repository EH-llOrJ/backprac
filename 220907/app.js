/*
1. AWS 배포하기

EC2 ubuntu로 인스턴스
AWS 페이지에 로그인하고 서비스 탭 옆에 EC2 검색
EC2
클라우드의 가상 서버 뜹니다.
오른쪽 상단에 아이디옆에 리전은 최대한 가깝게 설정
한국이 안될 때 거의 일본 씀
인스턴스 클릭해서 인스턴스 창으로 이동
인스턴스 시작 버튼 클릭
인스턴스 중지가 잠시 꺼두는 거 인스턴스 종료가 아예 삭제

인스턴스 이름 써주고
우분투 클릭

키페어 생성해서 잘 보관해야하고
이동시에 저장매체에 담아서 옮기는게 보안에 좋다.
!!!!!!!!! 꼭 인스턴스 유형에 프리티어 사용 가능 확인하기(아니면 돈 나감)!!!

ssh -i "mykey.pem" ubuntu@ec2-54-183-145-243.us-west-1.compute.amazonaws.com

우분투에 mysql 인스턴스에 설치하자

mysql 설치 명령어

우분투 서버를 업데이트 하고 그리고 mysql-server 설치
sudo apt=get update
sudo apt-get install mysql-server

EC2 우분투 mysql 접속
sudo mysql -u root -p
비밀번호 입력창이 뜨면 그냥 엔터

데이터베이스 세팅
1. 사용할 데이터베이스 하나 만들어주자
create database 여기에 이름;

한번 확인해보자
show databases;

이 데이터베이스를 사용해야하니까 유저를 만들어서 사용하자
접속할 때 유저 정보가 있어야 접속이 가능하니까
사용할 유저 생성

create user '여기에 유저 이름'@'%' identified by '비밀번호';
ex) create user 'admin'@'%' identified by 'admin1234';

만든 유저에게 데이터베이스 권한을 주자
grant all on 데이터베이스 이름.(이름뒤에 점)* to '유저이름'@'%';
ex) grant all on mydb.* to 'admin'@'%';

권한이 주어졌는지 확인
show grants for '여기에 유저 이름'%';
ex) show grants for 'admin';

외부에서 접속 해보자

인스턴스 페이지로 돌아와서
하단에 보안 탭을 클릭하고
보안 세부 정보에 보안 그룹 클릭

트래픽에 네트워크 간에 이동 방향을 말하는 것

인바운드 규칙 : 네트워크에 들어오는 정보
클라이언트에서 서버로 향하는 것

아웃바운드 규칙 : 네트워크에서 나가는 정보
클라이언트에서 요청을 하고 서버에서 클라이언트로 다시 보내주는 것

보안 규칙 추가에
HTTP, HTTPS, MYSQL 모두 추가해준다. (IPv4)

보안그룹 규칙 설정을 끝냈으면 우리가 EC2에 설치한 MYSQL 접속 허용 설정을 해주자

sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf;
수정모드는 i를 눌러서 들어가고
:wq! = 저장 후 종료
:q! = 종료
:w! = 강제 저장
이 파일에서 수정할 부분은 bind-address의 127.0.0.1이 부분을 0.0.0.0 이렇게 모두로 설정해주면 된다.

mysql 서버 재실행 해주어야 한다.
sudo service mysql restart

외부접속은 끝

로컬에 워크 벤치 켜고
connection을 추가하는데
connection 옵션은 hostname에 인스턴스 퍼블릭 IPc4 DNS 주소를 입력

port는 3306번을 적는다.
username은 접속할 유저 이름 (아까 권한 준 이름 admin)
password는 store in valut 버튼을 눌러서 mysql 비밀번호 입력
잘되면 mysql 화면이 보인다 보이는 화면은 우리가 만든 ec2 우분투에 설치한 mysql

username, password, database 수정 로컬호스트는 괜찮다 여기 로컬에서 돌리기 때문에..?

프로젝트 EC2 우분투에 설치하기
본인이 올릴 프로젝트를 깃허브에 올리고
config.js 잘 확인하고 데이터베이스 이름과 비밀번호 유저 이름을
EC2 우분투에 설치한 mysql의 접속 옵션과 동일하게 바꿔준다.
인스턴스에 git init하고
git remote add origin 깃 저장소 주소
git pull origin main
pull 받아서 파일 갱신
*/
