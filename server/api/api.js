//backend
module.exports = function(server) {

    var express = require('express');
    var consulta = require("../routes/consulta");
    var incluir = require("../routes/incluir");

    server.use('/consulta', consulta);
    server.use('/incluir', incluir);

    server.get('/', function (req, res) {
        res.type('text/html');
        res.send('');
    });

};