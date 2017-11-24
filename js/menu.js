var shooter1942 = shooter1942 || {};
var id = 0;
var minId = 0;
var maxId = 2;

shooter1942.menu = {
    preload:function(){
        this.load.image('title','img/title.jpg');
        this.load.image('playButton','img/button_play.png');
        
         //KEYS
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        this.load.audio('button','sound/sound_button.wav');
        this.load.audio('select','sound/sound_select.wav');
        this.load.audio('play','sound/sound_play.wav');
    },
    
    create:function(){
        //BACKGROUND
        this.game.stage.backgroundColor = "000000";
        this.title = this.game.add.image(this.game.world.centerX,100,'title');
        this.title.anchor.setTo(.5);
        this.title.scale.setTo(.5);
        
        //BUTTON PLAY
        /*this.button = this.game.add.button(this.game.world.centerX, this.game.world.centerY,'playButton', this.startGame, this);
        this.button.anchor.setTo(.5);
        this.button.scale.setTo(.1);*/
        
        this.buttonSound = this.add.audio('button');
        this.buttonSelect = this.add.audio('select');
        this.buttonPlay = this.add.audio('play');
        
        //TEXT BUTTONS

        //PLAY
        this.playText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'PLAY');
        this.playText.anchor.setTo(.5);
        this.playText.font = 'Press Start 2P';
        this.playText.fill = 'white';
        this.playText.fontSize = 30;
        //Ranking
        this.rankingText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/2+40, 'RANKING');
        this.rankingText.anchor.setTo(.5);
        this.rankingText.font = 'Press Start 2P';
        this.rankingText.fill = 'white';
        this.rankingText.fontSize = 30;
           //Credits
        this.creditsText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/2+80, 'CREDITS');
        this.creditsText.anchor.setTo(.5);
        this.creditsText.font = 'Press Start 2P';
        this.creditsText.fill = 'white';
        this.creditsText.fontSize = 30;
        
        gameOptions.lives = 2;
        gameOptions.rolls = 3;
    },
    
    update:function(){
        
        if(this.cursors.down.isDown && this.cursors.down.downDuration(1) && id < maxId){
            id++;
            this.buttonSound.play();
            console.log(id);
        }
        else if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && id > minId){
            id--;
            this.buttonSound.play();
            console.log(id);
        }
        
        if(id == 0){
            this.playText.addColor('red',0);
            this.rankingText.addColor('white',0);
            this.creditsText.addColor('white',0);
            if(this.enter.isDown){
                this.buttonPlay.play();
                this.startGame();
            }
        }
        else if(id==1){
            this.playText.addColor('white',0);
            this.rankingText.addColor('red',0);
            this.creditsText.addColor('white',0);
            if(this.enter.isDown){
                this.buttonSound.play();
                this.rankingMenu();
            }
        }
        else if(id==2){
            this.playText.addColor('white',0);
            this.rankingText.addColor('white',0);
            this.creditsText.addColor('red',0);
            if(this.enter.isDown){
                this.buttonSound.play();
                this.creditsMenu();
            }
        }        
    },
    
    startGame:function(){
        this.state.start('level1');
    },
    rankingMenu:function(){
        gameOptions.cameFromMenu = true;
        this.state.start('menu_highscore');
    },
    creditsMenu:function(){
        this.state.start('menu_credits');
    }

};