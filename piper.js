class Piper {
  constructor(x, y) {
    constructor.health = 2000;
    constructor.damage = 2000;
    constructor.range = 4;
    constructor.ms = 0.1;
    constructor.xPos = x;//location based on tile size (can be a fraction of a tile)
    constructor.yPos = y;
    constructor.userInput;
    // constructor.xRot;//rotation in degrees
    // constructor.yRot;
  }

  move(directions){

    if(directions != null) {
      constructor.xPos += directions['left'] * constructor.ms;
      constructor.xPos -= directions['right'] * constructor.ms;
      constructor.yPos += directions['down'] * constructor.ms;
      constructor.yPos -= directions['up'] * constructor.ms;
    }
  }
  UseUserInput(data){
    constructor.userInput = data;
    console.log(constructor.userInput)
  }
  Update(){
    console.log(constructor.userInput);
    this.move(constructor.userInput);
    return {"xpos":constructor.xPos, "ypos":constructor.yPos};
}

}


module.exports = Piper;
