var express = require('express');
var insert = express.Router();
var mysql = require('mysql');
var validation = require('./validacao');
var connection = mysql.createConnection({
    host     : '192.168.1.117',
    user     : 'me',
    password : 'secret',
    database : 'reservas'
});
var selectCommand;
var insertUpdateCommand;

function setCommandMySQL(type){
    switch(type){
        case 'insert': 
            selectCommand = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
            insertUpdateCommand = 'INSERT INTO reservas SET ?';
            break;
        case 'update':
            selectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
            insertUpdateQuery = 'UPDATE reservas SET ? WHERE ID = ?';
            break;
    };
}

function validations(req, res){
    var date = req.query.Date.replace(/[:-]/g, '');
    validation.setValues_Query(req);
    if(validation.hasQuery(req, res)){
        if(validation.hasCorrectQueryFields(req, res)){
            if(validation.hasCorrectDate(res)){
                if(validation.hasCorrectTime(res)){
                    connection.query(selectQuery, [parseInt(req.query.Room, 10), parseInt(date, 10)], function(err, result){
                        if (err) throw err;
                        if(!validation.hasTimeConflict(res, result)){
                            connection.query(insertUpdateQuery, [req.query, req.query.ID], function(err, result){
                                if (err) throw err;
                                if(validation.hasAffectedRows(res, result)){
                                    console.log('Inserted, ID=' + result.insertId);
                                    res.sendStatus(200);
                                }
                            });
                        }
                    });
                }
            }
        }
    }
}

insert.post('/', function(req, res) {
    setCommandMySQL('insert');
    validations(req, res);
});

insert.put('/', function(req, res) {
    setCommandMySQL('update');
    validations(req, res);
});

module.exports = insert;