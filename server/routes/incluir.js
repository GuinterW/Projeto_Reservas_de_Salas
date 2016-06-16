var express = require('express');
var incluir = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'reservas'
});

var errors = {
    emptyField: {
        message: 'Error'
    }
}

incluir.get('/', function(req, res) {
    if(req.query.hasOwnProperty('Sala') && req.query.hasOwnProperty('Inicio') && req.query.hasOwnProperty('Termino') && req.query.hasOwnProperty('Data')){
        connection.query('INSERT INTO reservas SET ?', req.query, function(err, result){
            if (err) throw err;
            console.log('Inserted, ID=' + result.insertId);
        });
        connection.end();
        res.sendStatus(200);
    }
    else {
        console.log('Failed to insert');
        res.type('text/json');
        res.status(403).send(errors.emptyField);
    }
});


module.exports = incluir;