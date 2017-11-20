var shooter1942 = shooter1942 || {};

shooter1942.bulletPrefab = function(game,x,y){
  Phaser.Sprite.call(this,game,x,y,'double_bullet');
    this.anchor.setTo(.5);
    this.scale.setTo(1.2);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};

shooter1942.bulletPrefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.bulletPrefab.prototype.constructor = shooter1942.bulletPrefab;