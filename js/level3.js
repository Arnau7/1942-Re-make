var shooter1942 = shooter1942 || {};

shooter1942.level3 = {
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    preload:function(){
        // Load all sprites of the level
        this.load.spritesheet('playerSprite', 'img/PlayerSpritesheet.png', 34, 27); //Player
        this.load.spritesheet('playerRoll', 'img/P_roll.png', 34, 27);
        this.load.spritesheet('explosion','img/enemy_kill.png',19,17);      //Enemy death
        this.load.spritesheet('explosions','img/explosions.png',65,50);      
        this.load.image('double_bullet','img/double_bullet.png');           //Doble Bala
        this.load.image('rolls', 'img/pUp_extraLife.png');                  
        this.load.image('lives', 'img/P_left.png');
        this.load.image('enemy_bullet','img/enemy_bullet1.png');
        this.load.image('rollIcon','img/roll_Icon.png');

        this.load.image('bg3', 'img/level3.png');
        this.load.spritesheet('boss','img/E_Boss.png',171,94); //BOSS
        
        // Map cursor keys and Spacebar
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        
        this.l = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
        this.r = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        
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
        
        gameOptions.level = 'Level 3 - Boss Battle';
        
        this.buttonSelect = this.add.audio('select');
        // Crear un objecte fons, per poder canviar-li les variables i pintar-ho
        this.fons = this.game.add.tileSprite(0, 0, gameOptions.gameWidth, 3072, 'bg3');
        this.fons.scale.y = 1.5; // S'escala a 1'5 perque l'sprite és petit. 
        this.fons.scale.x = 1.5; // Està calculat que en X, si s'escala en 1'5 dona un numero exacte, que es el width de la finestra
        this.fons.anchor.y = 0.89; // Aquest anchor en Y situa el punt d'anclatgef de l'imatge al punt exacte d'abaix, per poder correr cap adalt        
        
        //Bullets
        this.loadBullets();
        this.loadBulletsEnemy();
        //Enemies
        this.loadEnemy();

        this.bossTimer = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.createBoss, this);
        
        //PowerUps
        this.loadpUp();

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
        
        //--------------HUD RELATED------------
        //LEVEL
        this.levelText = this.game.add.text(gameOptions.gameWidth/2, gameOptions.gameHeight*0.2, gameOptions.level);
        this.levelText.anchor.setTo(.5);
        this.levelText.font = 'Press Start 2P';
        this.levelText.fill = 'yellow';
        this.levelText.fontSize = 30;
        this.levelTextTimer = this.game.time.events.add(Phaser.Timer.SECOND * 3, this.levelTextFunction, this);
        this.levelText.setShadow(2,2,'black', true, true);
        //Rolls
        this.rolls = this.game.add.image(gameOptions.gameWidth-60, gameOptions.gameHeight-33,'rollIcon');
        this.rolls.anchor.setTo(.5);
        this.rolls.scale.setTo(0.75);
        //Rolls Text
        this.rollsText = this.game.add.text(gameOptions.gameWidth-30, gameOptions.gameHeight-30, gameOptions.rolls);
        this.rollsText.anchor.setTo(.5);
        this.rollsText.fill = 'white';
        this.rollsText.font='Press Start 2P';
        //this.rollsText.stroke= 'black';
        this.rollsText.fontSize = 18;
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
        //this.livesText.stroke= 'black';
        this.livesText.fontSize = 18;
        //this.livesText.strokeThikckness = 2;
        //Score
        //Score Text
        this.scoreText = this.game.add.text(gameOptions.gameWidth/2, 25, gameOptions.score);
        this.scoreText.anchor.setTo(.5);
        this.scoreText.fill = 'lightblue';
        this.scoreText.font='Press Start 2P';
        //this.scoreText.stroke= 'black';
        this.scoreText.fontSize = 18;
        this.scoreText.setShadow(2,2,'black',true,true);
        //-------------------------------------------------------------------------
        
        gameOptions.playerRespawning = false;
        gameOptions.immunity = false;
        gameOptions.totalEnemiesKilled = 0;
        gameOptions.totalEnemiesSpawned = 0;
        gameOptions.accuracy = 0;
        
        //If you come from a previous level, you will gain +1 live for the next lvl
        if(gameOptions.cameFromMenu > 0)
        {
                gameOptions.lives += 1;
        }
        //If you come from the Menu you will 
        else if(gameOptions.cameFromMenu == 0)
        {
            gameOptions.lives = 2;
            gameOptions.rolls = 3;
        }
        this.bossAlive = true;
    },
    
    update:function(){
        
        this.bossKilled();
        
        gameOptions.playerPosY = this.player.body.position.y;
        gameOptions.playerPosX = this.player.body.position.x;
        //Exit
        if(this.escape.isDown){
            this.quit();
        }
        if(gameOptions.lives < 0){
            gameOptions.cameFromMenu = 3;
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
        
        //GAME OVER CONDITION
        // Si la posició del punt anclatge es mes gran a la mida del tile + finestra, atura d'avançar (final de nivell)
        if (this.fons.position.y >= 3072 +gameOptions.gameHeight * 2) {
            gameOptions.backgroundSpeed = 0;
            this.enemiesKilledRating();
            this.soundtrack.stop();
            this.music_cleared.play();
            gameOptions.cameFromMenu = 3;
            this.state.start('menu_highscore');
        }
        
        // Simple debug per anar coneixent la posició del fons, alomillor mes endevant podem fer un upgrade
        // i fer una barra de progrés (Ho deix com a proposta) de que te queda de nivell
        //this.game.debug.text('Posició Y del fons: ' + Math.trunc(this.fons.position.y), 5, 15, 'DDDDDD');
        
        // Player roll
        /*if (this.space.isDown && this.space.downDuration(1) && this.player.rolls > 0) {
            this.player.animations.play('roll');
            console.log('rolling');
            this.player.rolls -= 1;
        }*/
        
    
       //Bala del player ha donat a un enemic 
        this.game.physics.arcade.overlap(this.enemies,this.bullets,this.enemyGotHit,null,this);
        //Player ha agafat un power-up
        //this.game.physics.arcade.overlap(this.player, this.pups, this.powerupContact, null, this);
       //Player i enemic han xocat
        this.game.physics.arcade.overlap(this.player,this.enemies,this.enemyCrash, null,this);
        //Bala de l'enemic ha donat al player
        this.game.physics.arcade.overlap(this.player, this.bulletsEnemy, this.playerGotHit, null,this);
        
        //HUD
        this.livesText.setText(gameOptions.lives);
        this.rollsText.setText(gameOptions.rolls);
        this.scoreText.setText(gameOptions.score);
        
        //DEVELOPER BUTTONS (change to false in main.js to disable or true to enable)
        if(gameOptions.developer){
            if(this.l.isDown && this.l.downDuration(1) && gameOptions.lives < 50) 
                //EXTRA LIFE WITH "L"
                gameOptions.lives = 50;
            if(this.r.isDown && this.r.downDuration(1) && gameOptions.rolls < 50)  
                //EXTRA ROLL WITH "R"
                gameOptions.rolls = 50;
        }
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
        this.player.tint = 0x444444;
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.playerImmunity,this);
        
    },
    playerImmunity:function(){
        this.player.tint = 0xffffff;
        gameOptions.threshold = false;
        gameOptions.immunity = false;
    },
    playerGotHit:function(player, bulletEnemy){
        if(!gameOptions.immunity){
            //console.log('Player killed');
            this.sound_playerDeath.play();
            this.camera.shake(0.05,250);
            this.createExplosion(this.player.position.x, this.player.position.y, 1);
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
    /*createEnemy1:function(){
        //var enemy = this.enemies.getFirstExists(false);
        //if (!enemy) 
        //{
        for(var i = 0; i < 4; i++){
            var enemy = new shooter1942.enemy1Prefab(this.game, this.rnd.integerInRange(16,this.world.width -16), -i * 64, 1);
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
        var enemy = new shooter1942.enemy2Prefab(this.game, this.rnd.integerInRange(40, this.world.width/2-40), 1, 1);
        
        this.enemies.add(enemy);
    },*/
    createBoss:function(){
        var enemy = new shooter1942.enemyBossPrefab(this.game,this.world.width /2,gameOptions.gameHeight,4);
        //this.rnd.integerInRange(this.world.width/2 +65,this.world.width-65)
        this.enemies.add(enemy);
        //.anchor.setTo(.5);
        enemy.body.setSize(150, 40, 10, 20);
        this.bossAlive = true;
        //this.game.debug.body(enemy);
    },
    enemyCrash:function(player,enemy){
        if(!gameOptions.immunity){
            if(enemy.hitsLeft == 1) {
                //console.log('Enemy Crash')
                this.sound_playerDeath.play();
                this.camera.shake(0.05,125);
                this.createExplosion(player.position.x, player.position.y, 1);
                //this.explosions.scale.setTo(4);
                enemy.destroy();
                gameOptions.lives--;
                gameOptions.totalEnemiesKilled++;
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
                this.createExplosion(player.position.x, player.position.y, 1);
                gameOptions.lives--;
                this.resetLevel();
            }
        }
    },
    enemyGotHit:function(enemy, bullet){
        if (enemy.hitsLeft == 1) {
            console.log('Enemy killed');
            this.sound_enemyDeath.play();
            bullet.kill();
            enemy.kill();
            gameOptions.totalEnemiesKilled++;
            switch (enemy.enemyType) {
                case 1:
                    this.createExplosion(enemy.position.x, enemy.position.y, 2);
                    gameOptions.score += 50;
                    break;
                case 2:
                    this.createExplosion(enemy.position.x, enemy.position.y, 2);
                    gameOptions.score += 1000;
                    break;
                case 3:
                    this.createExplosion(enemy.position.x, enemy.position.y, 3);
                    gameOptions.score += 2000 + 200 * gameOptions.enemy3Killed;
                    gameOptions.enemy3Killed++;
                case 4:
                    this.createExplosion(enemy.position.x, enemy.position.y, 2);
                    gameOptions.score += 50000;
                    this.bossAlive = false;
                    break;
                default: 
                    break;
            }
        }
        
        else {
            //this.createExplosion(enemy.position.x, enemy.position.y, 2);
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
    
    /*powerupContact:function(player, pup){
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

    },*/
    
    
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
    createBulletEnemyBoss:function(enemy){
        //Top-Left
        //
        //Top-Right
        //
        //Bot-Left
        //+1, 0; -1, 0
        //Bot-Right
        //-1, 0; +1, 0
        for(var i = 0; i < 5; i++)
        {
            /*var bulletEnemy = this.bulletsEnemy.getFirstExists(false);
            if(!bulletEnemy)
            {*/
                if(i == 0)
                {
                    var bulletEnemy = new shooter1942.bulletEnemyPrefab(this.game, enemy.x, enemy.y);
                    this.bulletsEnemy.add(bulletEnemy);
                    
                    //4t Quadrant
                    this.dir_x = (this.player.body.position.x-75 - enemy.body.position.x);
                    this.dir_y = (this.player.body.position.y-0 - enemy.body.position.y);
                    this.dir_mod = Math.sqrt(this.dir_x * this.dir_x + this.dir_y * this.dir_y);
                    this.dir_x /= this.dir_mod;
                    this.dir_y /= this.dir_mod;
        
                    bulletEnemy.body.velocity.x = this.dir_x * gameOptions.bossBulletsSpeed;
                    bulletEnemy.body.velocity.y = this.dir_y * gameOptions.bossBulletsSpeed;
                }
                else if(i == 1){
                    var bulletEnemy = new shooter1942.bulletEnemyPrefab(this.game, enemy.x, enemy.y);
                    this.bulletsEnemy.add(bulletEnemy);
                    
                    this.dir_x = (this.player.body.position.x - enemy.body.position.x);
                    this.dir_y = (this.player.body.position.y - enemy.body.position.y);
                    this.dir_mod = Math.sqrt(this.dir_x * this.dir_x + this.dir_y * this.dir_y);
                    this.dir_x /= this.dir_mod;
                    this.dir_y /= this.dir_mod;
        
                    bulletEnemy.body.velocity.x = this.dir_x * gameOptions.bossBulletsSpeed;
                    bulletEnemy.body.velocity.y = this.dir_y * gameOptions.bossBulletsSpeed;
                }
                else if(i == 2)
                {
                    var bulletEnemy = new shooter1942.bulletEnemyPrefab(this.game, enemy.x, enemy.y);
                    this.bulletsEnemy.add(bulletEnemy);
                    
                    this.dir_x = (this.player.body.position.x+75 - enemy.body.position.x);
                    this.dir_y = (this.player.body.position.y+0 - enemy.body.position.y);
                    this.dir_mod = Math.sqrt(this.dir_x * this.dir_x + this.dir_y * this.dir_y);
                    this.dir_x /= this.dir_mod;
                    this.dir_y /= this.dir_mod;
        
                    bulletEnemy.body.velocity.x = this.dir_x * gameOptions.bossBulletsSpeed;
                    bulletEnemy.body.velocity.y = this.dir_y * gameOptions.bossBulletsSpeed;
                }
            else if(i == 3)
                {
                    var bulletEnemy = new shooter1942.bulletEnemyPrefab(this.game, enemy.x, enemy.y);
                    this.bulletsEnemy.add(bulletEnemy);
                    
                    this.dir_x = (this.player.body.position.x+150 - enemy.body.position.x);
                    this.dir_y = (this.player.body.position.y+50 - enemy.body.position.y);
                    this.dir_mod = Math.sqrt(this.dir_x * this.dir_x + this.dir_y * this.dir_y);
                    this.dir_x /= this.dir_mod;
                    this.dir_y /= this.dir_mod;
        
                    bulletEnemy.body.velocity.x = this.dir_x * gameOptions.bossBulletsSpeed;
                    bulletEnemy.body.velocity.y = this.dir_y * gameOptions.bossBulletsSpeed;
                }
            else if(i == 4)
                {
                    var bulletEnemy = new shooter1942.bulletEnemyPrefab(this.game, enemy.x, enemy.y);
                    this.bulletsEnemy.add(bulletEnemy);
                    
                    this.dir_x = (this.player.body.position.x-150 - enemy.body.position.x);
                    this.dir_y = (this.player.body.position.y-50 - enemy.body.position.y);
                    this.dir_mod = Math.sqrt(this.dir_x * this.dir_x + this.dir_y * this.dir_y);
                    this.dir_x /= this.dir_mod;
                    this.dir_y /= this.dir_mod;
        
                    bulletEnemy.body.velocity.x = this.dir_x * gameOptions.bossBulletsSpeed;
                    bulletEnemy.body.velocity.y = this.dir_y * gameOptions.bossBulletsSpeed;
                }
            }
          /*  else
            {
                bulletEnemy.reset(enemy.x, enemy.y);
            }*/
       // }
        
    },

    //---------------EXPLOSIONS-----------------------------
    
    loadExplosions:function(){
        this.explosions = this.add.group();
    },
    createExplosion:function(_x, _y, type){
        var explosion = this.explosions.getFirstExists(false);
        if(!explosion){
            explosion = new shooter1942.explosionPrefab(this.game,_x, _y, type);
            this.explosions.add(explosion);
        }
        else{
            explosion.reset(_x,_y);
        }
        if(type == 1){
            explosion.animations.play('explodePlayer',10,false,true);
        }
        else if(type == 2){
            explosion.animations.play('explode',10,false,true);
        }
        else if(type == 3){
            explosion.animations.play('explode3',10,false,true);
        }
    },

    //---------------LEVEL FUNCTIONS------------------------
    levelTextFunction:function(){
        this.levelText.destroy();
    },
    /*enemiesKilledRating:function(){
        gameOptions.accuracy = (gameOptions.totalEnemiesKilled / this.enemies.length)*100;
        gameOptions.accuracy = Math.round(gameOptions.accuracy);
        console.log("Enemies created: "+this.enemies.length);
        console.log("Enemies killed: "+gameOptions.totalEnemiesKilled);
        console.log("Rating: "+gameOptions.accuracy);
    },*/
    resetLevel:function(){
        //this.player.kill();
        gameOptions.immunity = true;
        gameOptions.playerRespawning = true;
        gameOptions.threshold = false;
        this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.playerRespawn,this);
    },
    quit:function(){
        this.soundtrack.stop();
        this.buttonSelect.play();
        this.state.start('menu');
    },
    bossKilled:function(){
        if(!this.bossAlive){
             this.timerEnd = this.game.time.events.add(Phaser.Timer.SECOND * 3, this.gameOver, this);
        }
    },
    gameOver:function(){
        if(!this.bossAlive){
        this.soundtrack.stop();
        this.music_over.play();
        gameOptions.cameFromMenu = 3;
        this.state.start('menu_highscore');
        }
    }
    
};