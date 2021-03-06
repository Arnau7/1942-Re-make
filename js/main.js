var shooter1942 = shooter1942 || {};

var gameOptions = {
    level:              0,
    gameWidth:          336,
    gameHeight:         480,
    playerSpeed:        160,
    playerPosX:         0,
    playerPosY:         0,
    powerup_speed:      75,
    lives:              2,      //Number of lives of the player
    rolls:              3,      //Number of rolls the player can perform
    score:              0,      //Points gained during a level
    highscore:          0,
    backgroundSpeed:    0,    
    enemy1Speed:        130,
    enemy1BulletSpeed:  180,
    enemy2Speed:        100,
    enemy3Speed:        -70,
    bossSpeed:          100,
    bossBulletsSpeed:   150,
    bullet_playerSpeed: -400,
    bullet_enemySpeed:  180,
    totalDeaths:        0,      //Increases for every death
    immunity:           false,  //Makes player immune to all damage
    threshold:          false,  //Allows chain of rolls before player immunity expires
    cameFromMenu:       0,      //Checks if came from a menu(0) or a level(1),(2),(3)
    playerRespawning:   false,  //Checks if between death and respawn
    enemy3Killed:       0,      //Used to count enemy3 killed
    totalEnemiesSpawned:0,      //(ONLY USE IF REUSING ENEMIES) Used to count enemies spawned in a level 
    totalEnemiesKilled: 0,      //Used to count enemies killed in a level
    accuracy:           0,      //Rating: enemies killed / enemies respawned * 100
    developer:          true    //Used to unlock "L" and "R" buttons in levels
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
shooter1942.game.state.add('level2',shooter1942.level2);
shooter1942.game.state.add('level3',shooter1942.level3);
shooter1942.game.state.add('menu',shooter1942.menu);
shooter1942.game.state.add('menu_highscore',shooter1942.menu_highscore);
shooter1942.game.state.add('menu_credits',shooter1942.menu_credits);


//STARTING SCENE
shooter1942.game.state.start('menu');