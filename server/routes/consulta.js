var express = require('express');
var consulta = express.Router();

consulta.get('/:sala', function(req, res) {
	console.log(req.params.sala);
	res.sendStatus(200);
});

module.exports = consulta;