var express = require('express');
var router = express.Router();

var userModel = require('../models/user');


var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


router.post('/user', function(request, response) {
	var userData = {
		idUser: request.body.idUser
	};
	userModel.insertUser(userData, function(error, data) {
	response.status(200).json(data);	
	});
		
});



module.exports = router;
