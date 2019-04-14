var express = require('express');

var socket = require('socket.io');

var app = express();
var server = app.listen(3000);
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

