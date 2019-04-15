var socket;
var height = 800;
var width = 800;
var tileSize = 100;
var inPlayerSelection = true;
var inGame = false;
var world;
var directions = {
  'up': 0,
  "down": 0,
  "right": 0,
  "left": 0,
  "mouseAngle": 0,
  "click": false
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
function draw() { //*****************************************************  DRAW  ******************************************************\\
  if(inPlayerSelection){
    drawPlayerSelection();
  }else if(inGame){
    DrawMap();
    CheckForMove();
    socket.on('Draw',DrawCharacter);

    ReportToServer(directions)//sends all of the necessary stuff to the server
  }
  console.log("i did");

}

function DrawCharacter(characterInfo){
  fill(255);
  console.log("drawing");
  ellipse(characterInfo.xPos,characterInfo.yPos,tileSize/2,tileSize/2);
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

function CheckForMove(){//check to see what the user is pressing
  if (keyIsDown(68)) {//d
    directions['left'] = 1;
  }else{
    directions['left'] = 0;
  }
  if (keyIsDown(65)) {//a
    directions['right'] = 1;
  }else{
    directions['right'] = 0;
  }
  if (keyIsDown(87)) {//w
    directions['up'] = 1;
  }else{
    directions['up'] = 0;
  }
  if (keyIsDown(83)){//s
    directions['down'] = 1;
  }else{
    directions['down'] = 0;
  }
}

function mouseClicked(){
  if(inGame){
    this.angle = atan((mouseX-width/2)/(mouseY-height/2))+90;//get the angle of mouse relative to the player
    if(mouseX < width/2){
      directions['mouseAngle'] = this.angle+180;
    }else{
      directions['mouseAngle'] = this.angle;
    }
    directions['mouseClicked'] = true;
  }
}

function ReportToServer(directions){
  socket.emit("Directions", directions);
  directions['mouseClicked'] = false;
}
