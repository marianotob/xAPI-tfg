var express = require('express');
var router = express.Router();

var visualizadoModel = require('../models/visualizado');


var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


router.post('/visualizado', function(request, response) {

	var visualizadoData = {
		velocidad: request.body.velocidad,
		tiempoVisto: request.body.tiempoVisto,
		sonido: request.body.sonido,
		volumen: request.body.volumen,
		cambioCalidad: request.body.cambioCalidad,
		completado: request.body.completado,
		nPausas: request.body.nPausas,
		nCambios: request.body.nCambios,
		VIDEO_idVideo: request.body.VIDEO_idVideo
	};

		visualizadoModel.insertVisualizado(visualizadoData, function(error, data) {
		response.status(200).json(data);	
		});
		
});

module.exports = router;
