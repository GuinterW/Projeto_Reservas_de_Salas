var express = require('express');
var consulta = express.Router();

//CONEXAO SERVER.
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.117',
  user     : 'me',
  password : 'secret',
  database : 'reservas'
});

consulta.get('/:sala/:ano', function(req, res){
	console.log(req.params);
	res.sendStatus(200);
});

consulta.get('/:sala/:ano/:mes', function(req, res){
	console.log(req.params);
	res.sendStatus(200);
});

consulta.get('/:sala/:ano/:mes/:dia', function(req, res) {
	console.log(req.params);
	res.sendStatus(200);
});

module.exports = consulta;