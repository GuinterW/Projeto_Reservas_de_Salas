var express = require('express');
var consulta = express.Router();

consulta.get('/:2', function(req, res) {
	console.log(req);
	res.sendStatus(200);
});


module.exports = consulta;