var shooter1942 = shooter1942 || {};

shooter1942.menu_highscore = {
    preload:function(){
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
         //this.load.audio('button','sound/sound_button.wav');
         this.load.audio('select','sound/sound_select.wav');
        
    },
    
    create:function(){
        //Assign Highscore
        this.scoreList();
        //Save locally highscore data
        this.saveGame();
        
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
        this.scoreText = this.game.add.text(30, gameOptions.gameHeight/2.5, 'YOUR SCORE:                      '+gameOptions.score);
        this.scoreText.anchor.setTo(0);
        this.scoreText.font = 'Press Start 2P';
        this.scoreText.fill = 'yellow';
        this.scoreText.fontSize = 18;
        //Highscore
        this.hScoreText = this.game.add.text(30, gameOptions.gameHeight/3, 'HIGHSCORE:                        '+gameOptions.highscore);
        this.hScoreText.anchor.setTo(0);
        this.hScoreText.font = 'Press Start 2P';
        this.hScoreText.fill = 'white';
        this.hScoreText.fontSize = 18;
        //Total Deaths
        this.deathsText = this.game.add.text(30, gameOptions.gameHeight/1.6, 'TOTAL DEATHS:                  '+gameOptions.totalDeaths);
        this.deathsText.anchor.setTo(0);
        this.deathsText.font = 'Press Start 2P';
        this.deathsText.fill = '#f66363';
        this.deathsText.fontSize = 18;
        
        //DEATH/COMPLETION TEXT
        if(gameOptions.lives < 0 && gameOptions.cameFromMenu > 0)
        {
            this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, 'GAME OVER');
            this.finalText.fill = 'red';
        }
        else if(gameOptions.lives >= 0 && gameOptions.cameFromMenu > 0)
        {
            this.returnText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/1.1, 'Press SPACEBAR to continue\nPress ESC to return');
            if(gameOptions.cameFromMenu == 1){
                this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, 'LEVEL 1 COMPLETED');
            }
            else if(gameOptions.cameFromMenu == 2){
                this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, 'LEVEL 2 COMPLETED');
            }
            else if(gameOptions.cameFromMenu == 3){
                this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, 'LEVEL 3 COMPLETED');
            }
            this.finalText.fill = 'lightblue';
            
            if(gameOptions.cameFromMenu != 3){
            this.accuracyText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/4.8, gameOptions.accuracy + "%");
            this.accuracyText.anchor.setTo(.5);
            this.accuracyText.font = 'Press Start 2P';
            
            //Text colour according to score
            if(gameOptions.accuracy < 40)
                this.accuracyText.fill = '#ff4d4d';     //RED
            else if(gameOptions.accuracy >= 40 && gameOptions.accuracy < 60)
                this.accuracyText.fill = '#ffb84d';     //ORANGE
            else if(gameOptions.accuracy >= 60 && gameOptions.accuracy < 80)
                this.accuracyText.fill = '#66ff66';     //GREEN
            else if(gameOptions.accuracy >= 80 && gameOptions.accuracy < 90)
                this.accuracyText.fill = '#00FFFF';     //BLUE
            else if(gameOptions.accuracy >= 90 && gameOptions.accuracy < 98)
                this.accuracyText.fill = '#cc99ff';     //PURPLE
            else if(gameOptions.accuracy >= 98)
                this.accuracyText.fill = '#ffff66';     //YELLOW
            
            this.accuracyText.fontSize = 20;
            }
        }
        else if (gameOptions.cameFromMenu == 0){
            this.finalText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight/6.25, '');
        }
        this.finalText.anchor.setTo(0.5);
        this.finalText.font = 'Press Start 2P';
        this.finalText.fontSize = 18;
        
        this.returnText.anchor.setTo(.5);
        this.returnText.font = 'Press Start 2P';
        this.returnText.fill = 'lightgrey';
        this.returnText.fontSize = 20;
        
       
    },
    
    update:function(){
        if(this.escape.isDown){
            this.buttonSelect.play();
            gameOptions.cameFromMenu = 0;
            this.state.start('menu');
        }
        if(gameOptions.cameFromMenu == 1){
            if(this.space.isDown && this.space.downDuration(1)){
                this.level2();
            }
        }
        else if(gameOptions.cameFromMenu == 2){
            if(this.space.isDown && this.space.downDuration(1)){
                this.level3();
            }
        }
        else if(gameOptions.cameFromMenu == 3){
            if(this.space.isDown && this.space.downDuration(1)){
                this.credits();
            }
        }
    },
    level2:function(){
        this.state.start('level2');
    },
    level3:function(){
        this.state.start('level3');
    },
    credits:function(){
        this.state.start('menu_credits');
    },
    scoreList:function(){
        if(gameOptions.score > gameOptions.highscore)
        {
            gameOptions.highscore = gameOptions.score;
        }
    },
    saveGame:function(){
        if(!this.supportsLocalStorage()){return false;}
        localStorage["saved"] = true;
        localStorage["hScore"] = gameOptions.highscore;
        localStorage["tDeaths"] = gameOptions.totalDeaths;
        
        var storedHScore = parseInt(localStorage["hScore"]);
        if(storedHScore === NaN){
            localStorage["hScore"] = 0;
            storedHScore = 0;
        }
        var storedTDeaths = parseInt(localStorage["tDeaths"]);
        if(storedTDeaths === NaN){
            localStorage["tDeaths"] = 0;
            storedTDeaths = 0;
        }
    },
    resumeGame:function(){
        if(!this.supportsLocalStorage()){
            gameOptions.score = 0;
            gameOptions.highscore = 0;
            gameOptions.totalDeaths = 0;
            return false;
        }
        if(!(localStorage["saved"]=="true")){
            gameOptions.score = 0;
            gameOptions.highscore = 0;
            gameOptions.totalDeaths = 0;
            return false;
        }
        gameOptions.highscore = parseInt(localStorage["hScore"]);        
        gameOptions.totalDeaths = parseInt(localStorage["tDeaths"]);        
        return true;
    },
    supportsLocalStorage:function(){
        return('localStorage' in window) && window['localStorage']!==null;
    },
    resetGame:function(){
        gameOptions.score = 0;
        gameOptions.highscore = 0;
        gameOptions.totalDeaths = 0;
        localStorage["hScore"] = 0;
        localStorage["tDeaths"] = 0;
        this.saveGame();
    }
};