var express = require('express');
var incluir = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.1.117',
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
<<<<<<< 9dc861cab1b6c68f9b89bba88d861a1fdb0aa179
<<<<<<< fdfb595b73e6e0f3b35c03e4ce15ab45bd718d4b
        var inicio = req.query.Inicio.replace(/[:-]/g, '');
        var termino = req.query.Termino.replace(/[:-]/g, '');
        var data = req.query.Data.replace(/[:-]/g, '');
        var flagError = false;
        if(inicio.length>=5 && termino.length>=5 && data.length==8 && req.query.Sala.length==1 && parseInt(req.query.Inicio, 10)!='NaN' && parseInt(req.query.Termino, 10)!='NaN' && parseInt(req.query.Data, 10)!='NaN' && parseInt(req.query.Sala, 10)!='NaN'){
            connection.query('SELECT * FROM reservas WHERE Sala = ? AND Data = ?', [parseInt(req.query.Sala, 10), parseInt(req.query.Data, 10)], function(err, result){
                if (err) throw err;
                for(var x=0;x<result.length;x++){
                    var inicioReuniao = result[x].Inicio.replace(/[:-]/g, '');
                    var terminoReuniao = result[x].Termino.replace(/[:-]/g, '');
                    if(inicio>=inicioReuniao && inicio<terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                    else if(termino>inicioReuniao && termino <=terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                    else if(inicio<=inicioReuniao && termino>=terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                }
                if(!flagError){
                    connection.query('INSERT INTO reservas SET ?', req.query, function(err, result){
                        if (err) throw err;
                        console.log('Inserted, ID=' + result.insertId);
                    });
                    res.sendStatus(200);
                }
                else {
                    console.log('Failed to insert, already exist reserve');
                    res.type('text/json');
                    res.status(403).send(errors.emptyField);
                }
            });
        }
        else {
            console.log('Failed to insert, incorrect fields');
            res.type('text/json');
            res.status(403).send(errors.emptyField);
        }
=======
        var inicio = req.query.Inicio.replace(/[:-.,]/g, '');
        var termino = req.query.Termino.replace(/[:-.,]/g, '');
        var data = req.query.Data.replace(/[:-.,]/g, '');
=======
        var inicio = req.query.Inicio.replace(/[:-]/g, '');
        var termino = req.query.Termino.replace(/[:-]/g, '');
        var data = req.query.Data.replace(/[:-]/g, '');
>>>>>>> validação
        var flagError = false;
        if(inicio.length>=5 && termino.length>=5 && data.length==8 && req.query.Sala.length==1 && parseInt(req.query.Inicio, 10)!='NaN' && parseInt(req.query.Termino, 10)!='NaN' && parseInt(req.query.Data, 10)!='NaN' && parseInt(req.query.Sala, 10)!='NaN'){
            connection.query('SELECT * FROM reservas WHERE Sala = ? AND Data = ?', [parseInt(req.query.Sala, 10), parseInt(req.query.Data, 10)], function(err, result){
                if (err) throw err;
                for(var x=0;x<result.length;x++){
                    var inicioReuniao = result[x].Inicio.replace(/[:-]/g, '');
                    var terminoReuniao = result[x].Termino.replace(/[:-]/g, '');
                    if(inicio>=inicioReuniao && inicio<terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                    else if(termino>inicioReuniao && termino <=terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                    else if(inicio<=inicioReuniao && termino>=terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                }
                if(!flagError){
                    connection.query('INSERT INTO reservas SET ?', req.query, function(err, result){
                        if (err) throw err;
                        console.log('Inserted, ID=' + result.insertId);
                    });
                    res.sendStatus(200);
                }
                else {
                    console.log('Failed to insert, already exist reserve');
                    res.type('text/json');
                    res.status(403).send(errors.emptyField);
                }
<<<<<<< 9dc861cab1b6c68f9b89bba88d861a1fdb0aa179
            }
            if(!flagError){
                connection.query('INSERT INTO reservas SET ?', req.query, function(err, result){
                    if (err) throw err;
                    console.log('Inserted, ID=' + result.insertId);
                });
                res.sendStatus(200);
            }
        });
>>>>>>> validação incluir
    }
    else {
        console.log('Failed to insert, insuficient query');
        res.type('text/json');
        res.status(403).send(errors.emptyField);
    }
});

incluir.put('/', function(req, res) {
    if(req.query.hasOwnProperty('Sala') && req.query.hasOwnProperty('Inicio') && req.query.hasOwnProperty('Termino') && req.query.hasOwnProperty('Data')){
        var inicio = req.query.Inicio.replace(/[:-]/g, '');
        var termino = req.query.Termino.replace(/[:-]/g, '');
        var data = req.query.Data.replace(/[:-]/g, '');

        /*var id = parseInt(req.query.ID, 10);
        console.log(typeof(id));
        console.log(id);
        if(id!=NaN){
            console.log('Failed to insert, invalid ID');
            res.type('text/json');
            res.status(403).send(errors.emptyField);
        }*/

        var flagError = false;
        if(inicio.length>=5 && termino.length>=5 && data.length==8 && req.query.Sala.length==1 && parseInt(req.query.Inicio, 10)!='NaN' && parseInt(req.query.Termino, 10)!='NaN' && parseInt(req.query.Data, 10)!='NaN' && parseInt(req.query.Sala, 10)!='NaN'){
            connection.query('SELECT * FROM reservas WHERE Sala = ? AND Data = ?', [parseInt(req.query.Sala, 10), parseInt(req.query.Data, 10)], function(err, result){
                if (err) throw err;
                for(var x=0;x<result.length;x++){
                    var inicioReuniao = result[x].Inicio.replace(/[:-]/g, '');
                    var terminoReuniao = result[x].Termino.replace(/[:-]/g, '');
                    if(inicio>=inicioReuniao && inicio<terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                    else if(termino>inicioReuniao && termino <=terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                    else if(inicio<=inicioReuniao && termino>=terminoReuniao){
                        flagError = true;
                        x=result.length+1;
                    }
                }
                if(!flagError){
                    connection.query('UPDATE reservas SET ? WHERE ID = ?', [req.query, req.query.ID], function(err, result){
                        if (err) throw err;
                        console.log('Updated, ID=' + req.query.ID);
                    });
                    res.sendStatus(200);
                }
                else {
                    console.log('Failed to insert, already exist reserve');
                    res.type('text/json');
                    res.status(403).send(errors.emptyField);
                }
=======
>>>>>>> validação
            });
        }
        else {
            console.log('Failed to insert, incorrect fields');
            res.type('text/json');
            res.status(403).send(errors.emptyField);
        }
    }
    else {
        console.log('Failed to insert, insuficient query');
        res.type('text/json');
        res.status(403).send(errors.emptyField);
    }
});

module.exports = incluir;