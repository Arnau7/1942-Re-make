var shooter1942 = shooter1942 || {};

var gameOptions = {
    gameWidth:  640,
    gameHeight: 480,
    playerSpeedX: 10,
    playerSpeedY: 10,
};

shooter1942.game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO,null,this,false,false);

//SCENES INCLUDE
shooter1942.game.state.add('level1',shooter1942.level1);
shooter1942.game.state.add('menu',shooter1942.menu);
//STARTING SCENE
shooter1942.game.state.start('menu');