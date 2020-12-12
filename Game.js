class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerRef=await database.ref('playerCount').once("value");
      if(playerRef.exists())
      {
        playerCount=playerRef.val();
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(35);
    text("GAME START",120,100);
    Player.getInfo();

    if(allPlayers !== undefined){
      var position=130;
      for(var plr in allPlayers)
      {
        console.log("in player");
        if(plr === "player" + player.index){
        fill("red");}
        else{
          fill("black");
         position=position+20
          textSize(15);
          text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,position);
        }
      }
      if(keyIsDown(UP_ARROW)&& player.index!==null)
      {
        player.distance+=50;
        player.update();
      }
    }
  }
}
