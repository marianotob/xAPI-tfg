var express = require('express');
var router = express.Router();


var videoModel = require('../models/video');

router.get('/videos', function (request, response) {
	videoModel.getVideo(request.params.number, request.params.page, request.params.sort, function(error, data){
		response.status(200).json(data);
	});
});



module.exports = router;
