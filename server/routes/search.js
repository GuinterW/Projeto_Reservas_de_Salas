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

function getFreeTime(result, res){
    var freeTime = [];
    var startFreeTime = '08:30:00';
    var endFreeTime = '18:30:00';
    if(result.length>1){
        for(var x=0;x<result.length;x++){
            var resultStart = result[x].Start.replace(/[:-]/g, '');
            if(parseInt(resultStart)>083000){
                endFreeTime = result[x].Start;
                for(var c=0;c<result.length;c++){
                    var resultEnd = result[c].End.replace(/[:-]/g, '');
                    var startFreeTimeINT = startFreeTime.replace(/[:-]/g, '');
                    if(parseInt(resultEnd)<parseInt(resultStart)){
                        if(parseInt(resultEnd)>=parseInt(startFreeTimeINT)){
                            startFreeTime = result[c].End;
                        }
                    }
                }
                freeTime.push(startFreeTime, endFreeTime);
            }
        }
        var lastValue=freeTime[0].replace(/[:-]/g, '');
        var positionLastValue = 0;
        for(var x=0;x<freeTime.length;x++){
            var value = freeTime[x].replace(/[:-]/g, '');
            if(parseInt(value)>=parseInt(lastValue)){
                lastValue = value;
                positionLastValue = x;
            }
        }
        if(lastValue<183000){
            startFreeTime = freeTime[positionLastValue];
            endFreeTime = '18:30:00';
            freeTime.push(startFreeTime, endFreeTime);
        }
    }
    else if(result.length==1){
        var resultStart = result[0].Start.replace(/[:-]/g, '');
        var resultEnd = result[0].End.replace(/[:-]/g, '');
        if(parseInt(resultStart)!=083000 && parseInt(resultEnd)!=183000){
            if(parseInt(resultStart)==083000){
                startFreeTime = result[0].End;
            }
            else {
                endFreeTime = result[0].Start;
                freeTime.push(startFreeTime, endFreeTime);
            }
            if(parseInt(resultEnd)==183000){
                endFreeTime = result[0].Start;
            }
            else {
                startFreeTime = result[0].End;
                endFreeTime = '18:30:00';
                freeTime.push(startFreeTime, endFreeTime);
            }
        }
    }
    else {
        freeTime.push(startFreeTime, endFreeTime);
    }
    /*chama função que printa o tempo livre*/
}

function buildTable(result, req, res){
    var items= '';
    for(var z=0;z<result.length;z++){
        items+= '<tr>';
        if(req.query.today != 'true'){
            items+= '<td>' + result[z].Date + '</td>';
        }
        items+= '<td>' + result[z].Start + '</td>';
        items+= '<td>' + result[z].End + '</td>';
        items+= '<td>' + result[z].Resp + '</td>';
        items+= '<td>' + result[z].Schedule + '</td>' + '</tr>';
    }
    res.type('text/html');
    res.send(items);
}

function checkQuery(result, req, res){
    if(req.query.hasOwnProperty('format') && req.query.format == 'json'){
        res.type('text/json');
        res.send(result);
    }
    else if(req.query.hasOwnProperty('freeTime') && req.query.freeTime == 'true'){
        getFreeTime(result, res);
    }
    else {
        buildTable(result, req, res);
    }
}

function checkValidations(req,res,value){
    validation.setParamsValues(req);
    if (validation.hasURLParams(req,res)){
        connection.query('SELECT * FROM users', function(err,result){
            if(validation.hasValidUser(req,res,result)){
                if (validation.hasCorrectURLParamsFields(req,res)){
                    connection.query(Command, value, function(err,result){
                        console.log('Searched');
                        checkQuery(result, req, res);
                    });
                }
            }
        });
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