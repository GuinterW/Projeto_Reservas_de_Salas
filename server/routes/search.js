var express = require('express');
var Search = express.Router();
var validation = require('./validation');
var Command;

//CONEXAO SERVER.
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.1.117',
    user     : 'me',
    password : 'secret',
    database : 'reservas'
});

Search.get('/:Room/:Year', function(req, res){
    setCommandMySQL('Year');
    checkValidations(req,res,[parseInt(req.params.Room, 10), parseInt(req.params.Year, 10)]);
});

Search.get('/:Room/:Year/:Month', function(req, res){
    setCommandMySQL('Month');
    checkValidations(req,res,[parseInt(req.params.Room, 10), parseInt(req.params.Year, 10), parseInt(req.params.Month)]);   
});

Search.get('/:Room/:Year/:Month/:Day', function(req, res) {
    var date= req.params.Year + req.params.Month + req.params.Day;
    setCommandMySQL('Day');
    checkValidations(req,res,[parseInt(req.params.Room, 10), parseInt(date, 10)]);   
});

function buildTable(result,res){
    var items= '';
    for(var z=0;z<result.length;z++){
        items+= '<tr>' + '<td>' + result[z].Date + '</td>';
        items+= '<td>' + result[z].Start + '</td>';
        items+= '<td>' + result[z].End + '</td>';
        items+= '<td>' + result[z].Resp + '</td>';
        items+= '<td>' + result[z].Schedule + '</td>' + '</tr>';
    }
    res.type('text/html');
    res.send(items);
}

function checkFormat(result, req, res){
    if(req.query.hasOwnProperty('format') && req.query.format == 'json'){
        res.type('text/json');
        res.send(result);
    }
    else {
        buildTable(result, res);
    }
}

function checkValidations(req,res,value){
    validation.setParamsValues(req);
    if (validation.hasURLParams(req,res)){
        if (validation.hasCorrectURLParamsFields(req,res)){
            connection.query(Command, value, function(err,result){
                console.log('Searched');
                checkFormat(result, req, res);
            });
        }
    }
}

function setCommandMySQL(type){
    switch(type){
        case 'Year':
            Command = 'SELECT * FROM reservas WHERE Room = ? AND YEAR(Date) = ?';
            break;
        case 'Month':
            Command = 'SELECT * FROM reservas WHERE Room = ? AND YEAR(Date) = ? AND MONTH(Date) = ?';
            break;
        case 'Day':
            Command = 'SELECT * FROM reservas WHERE Room = ? AND Date = ?';
            break;
    }
}
module.exports = Search;