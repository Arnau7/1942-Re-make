var shooter1942 = shooter1942 || {};

shooter1942.playerPrefab = function(game,x,y) {
    Phaser.Sprite.call(this, game,x,y, 'playerSprite');
    this.anchor.setTo(.5);
    this.scale.setTo(5);
    console.log('created player');
    //this.checkWorldBounds = true;
    //this.outOfBoundsKill = true;
   // this.animations.add('idle', [0, 1], 10, true);

};
// Crear el prefab de la bala
shooter1942.playerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.playerPrefab.prototype.constructor = shooter1942.playerPrefab;