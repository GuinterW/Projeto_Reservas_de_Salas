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

consulta.get('/:Sala/:Ano', function(req, res){
	console.log(req.params);
    connection.query('SELECT * FROM reservas WHERE Sala = ? AND YEAR(Data) = ?', [parseInt(req.params.Sala, 10), parseInt(req.params.Ano, 10)], function(err, result){
		console.log(result);
		TabelaConsulta(result,res);
	});
});

consulta.get('/:Sala/:Ano/:Mes', function(req, res){
	console.log(req.params);
    connection.query('SELECT * FROM reservas WHERE Sala = ? AND YEAR(Data) = ? AND MONTH(Data) = ?', [parseInt(req.params.Sala, 10), parseInt(req.params.Ano, 10), parseInt(req.params.Mes)], function(err, result){
		console.log(result);
		TabelaConsulta(result,res);
	});
});

consulta.get('/:Sala/:Ano/:Mes/:Dia', function(req, res) {
	console.log(req.params);
	var Data= req.params.Ano + req.params.Mes + req.params.Dia;   
    connection.query('SELECT * FROM reservas WHERE Sala = ? AND Data = ?', [parseInt(req.params.Sala, 10), parseInt(Data, 10)], function(err, result){
	console.log(result);
	TabelaConsulta(result,res);
	});
});

function TabelaConsulta(result,res){
	var itens= '';
    for(var z=0;z<result.length;z++){
		itens+= '<tr>' + '<td>' + result[z].Inicio + '</td>';
		itens+= '<td>' + result[z].Termino + '</td>';
		itens+= '<td>' + result[z].Resp + '</td>';
		itens+= '<td>' + result[z].Pauta + '</td>' + '</tr>';
	}
		res.type('text/html');
		res.send(itens);
}

module.exports = consulta;
