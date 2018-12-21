var express = require('express');
var router = express.Router();

var visualiseModel = require('../models/visualise');


var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


router.post('/visualise', function(request, response) {
	var visualiseData = {
		tiempoVisto: request.body.tiempoVisto,
		completado: request.body.completado,
		nPausas: request.body.nPausas,
		nCambios: request.body.nCambios,
		VIDEO_idVideo: request.body.VIDEO_idVideo,
		USER_idUser: request.body.USER_idUser
	};

	visualiseModel.insertVisualise(visualiseData, function(error, data) {
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
