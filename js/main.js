var shooter1942 = shooter1942 || {};

var gameOptions = {
    gameWidth:      336,
    gameHeight:     480,
    playerSpeed:    160,
    playerPosX:     0,
    playerPosY:     0,
    powerup_speed:  75,
    lives:          2,
    rolls:          3,
    score:           0,
    backgroundSpeed: 0,
    enemy1Speed:       110,
    enemy1BulletSpeed: 200,
    enemy2Speed:       100,
    bullet_playerSpeed: -400,
    bullet_enemySpeed: 200,
    immunity:       false,
    cameFromMenu:   false,
    playerRespawning: false
};

shooter1942.game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO,null,this,false,false);

//FONT
WebFontConfig = {
  active:function(){game.time.events.add( Phaser.Timer.SECOND,createText,this);},
  google:{
      families:['Press Start 2P']
  }  
};

//SCENES INCLUDE
shooter1942.game.state.add('level1',shooter1942.level1);
shooter1942.game.state.add('menu',shooter1942.menu);
shooter1942.game.state.add('menu_highscore',shooter1942.menu_highscore);
shooter1942.game.state.add('menu_credits',shooter1942.menu_credits);

//STARTING SCENE
shooter1942.game.state.start('menu');