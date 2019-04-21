function print(text){
  console.log(text);
}


class Colt {

  constructor(x, y, socket) {
    this.health = 3000;
    this.damage = 3000;
    this.range = 3;
    this.ms = 0.03;
    this.xPos = x;//location based on tile size (can be a fraction of a tile)
    this.yPos = y;
    this.userInput;
    this.socket = socket;
    this.socket.on("UserInput",(function(data) {this.UseUserInput(data)}).bind(this));
    // this.xRot;//rotation in degrees
    // this.yRot;
  }
  UseUserInput(data){
    this.userInput = data;
    print(this.userInput);
  }
  move(directions){
    if(directions != null) {
      this.xPos += directions['left'] * this.ms;
      this.xPos -= directions['right'] * this.ms;
      this.yPos += directions['down'] * this.ms;
      this.yPos -= directions['up'] * this.ms;
    }
  }
  // UseUserInput(data){
  //   this.userInput = 1;
  // }
  Update(){
    print(this.userInput);
    this.move(this.userInput);
    return {"xpos":this.xPos, "ypos":this.yPos};
}

}


module.exports = Colt;
