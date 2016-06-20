var express = require('express');
var incluir = express.Router();
var mysql = require('mysql');
var validacao = require('./validacao');
var connection = mysql.createConnection({
    host     : '192.168.1.117',
    user     : 'me',
    password : 'secret',
    database : 'reservas'
});

incluir.post('/', function(req, res) {
    validacao(req, res, connection, 'insert');
});

incluir.put('/', function(req, res) {
    validacao(req, res, connection, 'update');
});

module.exports = incluir;