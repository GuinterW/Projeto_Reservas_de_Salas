var express = require('express');
var incluir = express.Router();
var mysql = require('mysql');
var validacao = require('./validacao');
var connection = mysql.createConnection({
    host     : '192.168.1.117',
    user     : 'me',
    password : 'secret',
    database : 'reservas'
});
var selectQuery;
var insertQuery;

function setQueryMySQL(type){
    switch(type){
        case 'insert': 
            selectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
            insertUpdateQuery = 'INSERT INTO reservas SET ?';
            break;
        case 'update':
            selectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
            insertUpdateQuery = 'UPDATE reservas SET ? WHERE ID = ?';
            break;
    };
}

function validacoes(req, res){
    var data = req.query.Data.replace(/[:-]/g, '');
    if(validacao.hasQuery(req, res)){
        if(validacao.hasCorrectQueryFields(req, res)){
            connection.query(selectQuery, [parseInt(req.query.Sala, 10), parseInt(data, 10)], function(err, result){
                if (err) throw err;
                if(!validacao.hasTimeConflict(res, result)){
                    connection.query(insertUpdateQuery, [req.query, req.query.ID], function(err, result){
                        if (err) throw err;
                        if(validacao.hasAffectedRows(res, result)){
                            console.log('Inserted, ID=' + result.insertId);
                            res.sendStatus(200);
                        }
                    });
                }
            });
        }
    }
}

incluir.post('/', function(req, res) {
    setQueryMySQL('insert');
    validacoes(req, res);
});

incluir.put('/', function(req, res) {
    setQueryMySQL('update');
    validacoes(req, res);
});

module.exports = incluir;