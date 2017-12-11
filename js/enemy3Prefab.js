var shooter1942 = shooter1942 || {};

shooter1942.enemy3Prefab = function(game, x, y, level, type){
    Phaser.Sprite.call(this, game, x, y, 'enemy3');
    this.animations.add('E03_idle', [0, 1], 10, true);
    this.animations.add('E03_death', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    this.scale.setTo(1.5);
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.level = level;
    this.hitsLeft = 15;
    this.enemyType = 3;
    this.phase = 0;
    this.type = type;
    
    this.animations.play('E03_idle');
    //this.loadBulletsEnemy();
    
    this.phaseTimes = 1;
};

shooter1942.enemy3Prefab.prototype = Object.create(Phaser.Sprite.prototype);
shooter1942.enemy3Prefab.prototype.constructor = shooter1942.enemy3Prefab;

shooter1942.enemy3Prefab.prototype.update = function() {
    
    //-------------------MOVEMENT-----------------------
    
    switch(this.phase){
        //Pujar
        case 0:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy3Speed;
            if(this.body.position.y <= gameOptions.gameHeight/5)
            {
                this.shoot();
                this.phase++;
                //this.animations.play('E02_down');
            }
            break;
        //Pujar i cap a l'esquerra
        case 1:
            this.body.velocity.y = gameOptions.enemy3Speed/3;  
            this.body.velocity.x = gameOptions.enemy3Speed/2;           
            if(this.body.position.x <= gameOptions.gameWidth/2 - 60)
            {
                this.shoot();
                this.phase++;
            }
            break;
        //Baixar i cap a l'esquerra
        case 2:
            this.body.velocity.y = -gameOptions.enemy3Speed/3;  
            this.body.velocity.x = gameOptions.enemy3Speed/2;           
            if(this.body.position.y >= gameOptions.gameHeight/5)
            {
                this.shoot();
                this.phase++;
            }
            break;
        //Baixar
        case 3:
            this.body.velocity.x = 0;
            this.body.velocity.y = -gameOptions.enemy3Speed;
            if(this.body.position.y >= gameOptions.gameHeight*0.7)
            {
                if(this.phaseTimes > 0){
                    this.shoot();
                    this.phase++;
                    this.phaseTimes--;
                }
            }
            break;
            //Pujar
        case 4:
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy3Speed;
            if(this.body.position.y <= gameOptions.gameHeight/6)
            {
                if(this.type == 1 && this.phaseTimes < 1){
                    this.shoot();
                    this.phase++;
                }
                else{
                this.shoot();
                this.phase--;
                }
            }
            break;
        case 5:
            if(this.type == 1){
            this.body.velocity.x = 0;
            this.body.velocity.y = gameOptions.enemy3Speed;
            }
            break;
         default:
            break;
    }
};
//This function creates the bullet cone on its respective level
shooter1942.enemy3Prefab.prototype.shoot = function()
{
    if(this.level == 1)
    {
        shooter1942.level1.createBulletEnemyCone(this);
    }
    else if(this.level == 2)
    {
        shooter1942.level2.createBulletEnemyCone(this);
    }
    else if(this.level == 3)
    {
        shooter1942.level3.createBulletEnemyCone(this);
    } 
}