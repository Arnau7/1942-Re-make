var shooter1942 = shooter1942 || {};

shooter1942.bulletEnemyPrefab = function(game,x,y){
  Phaser.Sprite.call(this,game,x,y,'enemy_bullet');
    this.anchor.setTo(.5);
    this.scale.setTo(2);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};

shooter1942.bulletEnemyPrefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.bulletEnemyPrefab.prototype.constructor = shooter1942.bulletEnemyPrefab;