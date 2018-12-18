var connection = require('../config/connection');

var video = {};

video.getVideo = function(number, page, sort, callback) {
  if(connection) {

    connection.query('SELECT * FROM Video' , function (error, rows){
      if(error)
        callback (error, null);
      else
        callback(null, rows);
    });
  }
}

module.exports = video;
