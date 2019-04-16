class Piper {
  constructor(x, y) {
    this.health = 2000;
    this.damage = 2000;
    this.range = 4;
    this.ms = 0.1;
    this.xPos = x;//location based on tile size (can be a fraction of a tile)
    this.yPos = y;
    this.userInput;
    // this.xRot;//rotation in degrees
    // this.yRot;
  }

  move(directions){

    if(directions != null) {
      this.xPos += directions['left'] * this.ms;
      this.xPos -= directions['right'] * this.ms;
      this.yPos += directions['down'] * this.ms;
      this.yPos -= directions['up'] * this.ms;
    }
  }
  UseUserInput(data){
    constructor.userInput = data;
    console.log(constructor.userInput)
  }
  Update(){
    console.log(constructor.userInput);
    this.move(constructor.userInput);
    return {"xpos":this.xPos, "ypos":this.yPos};
}

}


module.exports = Piper;
