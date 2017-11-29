var shooter1942 = shooter1942 || {};

shooter1942.enemy2Prefab = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'enemy2');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.phase = 0;
    this.hitsLeft = 5;
    this.enemyType = 2;
    
    //this.loadBulletsEnemy();
};

shooter1942.enemy2Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy2Prefab.prototype.constructor = shooter1942.enemy2Prefab;

shooter1942.enemy2Prefab.prototype.update = function() {
    
    //-------------------MOVEMENT-----------------------
    switch(this.phase){
        case 0:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy2Speed;
            if(this.body.position.y >= gameOptions.gameHeight/2){
                shooter1942.level1.createBulletEnemy(this);
                this.phase++;
            }
            break;
        case 1:
            this.body.velocity.x = gameOptions.enemy2Speed;
            this.body.velocity.y = 0;
            if(this.body.position.x >= gameOptions.gameWidth - 64)
                this.phase++;
            break;
        case 2:
            this.body.velocity.x = 0;
            this.body.velocity.y = -gameOptions.enemy2Speed;
            if(this.body.position.y <= gameOptions.gameHeight/4)
                this.phase++;
            break;
        case 3:
            this.body.velocity.x = -gameOptions.enemy2Speed;
            this.body.velocity.y = 0;
            if(this.body.position.x <= 64){
                shooter1942.level1.createBulletEnemy(this);
                this.phase++;
            }
            break;
        case 4:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy2Speed;
            if(this.body.position.y == gameOptions.gameHeight * 3/4)
                shooter1942.level1.createBulletEnemy(this);
            break;
        default:
            break;
    }
};