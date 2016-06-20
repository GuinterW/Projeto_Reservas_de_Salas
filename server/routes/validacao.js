var errors = {
    emptyField: {
        message: 'Error'
    }
}

module.exports = function(req, res, connection, type) {
    switch(type){
        case 'insert': 
            var selectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
            var insertQuery = 'INSERT INTO reservas SET ?';
            break;
        case 'update':
            var selectQuery = 'SELECT * FROM reservas WHERE Sala = ? AND Data = ?';
            var insertQuery = 'UPDATE reservas SET ? WHERE ID = ?';
            break;
    };

    if(req.query.hasOwnProperty('Sala') && req.query.hasOwnProperty('Inicio') && req.query.hasOwnProperty('Termino') && req.query.hasOwnProperty('Data')){
        var inicio = req.query.Inicio.replace(/[:-]/g, '');
        var termino = req.query.Termino.replace(/[:-]/g, '');
        var data = req.query.Data.replace(/[:-]/g, '');
        var flagError = false;
        if(inicio.length>=5 && termino.length>=5 && data.length==8 && req.query.Sala.length==1 && parseInt(req.query.Inicio, 10)!='NaN' && parseInt(req.query.Termino, 10)!='NaN' && parseInt(req.query.Data, 10)!='NaN' && parseInt(req.query.Sala, 10)!='NaN'){
            connection.query(selectQuery, [parseInt(req.query.Sala, 10), parseInt(data, 10)], function(err, result){
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
                    connection.query(insertQuery, [req.query, req.query.ID], function(err, result){
                        if (err) throw err;
                        if(result.affectedRows>0){
                            console.log('Inserted, ID=' + result.insertId);
                            res.sendStatus(200);
                        }
                        else {
                            console.log('Failed to insert, invalid ID');
                            res.status(403).send(errors.emptyField);
                        }
                    });
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
    }
    else {
        console.log('Failed to insert, insuficient query');
        res.type('text/json');
        res.status(403).send(errors.emptyField);
    }
};