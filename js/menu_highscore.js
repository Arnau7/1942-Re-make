var shooter1942 = shooter1942 || {};

shooter1942.menu_highscore = {
    preload:function(){
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
         //this.load.audio('button','sound/sound_button.wav');
         this.load.audio('select','sound/sound_select.wav');
        
    },
    
    create:function(){
         //this.buttonSound = this.add.audio('button');
        this.buttonSelect = this.add.audio('select');
        
        //TEXT
         this.returnText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/1.1, 'Press ESC to return');
        this.returnText.anchor.setTo(.5);
        this.returnText.font = 'Press Start 2P';
        this.returnText.fill = 'lightgrey';
        this.returnText.fontSize = 24;
        //Ranking
        this.rankingText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/10, 'RANKING');
        this.rankingText.anchor.setTo(.5);
        this.rankingText.font = 'Press Start 2P';
        this.rankingText.fill = 'white';
        this.rankingText.fontSize = 30;
    },
    
    update:function(){
        if(this.escape.isDown){
            this.buttonSelect.play();
            this.state.start('menu');
        }
    }
};