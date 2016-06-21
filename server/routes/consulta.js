var express = require('express');
var consulta = express.Router();
var validacao = require('./validacao');
var SelectQuery;

//CONEXAO SERVER.
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.117',
  user     : 'me',
  password : 'secret',
  database : 'reservas'
});

consulta.get('/:Sala/:Ano', function(req, res){
	setQueryMySQL('Ano');
	Validacoes(req,res,[parseInt(req.params.Sala, 10), parseInt(req.params.Ano, 10)]);
});

consulta.get('/:Sala/:Ano/:Mes', function(req, res){
	setQueryMySQL('Mes');
	Validacoes(req,res,[parseInt(req.params.Sala, 10), parseInt(req.params.Ano, 10), parseInt(req.params.Mes)]);   
});

consulta.get('/:Sala/:Ano/:Mes/:Dia', function(req, res) {
	var Data= req.params.Ano + req.params.Mes + req.params.Dia;
	setQueryMySQL('Dia');
	Validacoes(req,res,[parseInt(req.params.Sala, 10), parseInt(Data, 10)]);   
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

function Validacoes(req,res,value){
	if (validacao.hasParams(req,res)){
		if (validacao.hasCorrectParamsFields(req,res)){
			connection.query(SelectQuery, value, function(err,result){
				TabelaConsulta(result,res);
			});
		}
	}
}

function setQueryMySQL(type){
	switch(type){
		case 'Ano':
			SelectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND YEAR(Data) = ?';
			break;
		case 'Mes':
			SelectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND YEAR(Data) = ? AND MONTH(Data) = ?';
			break;
		case 'Dia':
			SelectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
			break;
	}
}
module.exports = consulta;