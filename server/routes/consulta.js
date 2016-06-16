var express = require('express');
var consulta = express.Router();

consulta.get('/', function(req, res) {
	res.send('');
});


module.exports = consulta;