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
      var playerCountReference = await database.ref("playerCount").once("value");
      if(playerCountReference.exits()){
        playerCount = playerCountReference.val();
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }

play(){
  form.hideDom();
  text("Game Started",150,80);
  Player.getPlayerInfo();
  for (var plr in allPlayers){
    if(plr === "player " + player.index){
        fill("red")
    }else{
      fill("black")
    }
    text(allPlayers[plr].name+": "+allPlayers[plr].distance,100,100)
      }
  if(keyDown(UP_ARROW)&&player.index != null){
    player.distance +=10;
    player.update();
  }
}
};
