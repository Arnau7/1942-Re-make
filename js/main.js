var shooter1942 = shooter1942 || {};

var gameOptions = {
    gameWidth:  960,
    gameHeight: 540,
};

shooter1942.game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO,null,this,false,false);

//SCENES INCLUDE
shooter1942.game.state.add('level1',shooter1942.level1);
//STARTING SCENE
shooter1942.game.state.start('menu');