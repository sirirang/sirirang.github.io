// myscript.js
// This example uses Node 8's async/await syntax.

var oracledb = require("oracledb");
var dbConfig = require("./dbconfig.js");
// set mypw to the hr schema password

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    });
    var sql = `SELECT ID FROM TOPIC`;
    connection.execute(sql, function(err, result) {
      if (err) {
        console.log("에러라고오오오오오옹!!!");
        return;
      }
      console.log(result);
    });
    // console.log(result);
    // let result = await connection.execute(sql,function(err,));
    // connection.execute(sql, function(err, result) {
    // if (err) {
    //   console.log("ERRRRRRRRRRRR!!!!!");
    //   return;
    // }
    // console.log(result.rows);
    // });
    // console.log(result);
    // console.log(result.rows);
    // var metadb = result.metaData;
    // for (var i = 0; i < metadb.length; i++) {
    //   console.log(metadb[i].name);
    // }
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
