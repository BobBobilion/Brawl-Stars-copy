var socket;
var height = 800;
var width = 800;
var tileSize = 100;
var inPlayerSelection = true;
var inGame = false;
var world;
var sceneInfo;
var userInput = {
  'up': 0,
  "down": 0,
  "right": 0,
  "left": 0,
  "mouseAngle": 0,
  "click": false
};
var playerList = [
  'piper',//Blue
  'colt',//Green
  'shelly'//Red
];
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
  socket.on('SceneUpdate',updateScene);
  socket.on('WorldUpdate',updateWorld());
}
function updateScene(data){
  sceneInfo = data;
}
function updateWorld(data){
  world = data;
}

function GameInitialized(data){
  inGame = true;
  updateWorld(data);
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
    DrawScene(sceneInfo);
    UpdateUserInput();
    ReportToServer(userInput)//sends all of the necessary stuff to the server
  }
}
function DrawScene(sceneInfo) {
  // temporary drawing mechanism, will be fixed later;
  // var self= sceneInfo["self"];
  // fill(0);
  // ellipse(self['xpos']*tileSize,self['ypos']*tileSize,tileSize/3, tileSize/3);
  if(sceneInfo != null) {
    var otherPlayers = sceneInfo["other players"];
    if (otherPlayers != null) {
      for (let i = 0; i < otherPlayers.length; i++) {
        fill(255, 0, 0);
        console.log(otherPlayers[i]['xpos'] + " - "+otherPlayers[i]['ypos']);
        ellipse(otherPlayers[i]['xpos'], otherPlayers[i]['ypos'], tileSize / 3, tileSize / 3);
      }
    }
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

function UpdateUserInput(){//check to see what the user is pressing
  if (keyIsDown(68)) {//d
    userInput['left'] = 1;
  }else{
    userInput['left'] = 0;
  }
  if (keyIsDown(65)) {//a
    userInput['right'] = 1;
  }else{
    userInput['right'] = 0;
  }
  if (keyIsDown(87)) {//w
    userInput['up'] = 1;
  }else{
    userInput['up'] = 0;
  }
  if (keyIsDown(83)){//s
    userInput['down'] = 1;
  }else{
    userInput['down'] = 0;
  }
}

function mouseClicked(){
  if(inGame){
    this.angle = atan((mouseX-width/2)/(mouseY-height/2))+90;//get the angle of mouse relative to the player
    if(mouseX < width/2){
      userInput['mouseAngle'] = this.angle+180;
    }else{
      userInput['mouseAngle'] = this.angle;
    }
    userInput['mouseClicked'] = true;
  }
}

function ReportToServer(directions){
  socket.emit("UserInput", directions);
  directions['mouseClicked'] = false;
}
