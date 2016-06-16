var express = require('express');
var incluir = express.Router();
var mysql = require('mysql');
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

incluir.post('/', function(req, res) {
    if(req.query.hasOwnProperty('Sala') && req.query.hasOwnProperty('Inicio') && req.query.hasOwnProperty('Termino') && req.query.hasOwnProperty('Data')){
        var inicio = req.query.Inicio.replace(/[:-.,]/g, '');
        var termino = req.query.Termino.replace(/[:-.,]/g, '');
        var data = req.query.Data.replace(/[:-.,]/g, '');
        var flagError = false;
        connection.query('SELECT * FROM reservas WHERE Sala = ? AND Data = ?', [parseInt(req.query.Sala, 10), parseInt(data, 10)], function(err, result){
            if (err) throw err;
            for(var x=0;x<result.length;x++){
                var inicioReuniao = result[x].Inicio.replace(/[:-]/g, '');
                var terminoReuniao = result[x].Termino.replace(/[:-]/g, '');
                if(inicio>=inicioReuniao && inicio<terminoReuniao){
                    flagError = true;
                    x=result.length+1;
                    res.sendStatus(403);
                }
                else if(termino>inicioReuniao && termino <=terminoReuniao){
                    flagError = true;
                    x=result.length+1;
                    res.sendStatus(403);
                }
                else if(inicio<=inicioReuniao && termino>=terminoReuniao){
                    flagError = true;
                    x=result.length+1;
                    res.sendStatus(403);
                }
            }
            if(!flagError){
                connection.query('INSERT INTO reservas SET ?', req.query, function(err, result){
                    if (err) throw err;
                    console.log('Inserted, ID=' + result.insertId);
                });
                res.sendStatus(200);
            }
        });
    }
    else {
        console.log('Failed to insert');
        res.type('text/json');
        res.status(403).send(errors.emptyField);
    }
});

module.exports = incluir;