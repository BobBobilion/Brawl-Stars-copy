var express = require('express');

var socket = require('socket.io');
var port = 3000;

var app = express();
var server = app.listen(port);
app.use(express.static('public'));
console.log("hello");

var io = socket(server);

io.sockets.on('connection', newConnection);


function newConnection(socket){
    console.log("new connection: " + socket.id);
    socket.on('mouse',onMouseMoved);
    function onMouseMoved(data){
        console.log(data);
        socket.broadcast.emit('newPoint',data);
    }
}

