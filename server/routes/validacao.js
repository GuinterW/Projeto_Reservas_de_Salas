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

Validacao.prototype.setValues = function(req){
    this.inicio = req.query.Inicio.replace(/[:-]/g, '');
    this.termino = req.query.Termino.replace(/[:-]/g, '');
    this.data = req.query.Data.replace(/[:-]/g, '');
    this.ano = parseInt(req.params.Ano, 10);
    this.mes = parseInt(req.params.Mes, 10);
    this.dia = parseInt(req.params.Dia, 10);
    this.paramsLength = req.params.length;
};

Validacao.prototype.hasAffectedRows = function(res, result){
    if(result.affectedRows>0){
        return true;
    }
    else {
        this.setError(res, 404, this.erros.notFound);
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
    this.setValues(req);
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
    this.setValues(req);
    if(this.inicio.length>=5 && this.termino.length>=5 && this.data.length==8 && req.query.Sala.length==1 && parseInt(this.inicio, 10)!='NaN' && parseInt(this.termino, 10)!='NaN' && parseInt(this.data, 10)!='NaN' && parseInt(req.query.Sala, 10)!='NaN'){
        return true;
    }
    else {
        this.setError(res, 400, this.errors.incorrectParams);
        return false;
    }
};

Validacao.prototype.hasCorrectParamsFields = function(req, res){
    this.setValues(req);
    switch(this.paramsLength){
        case 2:
            if(this.ano.length==4 && this.ano!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
        case 3:
            if(this.ano.length==4 && this.mes.length==2 && this.ano!='NaN' && this.mes!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
        case 4:
            if(this.ano.length==4 && this.mes.length==2 && this.dia.length==2 && this.ano!='NaN' && this.mes!='NaN' && this.dia!='NaN'){
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