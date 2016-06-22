//backend
module.exports = function(server) {

    var express = require('express');
    var Search = require("../routes/search");
    var Insert = require("../routes/insert");
    var Delete = require("../routes/delete");

    server.use('/search', Search);
    server.use('/insert', Insert);
    server.use('/delete', Delete);

    server.get('/', function (req, res) {
        res.type('text/html');
        res.send('');
    });

};