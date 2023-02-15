// mysql 편하게 쓰기
// sequelize & FOREIGN KEY 사용
// 관계형 데이터 베이스 만들어보기

// mysql2 , dotenv 모듈 사용

const mysql = require("mysql2");
// config.js에서 내보낸 객체가 담긴다.
const config = require("./config.js");

const client = mysql.createConnection(config.dev);

// const sql =
//   "CREATE TABLE users (id INT AUTO_INCREMENT, user_name VARCHAR(255), PRIMARY KEY(id));";
// const sql2 =
//   "CREATE TABLE items (id INT AUTO_INCREMENT, name VARCHAR(255), price INT, url VARCHAR(255), PRIMARY KEY(id));";
// const sql3 =
//   "CREATE TABLE orders (id INT AUTO_INCREMENT, user_id INT, total_price INT, create_at datetime DEFAULT now(), PRIMARY KEY(id));";
// const sql4 =
//   "CREATE TABLE order_item (id INT AUTO_INCREMENT, order_id INT, item_id INT, order_qt INT, create_at datetime DEFAULT, PRIMARY KEY(id));";

// // FOREIGN KEY 추가하는데 orders 테이블의 user_id와 users 테이블의 id를 연결시킨다.
// const sql5 =
//   "ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);";
// const sql6 =
//   "ALTER TABLE order_item ADD FOREIGN KEY (order_id) REFERENCES orders (id);";
// const sql7 =
//   "ALTER TABLE order_item ADD FOREIGN KEY (item_id) REFERENCES items (id);";

// client.query(sql5 + sql6 + sql7);

// const sql8 =
//   "INSERT INTO items (name, price, url) VALUES('첫번째',1000,'/'), ('두번째',2000,'/');";

// const sql9 = "INSERT INTO users (user_name) VALUES ('안녕');";

// client.query(sql8 + sql9);

// INNER JOIN 두개의 태이블이 공통된 부분만 (참조된것) 합치는 것
// id, user_id, order_id, item_id 끼리 합쳐짐

// SELECT 부분이 찾을 값들 FROM 전까지
// INNER JOIN order_items ON (order_items.item_id = items.id)
// order_items의 item_id 값이랑 items 테이블의 id 값이랑 같은 값을 합친다
// const sql13 = `SELECT orders.id, orders.create_at,
// orders.total_price, items.name, items.price, items.url,
// order_item.order_qt FROM items
// INNER JOIN order_item ON (order_item.item_id = items.id)
// INNER JOIN orders ON (orders.id = order_item.order_id)
// WHERE (orders.user_id = ?)`;
// client.query(sql13, [1], (err, result) => {
//   console.log(result);
// });
