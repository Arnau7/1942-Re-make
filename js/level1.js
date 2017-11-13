var shooter1942 = shooter1942 || {};

shooter1942.level1 = {
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
    },
    
    preload:function(){
        // Load all sprites of the level
        this.load.spritesheet('playerSprite', 'img/P_idle.png', 27, 18);
        this.load.spritesheet('playerRoll', 'img/P_roll.png', 34, 27);
        this.load.spritesheet('enemy1', 'img/E_01_idle.png', 17, 16);
        this.load.image('rolls', 'img/pUp_extraLife.png');
        this.load.image('lives', 'img/P_left.png');
        
        // Map cursor keys and Spacebar
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
       
    },
    
    create:function(){
                                        //BEF781
        this.game.stage.backgroundColor = "DDDDDD";
      
       //Add the player
        var player = new shooter1942.playerPrefab(this.game, gameOptions.gameWidth/2, gameOptions.gameHeight - 50, gameOptions.playerSpeed);
       /* this.player = new shooter1942.playerPrefab(this.game, gameOptions.gameWidth/2,gameOptions.gameHeight/2);
        
        console.log(this.player.position.x, this.player.position.y);*/
        //this.game.add.existing(this.player);
        //this.player = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/1.2,'playerSprite');
        //this.player.anchor.setTo(.5);
        //this.player.scale.setTo(1.8);
        //this.player.speedX = gameOptions.playerSpeedX;
        //this.player.speedY = gameOptions.playerSpeedY;
        //this.game.physics.arcade.enable(this.player);
        // Load animations
        //this.player.animations.add('idle', [0,1], 10, true);
        //this.player.animations.add('roll', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 10, true);
        
        /*
        //HUD RELATED
        //Rolls
        this.player.rolls = 3;
        this.rolls = this.game.add.image(gameOptions.gameWidth-60, gameOptions.gameHeight-30,'rolls', this.player.rolls);
        this.rolls.anchor.setTo(.5);
        this.rolls.scale.setTo(1.5);
        //Lives
        this.player.lives = 3;
        this.lives = this.game.add.image(30, gameOptions.gameHeight-30,'lives', this.player.lives);
        this.lives.anchor.setTo(.5);
        this.lives.scale.setTo(1.5);
        //Rolls Text
        this.rollsText = this.game.add.text(gameOptions.gameWidth-30, gameOptions.gameHeight-30, this.player.rolls);
        this.rollsText.anchor.setTo(.5);
        this.rollsText.fill = 'white';
        this.rollsText.font='Arial Black';
        this.rollsText.stroke= 'black';
        //this.rollsText.strokeThikckness = 1;
        //Lives Text
        this.livesText = this.game.add.text(60, gameOptions.gameHeight-30, this.player.lives);
        this.livesText.anchor.setTo(.5);
        this.livesText.fill = 'white';
        this.livesText.font='Arial Black';
        this.livesText.stroke= 'black';
        //this.livesText.strokeThikckness = 2;
        */
        this.game.add.existing(player);
        //Enemies
        this.loadEnemy();
        this.enemy1Timer = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.createEnemy, this);
        
        // Physics
        //this.game.physics.arcade.enable(this.player);
    },
    
    update:function(){
        //Exit
        if(this.escape.isDown){
            this.state.start('menu');
        }
        
        /*
        // Play idle animation
        this.player.animations.play('idle');
        
        // Player movement
        if (this.cursors.left.isDown) {
            //this.player.body.velocity.x -= this.player.speedX;
            this.player.position.x -= this.player.speedX;
        }
        else if (this.cursors.right.isDown) {
            //this.player.body.velocity.x += this.player.speedX;
            this.player.position.x += this.player.speedX;

        }
        if (this.cursors.up.isDown) {
            //this.player.body.velocity.y -= this.player.speedY;
             this.player.position.y -= this.player.speedY;
        }
        else if (this.cursors.down.isDown) {
           // this.player.body.velocity.y += this.player.speedY;
            this.player.position.y += this.player.speedY;

        }
        
        // Player roll
        if (this.space.isDown && this.space.downDuration(1) && this.player.rolls > 0) {
            this.player.animations.play('roll');
            console.log('rolling');
            this.player.rolls -= 1;
        }
        */
        //HUD
        //this.livesText.setText(this.player.lives);
        //this.rollsText.setText(this.player.rolls);
    
        
    },
    quit:function(){
        this.state.start('menu');
    },
    loadEnemy:function(){
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
    },
    createEnemy:function(){
        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new shooter1942.enemy1Prefab(this.game, Math.random() * gameOptions.gameWidth, 0, Math.trunc(Math.random() * 2.999));
            this.enemies.add(enemy);
        }
        else{
            enemy.reset(Math.random() * gameOptions.gameWidth, 0);
        }
    }
};