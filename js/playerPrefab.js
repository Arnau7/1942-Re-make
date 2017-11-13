var shooter1942 = shooter1942 || {};

shooter1942.playerPrefab = function(game, x, y, speed) {
    Phaser.Sprite.call(this, game,x,y, 'playerSprite');
    this.anchor.setTo(.5);
    this.scale.setTo(2);
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
    //this.outOfBoundsKill = true;
    this.animations.add('idle', [0, 1], 10, true);
    this.speed = speed;
    
    this.game.add.existing(this);
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
    if(this.body.velocity.x != 0 && this.body.velocity.y != 0){
        this.aux = Math.sqrt(this.body.velocity.x * this.body.velocity.x + this.body.velocity.y * this.body.velocity.y);
        this.body.velocity.x /= this.aux;
        this.body.velocity.x *= this.speed;
        this.body.velocity.y /= this.aux;
        this.body.velocity.y *= this.speed;
    }
    
    gameOptions.playerPosY = this.body.position.y;

    //Debug elements
    this.game.debug.body(this);
    this.game.debug.text(this.speed, this.body.position.x, this.body.position.y);
};