const Showdown = require('./showdown');
const Piper = require('./piper');
const Colt = require('./colt');
const Shelly = require('./shelly');
var maxPlayers = 2;
var height = 800;
var width = 800;
var express = require('express');
var inMatchmaking = [];
var games = [];
var socket = require('socket.io');
var port = 3000;

var characters = [Piper,Colt,Shelly];//DISCLAIMER: COMPLETELY EXPERIMENTAL. DONT SCREAM AT ME WHEN IT FAILS. this is a refrence to the actuall object

var app = express();
var server = app.listen(port);
app.use(express.static('public'));
console.log("Server Started");

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
      console.log(data);
      var playerInfo = {
        "socket":socket,
        "characterId": data,
        "characterObject": new characters[data](width/2,height/2)
      }
      inMatchmaking.push(playerInfo);
      ScanForPossibleGames();
    }
  //socket.emit(label,data)
}
function draw() {
  console.log("i ran");
  for(var i = 0; i<games.length;i++){
    games[i].moveThem()
  }
}
