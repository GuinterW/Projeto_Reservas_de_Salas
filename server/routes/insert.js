var express = require('express');
var Insert = express.Router();
var mysql = require('mysql');
var validation = require('./validation');
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
            selectCommand = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
            insertUpdateCommand = 'UPDATE reservas SET ? WHERE ID = ?';
            break;
    };
}

function checkValidations(req, res){
    var date = req.query.Date.replace(/[:-]/g, '');
    validation.setQueryValues(req);
    if(validation.hasURLQuery(req, res)){
        connection.query('SELECT * FROM users', function(err,result){
            if(validation.hasValidUser(req,res,result)){
                if(validation.hasURLCorrectQueryFields(req, res)){
                    if(validation.hasCorrectDate(res)){
                        if(validation.hasCorrectTime(res)){
                            connection.query(selectCommand, [parseInt(req.query.Room, 10), parseInt(date, 10)], function(err, result){
                                if (err) throw err;
                                if(!validation.hasTimeConflict(res, result)){
                                    connection.query(insertUpdateCommand, [req.query, req.query.ID], function(err, result){
                                        if (err) throw err;
                                        if(validation.hasAffectedRows(res, result)){
                                            console.log('Inserted/Updated');
                                            res.sendStatus(200);
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            }
        });
    }
}

Insert.post('/', function(req, res) {
    setCommandMySQL('insert');
    checkValidations(req, res);
});

Insert.put('/', function(req, res) {
    setCommandMySQL('update');
    checkValidations(req, res);
});

module.exports = Insert;