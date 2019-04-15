var socket;
var tileSize = 100;
var inPlayerSelection = true;
var inGame = false;
var world;
var directions = {
  'up': 0,
  "down": 0,
  "right": 0,
  "left": 0,
  "mouse": 0,
  "click": 0
}
var playerList = [
  'piper',//Blue
  'colt',//Green
  'shelly'//Red
]
var chosenPlayer = null;
var serverLink;
function setup() {
  serverLink = 'http://'+ServerInfo['ip']+":"+ServerInfo['port']+'/';
  createCanvas(800,800);

  noStroke();
}

function ConnectToServer(serverLink){
  socket = io.connect(this.serverLink);
  hookUpSocket(socket)
}

function hookUpSocket(socket){
  socket.on("GameCreated", GameInitialized);
}

function GameInitialized(data){
  inGame = true;
  world = data;
}
function RegisterPlayer(chosenPlayer){
  ConnectToServer(serverLink);
  socket.emit("PlayerRegistered", this.chosenPlayer);
  inPlayerSelection = false;
}
function draw() {
  if(inPlayerSelection){
    drawPlayerSelection();
  }else if(inGame){
    DrawMap();
    CheckForMove();
    ReportToServer(directions)//sends all of the necessary stuff to the server
  }

}

function drawPlayerSelection(){
  background(255);
  for(var i = 0; i < playerList.length; i++){
    if(chosenPlayer === i){
      fill(255,0,0)
    }else{
      fill(0,0,0)
    }
    text((i+1)+"."+playerList[i], 100, i*20+100);
  }
}

function keyTyped(){
  if(inPlayerSelection){
    if(keyCode == 13){
      console.log("Registered!")
      RegisterPlayer(chosenPlayer);
    }else{
      console.log("selected");
      chosenPlayer = int(key)-1;
    }
  }
}

function DrawMap(){
  for(var i = 0; i < world.length; i++){
    for(var j = 0; j < world[1].length; j++){
      if(world[i][j] == 1){
        fill(205,133,63);
      }else if(world[i][j] == 2){
        fill(154,205,50);
      }else if(world[i][j] == 3){
        fill(32,178,170);
      }else{
        fill(255,222,173)
      }
      rect(tileSize*j,tileSize*i,tileSize,tileSize);
    }
  }
}

function CheckForMove(){
  if (keyIsDown(68)) {
    directions['left'] = 1;
  }
  if (keyIsDown(65)) {
    directions['right'] = 1;
  }
  if (keyIsDown(87)) {
    directions['up'] = 1;
  }
  if (keyIsDown(83)){
    directions['down'] = 1;
  }
}

function mouseClicked(){
  if(inGame){

  }
}

function ReportToServer(directions){
  socket.emit("Directions", directions);
}
