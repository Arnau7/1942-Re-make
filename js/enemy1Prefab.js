var shooter1942 = shooter1942 || {};

shooter1942.enemy1Prefab = function(game, x, y, dir){
    Phaser.Sprite.call(this, game, x, y, 'enemy1');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.direction = dir - 1;
    this.velocity = gameOptions.enemy1Speed;
    this.change = true;
    
    this.body.velocity.y = this.velocity;
};

shooter1942.enemy1Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy1Prefab.prototype.constructor = shooter1942.enemy1Prefab;

shooter1942.enemy1Prefab.prototype.update = function() {
    //this.game.physics.arcade.collide(this, this.game.player, this.kill());
    if(this.direction != 0)
        this.velocity = Math.sqrt(2 * gameOptions.enemy1Speed * gameOptions.enemy1Speed);
    else
        this.velocity = gameOptions.enemy1Speed;
    
    this.body.velocity.x = this.direction * this.velocity;
    
    if(this.body.position.y >= gameOptions.playerPosY - 30 && this.change){
        this.body.velocity.y = -this.velocity;
        this.change = false;
    }
    else if(!this.change && this.body.position.y <= 0){
        this.body.velocity.y = this.velocity;
        this.change = true;
        this.kill();
    }
    
    
}