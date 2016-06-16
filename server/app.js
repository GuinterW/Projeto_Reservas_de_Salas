//backend
var express = require('express');
var consulta = require("./routes/consulta");
var incluir = require("./routes/incluir");
var app= express();

app.use('/consulta', consulta);
app.use('/incluir', incluir);
//app.use('/', express.static('./public/index.html'));

app.get('/', function (req, res) {
    res.type('text/html');
    res.send('');
});

app.listen(3000, function () {
  console.log('Server on!');
});

