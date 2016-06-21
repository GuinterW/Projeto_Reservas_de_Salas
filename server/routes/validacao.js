function Validacao () {
    this.inicio;
    this.termino;
    this.data;
    this.ano;
    this.mes;
    this.dia;
    this.paramsLength;
    this.errors = {
        insufficientParams: {
            message: "Don't have enough parameters."
        },
        incorrectParams: {
            message: 'Incorrect parameters value.'
        },
        invalidTime: {
            message: 'Already exist a meeting in this time range.'
        },
        notFound: {
            message: "Can't found a result."
        }
    };
};

Validacao.prototype.setError = function(res, code, messageError){
    res.type('text/json');
    res.status(code).send(messageError);
};

Validacao.prototype.setQueryValues = function(req){
    this.inicio = req.query.Inicio.replace(/[:-]/g, '');
    this.termino = req.query.Termino.replace(/[:-]/g, '');
    this.data = req.query.Data.replace(/[:-]/g, '');
};

Validacao.prototype.setParamsValues = function(req){
    this.ano = parseInt(req.params.Ano, 10);
    this.mes = parseInt(req.params.Mes, 10);
    this.dia = parseInt(req.params.Dia, 10);
    this.paramsLength = this.setParamsLength(req);
};

Validacao.prototype.setParamsLength = function(req){
    var x = 0;
    if(req.params.hasOwnProperty('Sala')){
        x++;
    }
    if(req.params.hasOwnProperty('Ano')){
        x++;
    }
    if(req.params.hasOwnProperty('Mes')){
        x++;
    }
    if(req.params.hasOwnProperty('Dia')){
        x++;
    }
    return x;
}

Validacao.prototype.hasAffectedRows = function(res, result){
    if(result.affectedRows>0){
        return true;
    }
    else {
        this.setError(res, 404, this.errors.notFound);
        return false;
    }
};

Validacao.prototype.hasQuery = function(req, res){
    if(req.query.hasOwnProperty('Sala') && req.query.hasOwnProperty('Inicio') && req.query.hasOwnProperty('Termino') && req.query.hasOwnProperty('Data')){
        return true;
    }
    else {
        this.setError(res, 412, this.errors.insufficientParams);
        return false;
    }
};

Validacao.prototype.hasParams = function(req, res){
<<<<<<< 6eecb05981f5858d03aeaaba16b07b6c5630c3e3
<<<<<<< 41d0bcbb213ac7dea0463d36bce48a65681441e7
    this.setParamsValues(req);
=======
    setParamsValues(req);
>>>>>>> ajuste função setValues
=======
    setParamsValues(req);
>>>>>>> pull
    switch(this.paramsLength){
        case 2:
            if(req.params.hasOwnProperty('Sala') && req.params.hasOwnProperty('Ano')){
                return true;
            }
            else {
                this.setError(res, 412, this.errors.insufficientParams);
                return false;
            }
            break;
        case 3:
            if(req.params.hasOwnProperty('Sala') && req.params.hasOwnProperty('Ano') && req.params.hasOwnProperty('Mes')){
                return true;
            }
            else {
                this.setError(res, 412, this.errors.insufficientParams);
                return false;
            }
            break;
        case 4:
            if(req.params.hasOwnProperty('Sala') && req.params.hasOwnProperty('Ano') && req.params.hasOwnProperty('Mes') && req.params.hasOwnProperty('Dia')){
                return true;
            }
            else {
                this.setError(res, 412, this.errors.insufficientParams);
                return false;
            }
            break;
    }
};

Validacao.prototype.hasCorrectQueryFields = function(req, res){
    this.setQueryValues(req);
    if(this.inicio.length>=5 && this.termino.length>=5 && this.data.length==8 && req.query.Sala.length==1 && parseInt(this.inicio, 10)!='NaN' && parseInt(this.termino, 10)!='NaN' && parseInt(this.data, 10)!='NaN' && parseInt(req.query.Sala, 10)!='NaN'){
        return true;
    }
    else {
        this.setError(res, 400, this.errors.incorrectParams);
        return false;
    }
};

Validacao.prototype.hasCorrectParamsFields = function(req, res){
    this.setParamsValues(req);
    switch(this.paramsLength){
        case 2:
            if(req.params.Ano.length==4 && this.ano!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
        case 3:
            if(req.params.Ano.length==4 && req.params.Mes.length<=2 && this.ano!='NaN' && this.mes!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
        case 4:
            if(req.params.Ano.length==4 && req.params.Mes.length<=2 && req.params.Dia.length<=2 && this.ano!='NaN' && this.mes!='NaN' && this.dia!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
    }
};

Validacao.prototype.hasTimeConflict = function(res, result){
    for(var x=0;x<result.length;x++){
        var inicioReuniao = result[x].Inicio.replace(/[:-]/g, '');
        var terminoReuniao = result[x].Termino.replace(/[:-]/g, '');
        if(this.inicio>=inicioReuniao && this.inicio<terminoReuniao){
            this.setError(res, 409, this.errors.invalidTime);
            return true;
        }
        else if(this.termino>inicioReuniao && this.termino<=terminoReuniao){
            this.setError(res, 409, this.errors.invalidTime);
            return true;
        }
        else if(this.inicio<=inicioReuniao && this.termino>=terminoReuniao){
            this.setError(res, 409, this.errors.invalidTime);
            return true;
        }
        else {
            return false;
        }
    }
};

module.exports = new Validacao();