function Validation () {
    this.startMeeting;
    this.endMeeting;
    this.date;
    this.year;
    this.month;
    this.day;
    this.paramsQuantity;
    this.today = new Date();
    this.errors = {
        insufficientParams: {
            message: "Don't have enough parameters."
        },
        incorrectParams: {
            message: 'Incorrect parameters value.'
        },
        timeConflict: {
            message: 'Already exist a meeting in this time range.'
        },
        invalidTime: {
            message: 'Invalid time range.'
        },
        invalidDate: {
            message: 'Invalid date.'
        },
        notFound: {
            message: "Can't found a result."
        }
    };
};

Validation.prototype.setError = function(res, code, messageError){
    res.type('text/json');
    res.status(code).send(messageError);
};

Validation.prototype.setQueryValues = function(req){
    this.startMeeting = req.query.Start.replace(/[:-]/g, '');
    this.endMeeting = req.query.End.replace(/[:-]/g, '');
    this.date = req.query.Date.replace(/[:-]/g, '');
    this.year = parseInt(this.date.substring(0,4));
    this.month = parseInt(this.date.substring(4,6));
    this.day = parseInt(this.date.substring(6,8));
};

Validation.prototype.setParamsValues = function(req){
    this.year = parseInt(req.params.Year, 10);
    this.month = parseInt(req.params.Month, 10);
    this.day = parseInt(req.params.Day, 10);
    this.paramsQuantity = this.setParamsQuantity(req);
};

Validation.prototype.setParamsQuantity = function(req){
    var x = 0;
    if(req.params.hasOwnProperty('Room')){
        x++;
    }
    if(req.params.hasOwnProperty('Year')){
        x++;
    }
    if(req.params.hasOwnProperty('Month')){
        x++;
    }
    if(req.params.hasOwnProperty('Day')){
        x++;
    }
    return x;
}

Validation.prototype.hasCorrectTime = function(res){
    if(parseInt(this.endMeeting, 10)<=parseInt(this.startMeeting, 10)){
        this.setError(res, 400, this.errors.invalidTime);
        return false;
    }
    else {
        return true;
    }
}

Validation.prototype.hasCorrectDate = function(res){
    if(this.year<this.today.getFullYear()){
        this.setError(res, 400, this.errors.invalidDate);
        return false;
    }
    else if(this.year==this.today.getFullYear() && this.month<this.today.getMonth() + 1){
        this.setError(res, 400, this.errors.invalidDate);
        return false;
    }
    else if(this.year==this.today.getFullYear() && this.month==this.today.getMonth() + 1 && this.day==this.today.getDate()){
        this.setError(res, 400, this.errors.invalidDate);
        return false;
    }
    else {
        return true;
    }
}

Validation.prototype.hasAffectedRows = function(res, result){
    if(result.affectedRows>0){
        return true;
    }
    else {
        this.setError(res, 404, this.errors.notFound);
        return false;
    }
};

Validation.prototype.hasURLQuery = function(req, res){
    if(req.query.hasOwnProperty('Room') && req.query.hasOwnProperty('Start') && req.query.hasOwnProperty('End') && req.query.hasOwnProperty('Date')){
        return true;
    }
    else {
        this.setError(res, 412, this.errors.insufficientParams);
        return false;
    }
};

Validation.prototype.hasURLParams = function(req, res){
    switch(this.paramsQuantity){
        case 2:
            if(req.params.hasOwnProperty('Room') && req.params.hasOwnProperty('Year')){
                return true;
            }
            else {
                this.setError(res, 412, this.errors.insufficientParams);
                return false;
            }
            break;
        case 3:
            if(req.params.hasOwnProperty('Room') && req.params.hasOwnProperty('Year') && req.params.hasOwnProperty('Month')){
                return true;
            }
            else {
                this.setError(res, 412, this.errors.insufficientParams);
                return false;
            }
            break;
        case 4:
            if(req.params.hasOwnProperty('Room') && req.params.hasOwnProperty('Year') && req.params.hasOwnProperty('Month') && req.params.hasOwnProperty('Day')){
                return true;
            }
            else {
                this.setError(res, 412, this.errors.insufficientParams);
                return false;
            }
            break;
    }
};

Validation.prototype.hasCorrectURLQueryFields = function(req, res){
    if(this.startMeeting.length>=5 && this.endMeeting.length>=5 && this.date.length==8 && req.query.Room.length==1 && parseInt(this.startMeeting, 10)!='NaN' && parseInt(this.endMeeting, 10)!='NaN' && parseInt(this.date, 10)!='NaN' && parseInt(req.query.Room, 10)!='NaN'){
        return true;
    }
    else {
        this.setError(res, 400, this.errors.incorrectParams);
        return false;
    }
};

Validation.prototype.hasCorrectURLParamsFields = function(req, res){
    switch(this.paramsQuantity){
        case 2:
            if(req.params.Year.length==4 && this.year!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
        case 3:
            if(req.params.Year.length==4 && req.params.Month.length<=2 && this.year!='NaN' && this.month!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
        case 4:
            if(req.params.Year.length==4 && req.params.Month.length<=2 && req.params.Day.length<=2 && this.year!='NaN' && this.month!='NaN' && this.day!='NaN'){
                return true;
            }
            else {
                this.setError(res, 400, this.errors.incorrectParams);
                return false;
            }
            break;
    }
};

Validation.prototype.hasTimeConflict = function(res, result){
    for(var x=0;x<result.length;x++){
        var startMeetingExistent = result[x].Start.replace(/[:-]/g, '');
        var endMeetingExistent = result[x].End.replace(/[:-]/g, '');
        if(this.startMeeting>=startMeetingExistent && this.startMeeting<endMeetingExistent){
            this.setError(res, 409, this.errors.timeConflict);
            return true;
        }
        else if(this.endMeeting>startMeetingExistent && this.endMeeting<=endMeetingExistent){
            this.setError(res, 409, this.errors.timeConflict);
            return true;
        }
        else if(this.startMeeting<=startMeetingExistent && this.endMeeting>=endMeetingExistent){
            this.setError(res, 409, this.errors.timeConflict);
            return true;
        }
        else {
            return false;
        }
    }
};

module.exports = new Validation();