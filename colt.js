class Colt {
  constructor(x, y) {
    this.health = 3000;
    this.damage = 3000;
    this.range = 2;
    this.ms = 0.1;
    this.xPos = x;//location based on tile size (can be a fraction of a tile)
    this.yPos = y;
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

module.exports = Colt;
