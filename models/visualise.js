var connection = require('../config/connection');

var visualise = {};

visualise.insertVisualise = function(data, callback) {
  if(connection) {
    sql = 'INSERT INTO visualise SET ';
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

visualise.updateVisualizado = function(data, id, callback) {
  if(connection) {
   var sql = 'UPDATE Visualizado SET ';
   for (var key in data)
     if (typeof data[key]!== 'undefined')
       sql += key + ' = "' + data[key] + '",';
   sql = sql.slice(0, -1);
   sql += ' WHERE idVisualizado = ' + id;
   connection.query(sql, function(error, result) {
     if (error)
       callback(error, null);
     else{
       callback(null, result.affectedRows);
     }
   });
 }
}

module.exports = visualise;
