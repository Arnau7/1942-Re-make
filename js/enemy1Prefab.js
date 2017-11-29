var shooter1942 = shooter1942 || {};

shooter1942.enemy1Prefab = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'enemy1');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;    
    
    //-------------------DIRECTION-----------------------
    this.direction_x = gameOptions.playerPosX - this.body.position.x;
    this.direction_y = gameOptions.playerPosY - this.body.position.y;
    this.direction_module = Math.sqrt(this.direction_x * this.direction_x + this.direction_y * this.direction_y);
    this.direction_x /= this.direction_module;
    this.direction_y /= this.direction_module;
    
    //------------------VELOCITY-------------------------
    this.body.velocity.x = this.direction_x * gameOptions.enemy1Speed;
    this.body.velocity.y = this.direction_y * gameOptions.enemy1Speed;
};

shooter1942.enemy1Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy1Prefab.prototype.constructor = shooter1942.enemy1Prefab;

shooter1942.enemy1Prefab.prototype.update = function() {
//    if(this.body.position.y == 50)
//        shooter1942.level1.createBulletEnemy(this);
    if(this.body.position.y >= gameOptions.playerPosY - 10)
        this.body.velocity.y = -this.direction_y * gameOptions.enemy1Speed;
    
}