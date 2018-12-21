var connection = require('../config/connection');
var user = {};

user.insertUser = function(data, callback) {
  if(connection) {
    sql = 'INSERT INTO user SET ';
    for (var key in data)
      if (typeof data[key]!== 'undefined')
        sql += key + ' = "' + data[key] + '",'; 
    sql = sql.slice(0, -1);
    connection.query(sql, function(error, result){
      if(error){
        callback(error, null);
      }
      else{
        callback(null, result.affectedRows);
      }   
    });
  }
}

module.exports = user;
