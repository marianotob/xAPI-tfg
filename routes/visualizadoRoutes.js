var express = require('express');
var router = express.Router();

var visualizadoModel = require('../models/visualizado');


var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


router.post('/visualizado', function(request, response) {
	var visualizadoData = {
		tiempoVisto: request.body.tiempoVisto,
		completado: request.body.completado,
		nPausas: request.body.nPausas,
		nCambios: request.body.nCambios,
		VIDEO_idVideo: request.body.VIDEO_idVideo
	};

		visualizadoModel.insertVisualizado(visualizadoData, function(error, data) {
		response.status(200).json(data);	
		});
		
});


router.put('/visualizado/:id', function(request, response) {
	var visualizadoData = {
		tiempoVisto: request.body.tiempoVisto,
		completado: request.body.completado,
		nPausas: request.body.nPausas,
		nCambios: request.body.nCambios,
		VIDEO_idVideo: request.body.VIDEO_idVideo
	};
	visualizadoModel.updateVisualizado(visualizadoData, request.params.id, function(error, data) {
			response.status(200).json({"Mensaje":"Actualizado"});	
		});
			
});

module.exports = router;
