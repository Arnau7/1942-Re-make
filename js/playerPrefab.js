var shooter1942 = shooter1942 || {};

shooter1942.playerPrefab = function(game, x, y, speed) {
    Phaser.Sprite.call(this, game,x,y, 'playerSprite');
    this.anchor.setTo(.5);
    this.scale.setTo(1.5);
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.animations.add('idle', [0, 1], 10, true);
    this.animations.add('roll', [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 10, false,true);

    this.speed = speed;
    
    this.game.add.existing(this);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    
    // Canvia la mida de la bounding box per ajustarla a l'sprite
    
    this.body.setSize(17, 20, 9, 4);
    //this.provam = false;
    this.animations.play('idle');
    
    this.canRoll = true;
    this.game.sound_roll = this.game.add.audio('rollSound');
    
    gameOptions.threshold = false;
    gameOptions.playerRespawning = false;
   
};
// Crear el prefab de la bala
shooter1942.playerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.playerPrefab.prototype.constructor = shooter1942.playerPrefab;

shooter1942.playerPrefab.prototype.update = function(){
    //this.animations.play('idle');

    if(gameOptions.playerRespawning)
    {
        //console.log('respawning: ' + this.respawning);
        this.frame = 4;
    }
    else
    {
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.speed;
            if(this.canRoll)
            {
                this.frame = 2;
            }
        }
        else if (this.cursors.right.isDown) {
            this.body.velocity.x = this.speed;
            if(this.canRoll)
            {
                this.frame = 3;
            }
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
    
    //this.game.debug.text(this.frame, 100, 200, 'DDDDDD');
    
        if(this.xKey.isDown && this.xKey.downDuration(1) && this.canRoll) {
            this.rolling();
        //this.rolling();
        }
        gameOptions.playerPosY = this.body.position.y;
    }

    

    //Debug elements
    //this.game.debug.body(this);
    //this.game.debug.text(this.speed, this.body.position.x, this.body.position.y);
};
shooter1942.playerPrefab.prototype.idle = function() {
    this.animations.play('idle');
    //gameOptions.immunity = false;
    //console.log('Finished Roll\nVulnerable');
    this.canRoll = true;
    gameOptions.threshold = false;
    this.game.time.events.add(Phaser.Timer.SECOND*0.2, this.immunity,this);
    
};
shooter1942.playerPrefab.prototype.rolling = function() {
    if(gameOptions.rolls > 0 && !gameOptions.threshold){
        this.game.sound_roll.play();
        gameOptions.immunity = true;
        gameOptions.threshold = true;
        this.canRoll = false;
        gameOptions.rolls--;
        this.animations.play('roll');
        //console.log('Immune');
        this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.idle,this);
    }
};
//This function gives the player enough time to chain rolls and keep the immunity
shooter1942.playerPrefab.prototype.immunity = function(){
    //If the player is not rolling mustn't be immune
    if(this.canRoll)
        gameOptions.immunity = false;
}

    