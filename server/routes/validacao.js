function Validacao () {
    this.inicio;
    this.termino;
    this.data;
    this.errors = {
        errorName: {
            message: 'error'
        }
    };
};

Validacao.prototype.setError = function(res, code, messageError){
    res.type('text/json');
    res.status(code).send(messageError);
};

Validacao.prototype.hasAffectedRows = function(req, res, result){
    if(result.affectedRows>0){
        return true;
    }
    else {
        this.setError(res, 404, this.errors.name);
        return false;
    }
}

Validacao.prototype.hasQuery = function(req, res){
    if(req.query.hasOwnProperty('Sala') && req.query.hasOwnProperty('Inicio') && req.query.hasOwnProperty('Termino') && req.query.hasOwnProperty('Data')){
        return true;
    }
    else {
        this.setError(res, 404, this.errors.name);
        return false;
    }
};

Validacao.prototype.hasParams = function(req, res){
    if(req.params.hasOwnProperty('Sala') && req.params.hasOwnProperty('Ano')){
        return true;
    }
    else {
        this.setError(res, 404, this.errors.name);
        return false;
    }
};

Validacao.prototype.hasCorrectFields = function(req, res){
    this.inicio = req.query.Inicio.replace(/[:-]/g, '');
    this.termino = req.query.Termino.replace(/[:-]/g, '');
    this.data = req.query.Data.replace(/[:-]/g, '');
    if(this.inicio.length>=5 && this.termino.length>=5 && this.data.length==8 && req.query.Sala.length==1 && parseInt(this.inicio, 10)!='NaN' && parseInt(this.termino, 10)!='NaN' && parseInt(this.data, 10)!='NaN' && parseInt(req.query.Sala, 10)!='NaN'){
        return true;
    }
    else {
        this.setError(res, 404, this.errors.name);
        return false;
    }
}

Validacao.prototype.hasTimeConflict = function(req, res, result){
    for(var x=0;x<result.length;x++){
        var inicioReuniao = result[x].Inicio.replace(/[:-]/g, '');
        var terminoReuniao = result[x].Termino.replace(/[:-]/g, '');
        if(this.inicio>=inicioReuniao && this.inicio<terminoReuniao){
            this.setError(res, 404, this.errors.name);
            return true;
        }
        else if(this.termino>inicioReuniao && this.termino<=terminoReuniao){
            this.setError(res, 404, this.errors.name);
            return true;
        }
        else if(this.inicio<=inicioReuniao && this.termino>=terminoReuniao){
            this.setError(res, 404, this.errors.name);
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = new Validacao();