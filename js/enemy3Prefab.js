var shooter1942 = shooter1942 || {};

shooter1942.enemy3Prefab = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'enemy3');
    this.animations.add('E03_idle', [0, 1], 10, true);
    this.animations.add('E03_death', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.hitsLeft = 15;
    this.enemyType = 3;
    
    this.animations.play('E03_idle');
    //this.loadBulletsEnemy();
};

shooter1942.enemy3Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy3Prefab.prototype.constructor = shooter1942.enemy3Prefab;

shooter1942.enemy3Prefab.prototype.update = function() {
    
    //-------------------MOVEMENT-----------------------

};