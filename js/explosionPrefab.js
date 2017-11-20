var shooter1942 = shooter1942 || {};

shooter1942.explosionPrefab = function(game,x,y,size){
  Phaser.Sprite.call(this,game,x,y,'explosion');
    this.animations.add('explode', [0,1,2,3,4,5], 10, false);
    this.anchor.setTo(.5);
    this.scale.setTo(1);
};

shooter1942.explosionPrefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.explosionPrefab.prototype.constructor = shooter1942.explosionPrefab;