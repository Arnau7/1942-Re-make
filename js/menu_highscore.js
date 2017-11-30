var shooter1942 = shooter1942 || {};

shooter1942.menu_highscore = {
    preload:function(){
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
         //this.load.audio('button','sound/sound_button.wav');
         this.load.audio('select','sound/sound_select.wav');
        
    },
    
    create:function(){
         //this.buttonSound = this.add.audio('button');
        this.buttonSelect = this.add.audio('select');
        
        //TEXT
        this.returnText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/1.1, 'Press ESC to return');
        
        //Ranking
        this.rankingText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/10, 'RANKING');
        this.rankingText.anchor.setTo(.5);
        this.rankingText.font = 'Press Start 2P';
        this.rankingText.fill = 'white';
        this.rankingText.fontSize = 30;
        //Value
        this.scoreText = this.game.add.text(30, gameOptions.gameHeight/5, 'YOUR SCORE:                      '+gameOptions.score);
        this.scoreText.anchor.setTo(0);
        this.scoreText.font = 'Press Start 2P';
        this.scoreText.fill = 'yellow';
        this.scoreText.fontSize = 18;
        
        //DEATH/COMPLETION TEXT
        if(gameOptions.lives < 0 && !gameOptions.cameFromMenu)
        {
            this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, 'GAME OVER');
            this.finalText.fill = 'red';
        }
        else if(gameOptions.lives >= 0 && !gameOptions.cameFromMenu)
        {
            this.returnText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/1.1, 'Press SPACEBAR to continue\nPress ESC to return');
            this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, 'LEVEL COMPLETED');
            this.finalText.fill = 'lightblue';
        }
        else if (gameOptions.cameFromMenu){
            this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, '');
        }
        this.finalText.anchor.setTo(0.5);
        this.finalText.font = 'Press Start 2P';
        this.finalText.fontSize = 18;
        
        this.returnText.anchor.setTo(.5);
        this.returnText.font = 'Press Start 2P';
        this.returnText.fill = 'lightgrey';
        this.returnText.fontSize = 24;
    },
    
    update:function(){
        if(this.escape.isDown){
            this.buttonSelect.play();
            gameOptions.cameFromMenu = false;
            this.state.start('menu');
        }
        if(!gameOptions.cameFromMenu){
            if(this.space.isDown && this.space.downDuration(1)){
                this.level2();
            }
        }
    },
    level2:function(){
        this.state.start('level2');
    }
};