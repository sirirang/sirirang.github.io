var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "siri"
});

connection.connect();

var mysql = "select * from topic";

connection.query(mysql, function(error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();

