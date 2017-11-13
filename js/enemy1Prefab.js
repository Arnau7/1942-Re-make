var shooter1942 = shooter1942 || {};

shooter1942.enemy1Prefab = function(game, x, y, dir){
    Phaser.Sprite.call(this, game, x, y, 'enemy1');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.direction = dir - 1;
    this.velocity = 75;
    this.changeDir = 1;
};

shooter1942.enemy1Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy1Prefab.prototype.constructor = shooter1942.enemy1Prefab;

shooter1942.enemy1Prefab.prototype.update = function() {
    this.game.physics.arcade.collide(this, this.game.player);
    this.body.velocity.x = this.direction * this.velocity;
    this.body.velocity.y = this.changeDir * this.velocity;
    
    if(this.changeDir == 1 && this.body.position.y > gameOptions.playerPosY - 30){
        this.changeDir = -1;
    }
}