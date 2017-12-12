var shooter1942 = shooter1942 || {};

shooter1942.menu_credits = {
    preload:function(){
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.one = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.two = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.three = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        
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
        this.rankingText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/10, 'CREDITS');
        this.rankingText.anchor.setTo(.5);
        this.rankingText.font = 'Press Start 2P';
        this.rankingText.fill = 'white';
        this.rankingText.fontSize = 30;
        //MID TEXT
        this.text = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/2, "Made by: Boji's Team\n\n"+"Arnau Ruiz\n"+"Miquel Oliver\n"+"Miquel Ripoll");
        this.text.anchor.setTo(.5);
        this.text.font = 'Press Start 2P';
        this.text.fill = 'white';
        this.text.fontSize = 22;
    },
    
    update:function(){
        if(this.escape.isDown){
            this.buttonSelect.play();
            this.state.start('menu');
        }
        else if(this.one.isDown){
            this.buttonSelect.play();
            this.state.start('level1');
        }
        else if(this.two.isDown){
            this.buttonSelect.play();
            this.state.start('level2');
        }
        else if(this.three.isDown){
            this.buttonSelect.play();
            this.state.start('level3');
        }
    }
};