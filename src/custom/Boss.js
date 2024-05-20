
export class Boss extends Phaser.GameObjects.Sprite{

  

    constructor(scene, width, height){
        var x = width / 2;
        var y = height - 640;
    
        super(scene, x, y, "Boss");
          scene.add.existing(this);
          this.play("Boss_anim");
          scene.physics.world.enableBody(this);
    
          scene.boss.add(this);
          
    
    };
    
    
    
    
    
    
    
    
    
    
    
    
    }