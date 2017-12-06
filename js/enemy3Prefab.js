var shooter1942 = shooter1942 || {};

shooter1942.enemy3Prefab = function(game, x, y, level){
    Phaser.Sprite.call(this, game, x, y, 'enemy3');
    this.animations.add('E03_idle', [0, 1], 10, true);
    this.animations.add('E03_death', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    this.scale.setTo(1.5);
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.level = level;
    this.hitsLeft = 15;
    this.enemyType = 3;
    this.phase = 0;
    
    this.animations.play('E03_idle');
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
            if(this.body.position.y >= gameOptions.gameHeight/1.5 && !gameOptions.playerRespawning)
            {
                if(this.level == 1)
                {
                    shooter1942.level1.createBulletEnemy(this);
                }
                else if(this.level == 2)
                {
                    shooter1942.level2.createBulletEnemy(this);
                }
                else if(this.level == 3)
                {
                    shooter1942.level3.createBulletEnemy(this);
                }
                this.phase++;
                //this.animations.play('E02_down');
            }
            break;
        case 1:
            this.body.velocity.x = 0;
            this.body.velocity.y = -gameOptions.enemy3Speed;
            if(this.body.position.y >= gameOptions.gameHeight*3/4 && !gameOptions.playerRespawning)
            {
                if(this.level == 1)
                {
                    shooter1942.level1.createBulletEnemyCone(this);
                }
                else if(this.level == 2)
                {
                    shooter1942.level2.createBulletEnemyCone(this);
                }
                else if(this.level == 3)
                {
                    shooter1942.level3.createBulletEnemyCone(this);
                }
                this.phase++;
                //this.animations.play('E02_up');
            }
            break;
        case 2:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy3Speed;
            if(this.body.position.y <= gameOptions.gameHeight/5 && !gameOptions.playerRespawning)
            {
                if(this.level == 1)
                {
                    shooter1942.level1.createBulletEnemyCone(this);
                }
                else if(this.level == 2)
                {
                    shooter1942.level2.createBulletEnemyCone(this);
                }
                else if(this.level == 3)
                {
                    shooter1942.level3.createBulletEnemyCone(this);
                }
                this.phase = 1;
                //this.animations.play('E02_down');
            }
            break;
        case 3:
            this.body.velocity.x = -gameOptions.enemy2Speed;
            this.body.velocity.y = 0;
            if(this.body.position.x <= 64 && !gameOptions.playerRespawning)
            {
                if(this.level == 1)
                {
                    shooter1942.level1.createBulletEnemyCone(this);
                }
                else if(this.level == 2)
                {
                    shooter1942.level2.createBulletEnemyCone(this);
                }
                else if(this.level == 3)
                {
                    shooter1942.level1.createBulletEnemyCone(this);
                }
                this.phase++;
                //this.animations.play('E02_down');
            }
            break;
        case 4:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy2Speed;
            //this.animations.play('E03_idle');
            if(this.body.position.y == gameOptions.gameHeight * 3/4 && !gameOptions.playerRespawning)
            {
                if(this.level == 1)
                {
                    shooter1942.level1.createBulletEnemyCone(this);
                }
                else if(this.level == 2)
                {
                    shooter1942.level2.createBulletEnemyCone(this);
                }
                else if(this.level == 3)
                {
                    shooter1942.level1.createBulletEnemyCone(this);
                }
            }
            break;
        default:
            break;
    }
};