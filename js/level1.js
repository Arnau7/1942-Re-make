var shooter1942 = shooter1942 || {};

shooter1942.level1 = {
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        gameOptions.score = 0;
        gameOptions.lives = 2;
        gameOptions.rolls = 3;
    },
    
    preload:function(){
        // Load all sprites of the level
        this.load.spritesheet('playerSprite', 'img/PlayerSpritesheet.png', 34, 27); //Player
        this.load.spritesheet('playerRoll', 'img/P_roll.png', 34, 27);
        this.load.spritesheet('enemy1', 'img/E_01.png', 17, 16);       //Enemy1
        this.load.spritesheet('enemy2', 'img/E_02.png', 33, 29);            //Enemy2
        this.load.spritesheet('explosion','img/enemy_kill.png',19,17);      //Enemy death
        this.load.image('double_bullet','img/double_bullet.png');           //Doble Bala
        this.load.image('rolls', 'img/pUp_extraLife.png');                  
        this.load.image('lives', 'img/P_left.png');
        this.load.image('pUp_1', 'img/pUp_enemyCrash.png');
        this.load.image('pUp_2', 'img/pUp_extraLife.png');
        this.load.image('pUp_3', 'img/pUp_loop.png');
        this.load.image('pUp_4', 'img/pUp_points.png');
        this.load.image('enemy_bullet','img/enemy_bullet1.png');
        this.load.image('rollIcon','img/roll_Icon.png');

        this.load.image('bg1', 'img/level1.png');
        
        // Map cursor keys and Spacebar
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        
        //SOUND
        this.load.audio('theme', 'sound/stage_theme.mp3');
        //this.music = new Phaser.Sound(this.game, 'theme', 1, true);
        this.load.audio('cleared','sound/stage_clear.mp3');
        this.load.audio('over','sound/game_over.mp3');
        this.load.audio('select','sound/sound_select.wav');
        this.load.audio('playerDeath','sound/sound_playerDeath.wav');
        this.load.audio('shoot', 'sound/sound_shoot.mp3');
        this.load.audio('enemyDeath', 'sound/sound_enemyDeath.wav');
        this.game.load.audio('rollSound', 'sound/sound_roll.wav');

    },
    
    create:function(){
        this.buttonSelect = this.add.audio('select');
        // Crear un objecte fons, per poder canviar-li les variables i pintar-ho
        this.fons = this.game.add.tileSprite(0, 0, gameOptions.gameWidth, 3072, 'bg1');
        this.fons.scale.y = 1.5; // S'escala a 1'5 perque l'sprite és petit. 
        this.fons.scale.x = 1.5; // Està calculat que en X, si s'escala en 1'5 dona un numero exacte, que es el width de la finestra
        this.fons.anchor.y = 0.89; // Aquest anchor en Y situa el punt d'anclatgef de l'imatge al punt exacte d'abaix, per poder correr cap adalt        
        
        //HUD RELATED
        //Rolls
        this.rolls = this.game.add.image(gameOptions.gameWidth-60, gameOptions.gameHeight-33,'rollIcon');
        this.rolls.anchor.setTo(.5);
        this.rolls.scale.setTo(0.75);
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
        //Score
        //Score Text
        this.scoreText = this.game.add.text(gameOptions.gameWidth/2, 30, gameOptions.score);
        this.scoreText.anchor.setTo(.5);
        this.scoreText.fill = 'white';
        this.scoreText.font='Press Start 2P';
        this.scoreText.stroke= 'black';
        
        //Bullets
        this.loadBullets();
        this.loadBulletsEnemy();
        //Enemies
        this.loadEnemy();
        this.enemy1Timer = this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.createEnemy1, this);
        this.enemy2Timer = this.game.time.events.loop(Phaser.Timer.SECOND * 12, this.createEnemy2, this);
        this.enemy1Timer2 = this.game.time.events.loop(Phaser.Timer.SECOND * 24, this.createEnemy1, this);
        this.enemy2Timer2 = this.game.time.events.loop(Phaser.Timer.SECOND * 30, this.createEnemy2, this);
        //PowerUps
        this.loadpUp();
        this.powerUpTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 40, this.createpUp, this);

        //Explosiosn
        this.loadExplosions();
        
        //Add the player
        this.createPlayer();
 
        
        gameOptions.backgroundSpeed = 0.8;
        // Physics
        //this.game.physics.arcade.enable(this.player);
        this.soundtrack = this.add.audio('theme');
        this.soundtrack.loopFull();
        //this.music.play();
        this.music_cleared = this.add.audio('cleared');
        this.music_over = this.add.audio('over');
        this.sound_playerDeath = this.add.audio('playerDeath');
        this.sound_shoot = this.add.audio('shoot');
        this.sound_enemyDeath = this.add.audio('enemyDeath');
        
        //this.modulus();
        gameOptions.playerRespawning = false;
        gameOptions.immunity = false;
    },
    
    update:function(){
        gameOptions.playerPosY = this.player.body.position.y;
        gameOptions.playerPosX = this.player.body.position.x;
        //Exit
        if(this.escape.isDown){
            this.quit();
        }
        if(gameOptions.lives < 0){
            this.gameOver();
        }
        
        //EnemyShooting
        //this.createBulletEnemy(this.enemies);
        
        //Shoot with Z
        if(this.z.isDown && this.z.downDuration(1) && !gameOptions.immunity && !gameOptions.playerRespawning){
            this.createBullet();
            //console.log(this.bullets.length);
        }
        // Fer correr el fons, velocitat a GameOptions per tenir-ho generalitzat als 3 nivells
        this.fons.position.y += gameOptions.backgroundSpeed;
        
        // Si la posició del punt anclatge es mes gran a la mida del tile + finestra, atura d'avançar (final de nivell)
        if (this.fons.position.y >= 3072 +gameOptions.gameHeight * 2) {
            gameOptions.backgroundSpeed = 0;
            this.soundtrack.stop();
            this.music_cleared.play();
            this.state.start('menu_highscore');
        }
        
        // Simple debug per anar coneixent la posició del fons, alomillor mes endevant podem fer un upgrade
        // i fer una barra de progrés (Ho deix com a proposta) de que te queda de nivell
        this.game.debug.text('Posició Y del fons: ' + this.fons.position.y, 5, 15, 'DDDDDD');
        
        // Player roll
        /*if (this.space.isDown && this.space.downDuration(1) && this.player.rolls > 0) {
            this.player.animations.play('roll');
            console.log('rolling');
            this.player.rolls -= 1;
        }*/
        
        //HUD
        this.livesText.setText(gameOptions.lives);
        this.rollsText.setText(gameOptions.rolls);
        this.scoreText.setText(gameOptions.score);
    
       //Bala del player ha donat a un enemic 
        this.game.physics.arcade.overlap(this.enemies,this.bullets,this.enemyGotHit,null,this);
        //Player ha agafat un power-up
        this.game.physics.arcade.overlap(this.player, this.pups, this.powerupContact, null, this);
       //Player i enemic han xocat
        this.game.physics.arcade.overlap(this.player,this.enemies,this.enemyCrash, null,this);
        //Bala de l'enemic ha donat al player
        this.game.physics.arcade.overlap(this.player, this.bulletsEnemy, this.playerGotHit, null,this);
    },
    

    //---------------PLAYER FUNCTIONS-----------------------
    
    createPlayer:function(){
        this.player = new shooter1942.playerPrefab(this.game, gameOptions.gameWidth/2, gameOptions.gameHeight - 100, gameOptions.playerSpeed);
        gameOptions.playerCanShoot = true;
    },
    playerRespawn:function(){
        //this.player.frame = 0;
        this.player.position.x = gameOptions.gameWidth/2;
        this.player.position.y = gameOptions.gameHeight - 100;
        gameOptions.playerRespawning = false;
        gameOptions.immunity = false;
    },
    playerGotHit:function(player, bulletEnemy){
        if(!gameOptions.immunity){
            console.log('Player killed');
            this.sound_playerDeath.play();
            this.camera.shake(0.05,250);
            this.createExplosion(this.player.position.x, this.player.position.y);
            bulletEnemy.kill();
            gameOptions.lives--; 
            this.resetLevel();
        }
    },
    
    
    //---------------ENEMY FUNCTIONS------------------------
    
    loadEnemy:function(){
        this.enemies = this.add.group();
    },    
    /*callEnemy1:function(){
        this.TimerEnemy = this.game.time.events.loop(Phaser.Timer.SECOND, this.createEnemy1, this);
        this.game.time.events.remove(this.TimerEnemy);
    },*/
    createEnemy1:function(){
        //var enemy = this.enemies.getFirstExists(false);
        //if (!enemy) 
        //{
        for(var i = 0; i < 4; i++){
            var enemy = new shooter1942.enemy1Prefab(this.game, this.rnd.integerInRange(16,this.world.width -16), -i * 64);
            this.enemies.add(enemy);
        }
        
        //}
        //else
        //{
            //enemy.reset(this.rnd.integerInRange(16,this.world.width -16), 1);
        //}
        
        //this.enemies.add(enemy);
        
        //this.createBulletEnemy(enemy);
    },
    createEnemy2:function(){
        var enemy = new shooter1942.enemy2Prefab(this.game, this.rnd.integerInRange(16,this.world.width/2), 1);
        
        this.enemies.add(enemy);
    },
    
    enemyCrash:function(player,enemy){
        if(!gameOptions.immunity){
            if(enemy.hitsLeft == 1) {
                console.log('Enemy Crash')
                this.sound_playerDeath.play();
                this.camera.shake(0.05,125);
                this.createExplosion(player.position.x, player.position.y);
                //this.explosions.scale.setTo(4);
                enemy.destroy();
                gameOptions.lives--;

                switch (enemy.enemyType) {
                    case 1:
                        gameOptions.score += 50;
                        break;
                    case 2:
                        gameOptions.score += 1000;
                        break;
                    default: 
                        break;
                }

                this.resetLevel();
            }
            
            else {
                enemy.hitsLeft--;
                 this.sound_playerDeath.play();
                this.camera.shake(0.05,250);
                this.createExplosion(player.position.x, player.position.y);
                gameOptions.lives--;
                this.resetLevel();
            }
        }
    },
    enemyGotHit:function(enemy, bullet){
        if (enemy.hitsLeft == 1) {
            console.log('Enemy killed');
            this.sound_enemyDeath.play();
            this.createExplosion(enemy.position.x, enemy.position.y);
            bullet.kill();
            enemy.kill();
            switch (enemy.enemyType) {
                case 1:
                    gameOptions.score += 50;
                    break;
                case 2:
                    gameOptions.score += 1000;
                    break;
                default: 
                    break;

            }
        }
        
        else {
            enemy.hitsLeft--;
            this.sound_enemyDeath.play();
            bullet.kill();
            gameOptions.score += 100;

        }
    },
    
    
    //---------------POWR UP FUNCTIONS----------------------
    
    loadpUp:function(){
        this.pups = this.add.group();
        //this.pups.enableBody = true;
    },
    createpUp:function(){
        var pup = this.pups.getFirstExists(false);
        var randomType = 0;
        randomType = Math.trunc(Math.random()*2.9999)+1;
        //if (!pup) {
        //Si simplement es reseteja el power_up,el sprite no canvia. De la manera actual canvia d'sprite, tipus però pups es va omplint de nous objectes. No suposarà un problema ja que com a molt en un nivell es crearien 10 power_ups.
            pup = new shooter1942.power_up(this.game, this.rnd.integerInRange(16,this.world.width -16), 1, randomType);
            this.pups.add(pup);
        //}
        /*else{
            pup.type = randomType;
            pup.reset(Math.random() * gameOptions.gameWidth, 50);
        }*/
        pup.body.velocity.y = gameOptions.powerup_speed;
        //this.game.add.existing(pup);
        //console.log(randomType);
        //console.log('Pups: '+this.pups.length);
    },
    
    powerupContact:function(player, pup){
        //console.log(pup.type);
        //console.log('pup collected');
        this.buttonSelect.play();
        if(pup.type == 0){
            
        }
        else if (pup.type == 1){
            gameOptions.lives++;
            //console.log('+1 life');
        }
        else if(pup.type == 2){
            gameOptions.rolls++;
           //console.log('+1 roll');
        }
        else if(pup.type == 3){
            gameOptions.score += 1000;
            //console.log('+1000 points');
        }
        pup.destroy();

    },
    
    
    //---------------BULLETS FUNCTIONS----------------------

    loadBullets:function(){
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
    },
    createBullet:function(){
        var bullet = this.bullets.getFirstExists(false);
        this.sound_shoot.play();
        if(!bullet){
            bullet = new shooter1942.bulletPrefab(this.game, this.player.x, this.player.top);
            this.bullets.add(bullet);
        }
        else{
            bullet.reset(this.player.x, this.player.y);
        }
        bullet.body.velocity.y = gameOptions.bullet_playerSpeed;
    },
    
    loadBulletsEnemy:function(){
        this.bulletsEnemy = this.add.group();
        this.bulletsEnemy.enableBody = true;
    },
    createBulletEnemy:function(enemy){
        var bulletEnemy = this.bulletsEnemy.getFirstExists(false);
        if(!bulletEnemy){
            bulletEnemy = new shooter1942.bulletEnemyPrefab(this.game, enemy.x, enemy.bottom);
            this.bulletsEnemy.add(bulletEnemy);
        }
        else{
            bulletEnemy.reset(enemy.x, enemy.y);
        }
        this.dir_x = (this.player.body.position.x - enemy.body.position.x);
        this.dir_y = (this.player.body.position.y - enemy.body.position.y);
        this.dir_mod = Math.sqrt(this.dir_x * this.dir_x + this.dir_y * this.dir_y);
        this.dir_x /= this.dir_mod;
        this.dir_y /= this.dir_mod;
        
        bulletEnemy.body.velocity.x = this.dir_x * gameOptions.enemy1BulletSpeed;
        bulletEnemy.body.velocity.y = this.dir_y * gameOptions.enemy1BulletSpeed;
        //bulletEnemy.body.velocity.y = gameOptions.bullet_enemySpeed;
    },

    //---------------EXPLOSIONS-----------------------------
    
    loadExplosions:function(){
        this.explosions = this.add.group();
    },
    createExplosion:function(_x, _y){
        var explosion = this.explosions.getFirstExists(false);
        if(!explosion){
            explosion = new shooter1942.explosionPrefab(this.game,_x, _y);
            this.explosions.add(explosion);
        }
        else{
            explosion.reset(_x,_y);
        }
        explosion.animations.play('explode',10,false,true);
    },


    //---------------LEVEL FUNCTIONS------------------------
    
    resetLevel:function(){
        //this.player.kill();
        gameOptions.immunity = true;
        gameOptions.playerRespawning = true;
        this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.playerRespawn,this);
    },
    quit:function(){
        this.soundtrack.stop();
        this.buttonSelect.play();
        this.state.start('menu');
    },
    gameOver:function(){
        this.soundtrack.stop();
        this.music_over.play();
        this.state.start('menu_highscore');
    }
};