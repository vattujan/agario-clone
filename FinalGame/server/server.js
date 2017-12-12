
// Parameters
var sitePath = process.argv[2] || ".";
// var port = 4200;
const port = process.env.PORT || 4200;
 
// Libraries
var express = require('express');
path = require();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
 
// Request logging
app.use(function(req, res, next) {
    console.log(req.url);
    next();
});
 
// Start server
console.log(sitePath);
console.log("Starting server in: " + __dirname + '/' + sitePath);
app.use(express.static(__dirname + '/' + sitePath));
app.listen(port, function() { 
    console.log("Server running at: http://localhost:" + port)
});

require('./routes/io.js')(app, io);