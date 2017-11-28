var shooter1942 = shooter1942 || {};

shooter1942.enemy2Prefab = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'enemy2');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.phase = 0;
    
    this.loadBulletsEnemy();
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
                //this.createBulletEnemy(this);
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
            if(this.body.position.x <= 64)
                this.phase++;
            break;
        case 4:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy2Speed;
            break;
        default:
            break;
    }
};

/*shooter1942.enemy2Prefab.prototype.loadBulletsEnemy = function(){
        this.bulletsEnemy = this.add.group();
        this.bulletsEnemy.enableBody = true;
};
shooter1942.enemy2Prefab.prototype.createBulletEnemy = function(enemy){
    var bulletEnemy = this.bulletsEnemy.getFirstExists(false);
    if(!bulletEnemy){
        bulletEnemy = new shooter1942.bulletEnemyPrefab(this.game, this.player.x, enemy.bottom);
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
};*/