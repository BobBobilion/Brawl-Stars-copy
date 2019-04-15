// import 'maps/Showdown.js'
const Showdown = require('./showdown');
var maxPlayers = 2;
var express = require('express');
var inMatchmaking = [];
var games = [];
var socket = require('socket.io');
var port = 3000;

var app = express();
var server = app.listen(port);
app.use(express.static('public'));
console.log("hello");

var io = socket(server);

io.sockets.on('connection', newConnection);

function ScanForPossibleGames(){
  if(inMatchmaking.length == maxPlayers){
    console.log("GAME CREATED!");
    games.push(new Showdown(inMatchmaking));
    inMatchmaking = [];
  }
}
function newConnection(socket){
    console.log("new connection: " + socket.id);
    socket.on('PlayerRegistered', PlayerRegistered);
    function PlayerRegistered(data){
      console.log("Character ID: "+data);
      var playerInfo = {
        "socket":socket,
        "charachterId": data
      }
      inMatchmaking.push(playerInfo);
      ScanForPossibleGames();
    }
}
