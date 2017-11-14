var shooter1942 = shooter1942 || {};

shooter1942.power_up = function(game, x, y, type, player){
    if(type == 0)
        Phaser.Sprite.call(this, game, x, y, 'pUp_1');
    else if(type == 1)
        Phaser.Sprite.call(this, game, x, y, 'pUp_2');
    else if(type == 2)
        Phaser.Sprite.call(this, game, x, y, 'pUp_3');
    else
        Phaser.Sprite.call(this, game, x, y, 'pUp_4');
    
    this.player = player;
    this.type = type;
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};

shooter1942.power_up.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.power_up.prototype.constructor = shooter1942.power_up;

shooter1942.power_up.prototype.update = function() {
    this.body.velocity.y = gameOptions.powerup_speed;
    //this.game.debug.body(this);
    this.game.physics.arcade.collide(this, this.player, this.col());
};
shooter1942.power_up.prototype.col = function() {
      console.log("penesito");
    if(this.type == 0){
        
    }
    else if(this.type == 1){
        gameOptions.lives++;
        this.kill();
    }
    else if(this.type == 2){
        gameOptions.rolls++;
        this.kill();
    }
    else{
        gameOptions.score += 1000;
        this.kill();
    }
};