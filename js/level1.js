var shooter1942 = shooter1942 || {};

shooter1942.level1 = {
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
    },
    
    preload:function(){
        // Load all sprites of the level
        this.load.spritesheet('playerSprite', 'img/P_idle.png', 27, 18);
        //this.load.spritesheet('playerRoll', 'img/P_roll.png', 34, 27);

        
        // Map cursor keys and Spacebar
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
       
    },
    
    create:function(){
                                        //BEF781
        this.game.stage.backgroundColor = "DDDDDD";
      
        //Add the player
       /* this.player = new shooter1942.playerPrefab(this.game, gameOptions.gameWidth/2,gameOptions.gameHeight/2);
        
        console.log(this.player.position.x, this.player.position.y);*/
        //this.game.add.existing(this.player);
        this.player = this.game.add.sprite(350,800,'playerSprite');
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(5);
        this.player.speedX = gameOptions.playerSpeedX;
        this.player.speedY = gameOptions.playerSpeedY;
        
        // Load animations
        this.player.animations.add('idle', [0,1], 10, true);
        this.player.animations.add('roll', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 10, true);
        
        // Physics
        this.game.physics.arcade.enable(this.player);
    },
    
    update:function(){
        // Play idle animation
        this.player.animations.play('idle');
        
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= this.player.speedX;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += this.player.speedX;
        }
        else if (this.cursors.up.isDown) {
            this.player.body.velocity.y -= this.player.speedY;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y += this.player.speedY;
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }
        
        // Player roll
        if (this.space.isDown) {
            this.player.animations.play('playerRoll');
        }
    
        
    }
};