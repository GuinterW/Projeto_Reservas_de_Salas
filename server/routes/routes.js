module.exports = function(server) {
    // Defining all the routes
    server.get('/', function(req, res) {
        res.render('login.html');
    });
    server.get('/home', function(req, res) {
        res.render('index.html');
    });
};