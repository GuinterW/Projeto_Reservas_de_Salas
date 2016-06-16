var express = require('express');
var consulta = express.Router();

consulta.get('/', function(req, res) {
	console.log(req);
	res.sendStatus(200);
});

module.exports = consulta;