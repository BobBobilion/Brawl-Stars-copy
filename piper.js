class Piper {
  constructor(var x, var y) {
    this.health = 2000;
    this.damage = 2000;
    this.ms = 0.1;
    this.xPos = x;//location based on tile size (can be a fraction of a tile)
    thix.yPos = y;
    this.xRot;//rotation in degrees
    this.yRot;
  }

move(directions){
  this.xPos += directions.left*ms;
  this.xPos -= directions.right*ms;
  this.yPos += directions.down*ms;
  this.yPos -= directions.up*ms;
}

}

module.exports = Piper;
