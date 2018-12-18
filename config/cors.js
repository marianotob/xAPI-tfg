//var whitelist = ['http://gardiot.ovh', 'localhost:3000', 'localhost:4200'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = {
  	methods: 'GET, HEAD, PATCH, OPTIONS, POST, PUT, DELETE',
  	preflightContinue: true,
    origin: true,
    optionsSuccessStatus: 204
  };
 /* if (whitelist.indexOf(req.header('Origin')) !== -1) {
    
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response 
  }else{
    corsOptions = { origin: false } // disable CORS for this request 
  }*/
  callback(null, corsOptions) // callback expects two parameters: error and options 
}

module.exports = corsOptionsDelegate;