var connection = require('../config/connection');

var visualizado = {
  velocidad: Number,
};

visualizado.insertVisualizado = function(data, callback) {
  if(connection) {
    sql = 'INSERT INTO visualizado SET ';
    for (var key in data)
      if (typeof data[key]!== 'undefined')
        sql += key + ' = "' + data[key] + '",'; 
    sql = sql.slice(0, -1);
    console.log(sql);
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

module.exports = visualizado;
