var express = require('express');
var Delete = express.Router();
var mysql = require('mysql');
var validation = require('./validation');
var connection = mysql.createConnection({
    host     : '192.168.1.117',
    user     : 'me',
    password : 'secret',
    database : 'reservas'
});
var Command = 'DELETE FROM reservas WHERE Room = ? AND Start = ? AND End = ? AND Date = ?';

function checkValidations(req, res){
    var date = req.query.Date.replace(/[:-]/g, '');
    validation.setQueryValues(req);
    if(validation.hasURLQuery(req, res)){
        connection.query('SELECT * FROM users', function(err,result){
            if(validation.hasValidUser(req,res,result)){
                if(validation.hasCorrectURLQueryFields(req, res)){
                    if(validation.hasCorrectDate(res)){
                        if(validation.hasCorrectTime(res)){
                            connection.query(Command, [req.query.Room, validation.startMeeting, validation.endMeeting, validation.date], function(err, result){
                                if (err) throw err;
                                if(validation.hasAffectedRows(res, result)){
                                    console.log('Deleted');
                                    res.sendStatus(200);
                                }
                            });
                        }
                    }
                }
            }
        });
    }
}

Delete.delete('/', function(req, res) {
    checkValidations(req, res);
});

module.exports = Delete;