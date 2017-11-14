var shooter1942 = shooter1942 || {};

shooter1942.level1 = {
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        gameOptions.score = 0;
        gameOptions.lives = 3;
        gameOptions.rolls = 3;
    },
    
    preload:function(){
        // Load all sprites of the level
        this.load.spritesheet('playerSprite', 'img/PlayerSpritesheet.png', 34, 27);
        this.load.spritesheet('playerRoll', 'img/P_roll.png', 34, 27);
        this.load.spritesheet('enemy1', 'img/E_01_idle.png', 17, 16);
        this.load.image('rolls', 'img/pUp_extraLife.png');
        this.load.image('lives', 'img/P_left.png');
        this.load.image('pUp_1', 'img/pUp_enemyCrash.png');
        this.load.image('pUp_2', 'img/pUp_extraLife.png');
        this.load.image('pUp_3', 'img/pUp_loop.png');
        this.load.image('pUp_4', 'img/pUp_points.png');
        
        this.load.image('bg1', 'img/level1.png');
        
        // Map cursor keys and Spacebar
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        
        //SOUND
        this.load.audio('theme', 'sound/stage_theme.mp3');
        //this.music = new Phaser.Sound(this.game, 'theme', 1, true);
        this.load.audio('cleared','sound/stage_clear.mp3');
        this.load.audio('over','sound/game_over.mp3');
    },
    
    create:function(){
        // Crear un objecte fons, per poder canviar-li les variables i pintar-ho
        this.fons = this.game.add.tileSprite(0, 0, gameOptions.gameWidth, 2048, 'bg1');
        this.fons.scale.y = 1.5; // S'escala a 1'5 perque l'sprite és petit. 
        this.fons.scale.x = 1.5; // Està calculat que en X, si s'escala en 1'5 dona un numero exacte, que es el width de la finestra
        this.fons.anchor.y = 0.84; // Aquest anchor en Y situa el punt d'anclatgef de l'imatge al punt exacte d'abaix, per poder correr cap adalt
        
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
        
        
        //HUD RELATED
        //Rolls
        this.rolls = this.game.add.image(gameOptions.gameWidth-60, gameOptions.gameHeight-30,'rolls');
        this.rolls.anchor.setTo(.5);
        this.rolls.scale.setTo(1.5);
        //Rolls Text
        this.rollsText = this.game.add.text(gameOptions.gameWidth-30, gameOptions.gameHeight-30, gameOptions.rolls);
        this.rollsText.anchor.setTo(.5);
        this.rollsText.fill = 'white';
        this.rollsText.font='Press Start 2P';
        this.rollsText.stroke= 'black';
        //this.rollsText.strokeThikckness = 1;
        //Lives
        this.lives = this.game.add.image(30, gameOptions.gameHeight-30,'lives');
        this.lives.anchor.setTo(.5);
        this.lives.scale.setTo(1.5);
        //Lives Text
        this.livesText = this.game.add.text(60, gameOptions.gameHeight-30, gameOptions.lives);
        this.livesText.anchor.setTo(.5);
        this.livesText.fill = 'white';
        this.livesText.font='Press Start 2P';
        this.livesText.stroke= 'black';
        //this.livesText.strokeThikckness = 2;
                
        //Enemies
        this.loadEnemy();
        this.enemy1Timer = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.createEnemy, this);
        
        this.loadpUp();
        this.powerUpTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.createpUp, this);
        gameOptions.backgroundSpeed = 0.8;
        // Physics
        //this.game.physics.arcade.enable(this.player);
        this.soundtrack = this.add.audio('theme');
        this.soundtrack.loopFull();
        //this.music.play();
        this.cleared = this.add.audio('cleared');
        this.over = this.add.audio('over');
    },
    
    update:function(){
        //Exit
        if(this.escape.isDown){
            this.quit();
        }
        
        //ROLLS WITH X
        /*if(this.x.isDown && this.x.downDuration(1) && gameOptions.rolls > 0){
            gameOptions.rolls--;
            console.log(gameOptions.rolls);
        }*/
        // Fer correr el fons, velocitat a GameOptions per tenir-ho generalitzat als 3 nivells
        this.fons.position.y += gameOptions.backgroundSpeed;
        
        // Si la posició del punt anclatge es mes gran a la mida del tile + finestra, atura d'avançar (final de nivell)
        if (this.fons.position.y >= 2048 + gameOptions.gameHeight) {
            gameOptions.backgroundSpeed = 0;
            this.soundtrack.stop();
            this.cleared.play();
            this.state.start('menu_highscore');
        }
        
        // Simple debug per anar coneixent la posició del fons, alomillor mes endevant podem fer un upgrade
        // i fer una barra de progrés (Ho deix com a proposta) de que te queda de nivell
        this.game.debug.text('Posició Y del fons: ' + this.fons.position.y, 5, 15, 'DDDDDD');
        
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
        this.rollsText.setText(gameOptions.rolls);
    
         this.game.physics.arcade.overlap(this.player, this.enemies, this.attacked, null, this);
    },
    quit:function(){
        this.soundtrack.stop();
        this.state.start('menu');
    },
    loadEnemy:function(){
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
    },
    createEnemy:function(){
        var enemy = this.enemies.getFirstExists(false);
        if (!this.enemy) {
            this.enemy = new shooter1942.enemy1Prefab(this.game, Math.random() * gameOptions.gameWidth, 1, Math.trunc(Math.random() * 2.999));
            this.enemies.add(this.enemy);
        }
        else{
            this.enemy.reset(Math.random() * gameOptions.gameWidth, 1);
        }
    },
    
    loadpUp:function(){
        this.pups = this.add.group();
        this.pups.enableBody = true;
    },
    createpUp:function(){
        var pup = this.pups.getFirstExists(false);
        if (!this.pup) {
            this.pup = new shooter1942.power_up(this.game, Math.random() * gameOptions.gameWidth, 1, Math.trunc(Math.random() * 2.9999)+1, this.player);
            this.pups.add(this.pup);
        }
        else{
            this.pup.reset(Math.random() * gameOptions.gameWidth, 1);
        }
    },
    attacked:function(player, enemy){
        enemy.kill();
        console.log('Enemy Killed');
    }

};