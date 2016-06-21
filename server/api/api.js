//backend
module.exports = function(server) {

    var express = require('express');
    var search = require("../routes/search");
    var insert = require("../routes/insert");

    server.use('/search', search);
    server.use('/insert', insert);

    server.get('/', function (req, res) {
        res.type('text/html');
        res.send('');
    });

};