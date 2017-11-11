var shooter1942 = shooter1942 || {};

shooter1942.menu = {
    preload:function(){
        this.load.image('title','img/title.jpg');
        this.load.image('playButton','img/button_play.png');
        
    },
    
    create:function(){
        //BACKGROUND
        this.game.stage.backgroundColor = "000000";
        this.title = this.game.add.image(this.game.world.centerX,100,'title');
        this.title.anchor.setTo(.5);
        this.title.scale.setTo(.5);
        
        //BUTTON PLAY
        this.button = this.game.add.button(this.game.world.centerX, this.game.world.centerY,'playButton', this.startGame, this);
        this.button.anchor.setTo(.5);
        this.button.scale.setTo(.1);
    },
    
    update:function(){
        
    },
    
    startGame:function(){
        this.state.start('level1');
    }
};