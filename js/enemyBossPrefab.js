var shooter1942 = shooter1942 || {};

shooter1942.enemyBossPrefab = function(game, x, y,type){
    Phaser.Sprite.call(this,game,x,y,'boss');
    this.animations.add('Eboss_idle', [0, 1], 10, true);
    this.animations.add('Eboss_death', [2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    this.scale.setTo(1.5);
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    //this.level = level;
    this.hitsLeft = 35;
    this.enemyType = 4;
    this.phase = 0;
    this.type = type;
    
    
    this.animations.play('Eboss_idle');
    this.timer = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.shoot, this);
};
shooter1942.enemyBossPrefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemyBossPrefab.prototype.constructor = shooter1942.enemyBossPrefab;

shooter1942.enemyBossPrefab.prototype.update = function() {
    
    //-------------------MOVEMENT-----------------------
    if(!shooter1942.level3.bossAlive){
         this.game.time.events.remove(this.timer);
    }
    
    switch(this.phase){
        //Pujar
        case 0:
            this.body.velocity.x = 0;
            this.body.velocity.y = -gameOptions.bossSpeed;
            if(this.body.position.y <= gameOptions.gameHeight/8)
            {
                this.phase++;
            }
            break;
        //Baixar
        case 1:
            this.body.velocity.y = gameOptions.bossSpeed;
            if(this.body.position.y >= gameOptions.gameHeight*0.6)
            {
                this.phase--;
            }
            break;
        default:
            break;
    }
};
shooter1942.enemyBossPrefab.prototype.shoot = function()
{
    shooter1942.level3.createBulletEnemyBoss(this);
};