class Showdown{

  //0 is ground
  //1 is wall
  //2 is bush
  //3 is water

  constructor(players){
    this.players = players;
    this.world = [
      [1,1,1,1,1,1,1,1],
      [1,2,0,0,0,3,3,1],
      [1,0,1,1,0,0,3,1],
      [1,0,1,2,0,0,0,1],
      [1,0,0,0,2,1,0,1],
      [1,3,0,0,1,1,0,1],
      [1,3,3,0,0,0,2,1],
      [1,1,1,1,1,1,1,1]
    ];
    this.sendToAllPlayers("GameCreated", this.world);
  }

   sendToAllPlayers(event, data){
    for(var i = 0; i<this.players.length; i++){
      this.players[i]["socket"].emit(event,data)
    }
  }
}
module.exports = Showdown;
