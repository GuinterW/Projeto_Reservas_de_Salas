var express = require('express');
var search = express.Router();
var validation = require('./validation');
var selectCommand;

//CONEXAO SERVER.
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.1.117',
    user     : 'me',
    password : 'secret',
    database : 'reservas'
});

search.get('/:Room/:Year', function(req, res){
    setCommandMySQL('Year');
    Validations(req,res,[parseInt(req.params.Room, 10), parseInt(req.params.Year, 10)]);
});

search.get('/:Room/:Year/:Mounth', function(req, res){
    setCommandMySQL('Mounth');
    Validations(req,res,[parseInt(req.params.Room, 10), parseInt(req.params.Year, 10), parseInt(req.params.Mounth)]);   
});

search.get('/:Room/:Year/:Mounth/:Day', function(req, res) {
    var Date= req.params.Year + req.params.Mounth + req.params.Day;
    setCommandMySQL('Day');
    Validations(req,res,[parseInt(req.params.Room, 10), parseInt(Date, 10)]);   
});

function buildTable(result,res){
    var items= '';
    for(var z=0;z<result.length;z++){
        items+= '<tr>' + '<td>' + result[z].Start + '</td>';
        items+= '<td>' + result[z].End + '</td>';
        items+= '<td>' + result[z].Resp + '</td>';
        items+= '<td>' + result[z].Schedule + '</td>' + '</tr>';
    }
    res.type('text/html');
    res.send(items);
}

function Validations(req,res,value){
    validation.setValues_Params(req);
    if (validation.hasParams(req,res)){
        if (validation.hasCorrectParamsFields(req,res)){
            connection.query(selectCommand, value, function(err,result){
                buildTable(result,res);
            });
        }
    }
}

function setCommandMySQL(type){
    switch(type){
        case 'Year':
            selectCommand = 'SELECT * FROM reservas WHERE Room = ? AND YEAR(Date) = ?';
            break;
        case 'Mounth':
            selectCommand = 'SELECT * FROM reservas WHERE Room = ? AND YEAR(Date) = ? AND MONTH(Date) = ?';
            break;
        case 'Day':
            selectCommand = 'SELECT * FROM reservas WHERE Room = ? AND Date = ?';
            break;
    }
}



module.exports = search;