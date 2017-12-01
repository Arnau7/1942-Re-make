var shooter1942 = shooter1942 || {};

shooter1942.enemy3Prefab = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'enemy2');
    this.animations.add('E02_idle', [0, 1], 10, true);
    this.animations.add('E02_right', [2, 3, 4, 5], 20, false);
    this.animations.add('E02_up', [6, 7, 8, 9], 20, false);
    this.animations.add('E02_left', [10, 11, 12, 13], 20, false);
    this.animations.add('E02_down', [14, 15, 16, 17], 20, false);
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.phase = 0;
    this.hitsLeft = 15;
    this.enemyType = 3;
    
    this.animations.play('E02_up');
    //this.loadBulletsEnemy();
};

shooter1942.enemy3Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy3Prefab.prototype.constructor = shooter1942.enemy3Prefab;

shooter1942.enemy3Prefab.prototype.update = function() {
    
    //-------------------MOVEMENT-----------------------
    switch(this.phase){
        case 0:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy3Speed;
            if(this.body.position.y >= gameOptions.gameHeight/1.5 && !gameOptions.playerRespawning){
                shooter1942.level1.createBulletEnemy(this);
                this.phase++;
                //this.animations.play('E02_down');
            }
            break;
        case 1:
            this.body.velocity.x = 0;
            this.body.velocity.y -= gameOptions.enemy3Speed/2;
            if(this.body.position.y >= gameOptions.gameHeight*3/4 && !gameOptions.playerRespawning){
                this.phase++;
                //this.animations.play('E02_up');
            }
            break;
        case 2:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy3Speed;
            if(this.body.position.y <= gameOptions.gameHeight/4 && !gameOptions.playerRespawning){
                this.phase = 1;
                //this.animations.play('E02_down');
            }
            break;
        case 3:
            this.body.velocity.x = -gameOptions.enemy2Speed;
            this.body.velocity.y = 0;
            if(this.body.position.x <= 64 && !gameOptions.playerRespawning){
                shooter1942.level1.createBulletEnemy(this);
                this.phase++;
                this.animations.play('E02_down');
            }
            break;
        case 4:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy2Speed;
            this.animations.play('E02_idle');
            if(this.body.position.y == gameOptions.gameHeight * 3/4 && !gameOptions.playerRespawning)
                shooter1942.level1.createBulletEnemy(this);
            break;
        default:
            break;
    }
};