var shooter1942 = shooter1942 || {};

shooter1942.playerPrefab = function(game, x, y, speed) {
    Phaser.Sprite.call(this, game,x,y, 'playerSprite');
    this.anchor.setTo(.5);
    this.scale.setTo(2);
    this.game.physics.arcade.enable(this);
    this.game.add.existing(this);
    console.log('created player');
    this.checkWorldBounds = true;
    //this.outOfBoundsKill = true;
    this.animations.add('idle', [0, 1], 10, true);
    this.speed = speed;
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
};
// Crear el prefab de la bala
shooter1942.playerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.playerPrefab.prototype.constructor = shooter1942.playerPrefab;

shooter1942.playerPrefab.prototype.update = function(){
    this.animations.play('idle');
    
    if (this.cursors.left.isDown) {
        this.body.velocity.x = -this.speed;
    }
    else if (this.cursors.right.isDown) {
        this.body.velocity.x = this.speed;
    }
    else{
        this.body.velocity.x = 0;
    }
    if (this.cursors.up.isDown) {
        this.body.velocity.y = -this.speed;
    }
    else if (this.cursors.down.isDown) {
        this.body.velocity.y = this.speed;
    }
    else{
        this.body.velocity.y = 0;
    }
};