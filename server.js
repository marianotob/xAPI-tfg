var express = require('express');
var https = require('https');
var url= require('url');
var config = require('./config/main');
var fs = require('fs');
var cors = require('cors'); //CORS standard
var app = express();



app.use(cors());

const options = {
  key: fs.readFileSync("./server-key.pem"),
  cert: fs.readFileSync("./server-cert.pem")
};

https.createServer(options,app).listen(8001, () => {
  console.log('Server started at https://localhost:8001');
});


/* app.get('/', (req, res) => {
 res.sendfile('./proyecto/youtube.html');
}); */

app.get('/', (req, res) => {
  res.sendfile('./proyecto/galeria.html');
 });
 app.use(express.static('./proyecto' + '/public'));

app.get('/youtube', (req, res) => {
 res.sendfile('./proyecto/youtube.html');
}); 

app.get('/estilo', (req, res) => {
  res.sendfile('./proyecto/estilo.css');
 }); 

app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
});

app.get('/function.js', function(req, res){
  // Indicamos el tipo de contenido a devolver en las cabeceras de nuestra respuesta
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/js/function.js');
});

app.get('/apiYoutube.js', function(req, res){
  // Indicamos el tipo de contenido a devolver en las cabeceras de nuestra respuesta
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/js/apiYoutube.js');
});

app.get('/tincan.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/TinCanJS/build/tincan-min.js');
});


app.get('/xapiwrapper.min.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/xAPIWrapper/dist/xapiwrapper.min.js');
});

app.get('/base64.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/js/base64.js');
});

app.get('/2.5.3-crypto-sha1.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/js/2.5.3-crypto-sha1.js');
});

app.get('/cryptojs_v3.1.2.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/xAPIWrapper/lib/cryptojs_v3.1.2.js');
});

app.get('/verbs.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/xAPIWrapper/src/verbs.js');
});

app.get('/xapistatement.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/xAPIWrapper/src/xapistatement.js');
});

app.get('/xapiwrapper.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/xAPIWrapper/src/xapiwrapper.js');
});

app.get('/xapi-launch.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/xAPIWrapper/src/xapi-launch.js');
});

app.get('/chart.js', function(req, res){
  res.contentType('application/js');
  res.sendfile('./' + './proyecto/js/Chart.js');
});




//Start server
app.listen(config.port, function () {
  console.log('API running on port ' + config.port);
}).on('error', function(err) {
	console.log('Error handled: ' + err);
});

process.on('uncaughtException', function(err) {
	console.log('Except handled: ' + err);
});

//Routes

app.use('/api', require('./routes/videoRoutes'));
app.use('/api', require('./routes/visualiseRoutes'));
app.use('/api', require('./routes/userRoutes'));



