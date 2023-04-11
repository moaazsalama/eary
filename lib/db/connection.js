const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'eary',
  // port: "3306",//
});
connection.on('error', function (err) {
  console.log("[mysql error]", err);
});
connection.connect((err) => {
  if (err) {
    console.log(err);
    console.error("connection error");
    return;
  }

  console.log("connect to my sql");
});

module.exports = connection;