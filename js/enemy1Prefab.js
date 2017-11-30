var shooter1942 = shooter1942 || {};

shooter1942.enemy1Prefab = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'enemy1');
    this.animations.add('E_idle', [0, 1], 10, true);
    this.animations.add('E_flip', [2, 3, 4, 5, 6, 7], 10, false);
    this.animations.play('E_idle');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    //this.outOfBoundsKill = true;    
    this.hitsLeft = 1;
    this.enemyType = 1;
    this.shoot = true;
    
    //-------------------DIRECTION-----------------------
    this.direction_x = gameOptions.playerPosX - this.body.position.x;
    this.direction_y = gameOptions.playerPosY - this.body.position.y;
    this.direction_module = Math.sqrt(this.direction_x * this.direction_x + this.direction_y * this.direction_y);
    this.direction_x /= this.direction_module;
    this.direction_y /= this.direction_module;
    
    //------------------VELOCITY-------------------------
    this.body.velocity.x = this.direction_x * gameOptions.enemy1Speed;
    this.body.velocity.y = this.direction_y * gameOptions.enemy1Speed;
    
    this.game.debug.body(this);
};

shooter1942.enemy1Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy1Prefab.prototype.constructor = shooter1942.enemy1Prefab;

shooter1942.enemy1Prefab.prototype.update = function() {
//    if(this.body.position.y == 50)
//        shooter1942.level1.createBulletEnemy(this);
    if(this.shoot){
        if(this.body.position.y >= gameOptions.playerPosY - 150 && this.body.position.y <= gameOptions.playerPosY - 140){
            shooter1942.level1.createBulletEnemy(this);
            this.shoot = false;
        }
    }
    if(this.body.position.y >= gameOptions.playerPosY - 10){
        this.animations.play('E_flip');
        this.body.velocity.y = -this.direction_y * gameOptions.enemy1Speed;
        this.shoot = true;
        this.outOfBoundsKill = true;
    }
}