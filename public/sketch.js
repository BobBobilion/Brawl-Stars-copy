var socket;
function setup() {
  print('http://'+ServerInfo['ip']+":"+ServerInfo['port']+'/');
  createCanvas(800,800);
  socket = io.connect('http://'+ServerInfo['ip']+":"+ServerInfo['port']+'/');
  socket.on('newPoint',newPoint);
  noStroke();
}
function mouseDragged() {
  fill(0);
  ellipse(mouseX, mouseY, 30,30);
  socket.emit('mouse',{"x":mouseX,"y":mouseY});
}
function draw() {

}
function newPoint(data) {
  fill(255,0,0);
  ellipse(data['x'], data['y'], 30,30);
}
