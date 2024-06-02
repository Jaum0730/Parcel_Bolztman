import { Beam } from "./Beam";
export class Boss extends Phaser.GameObjects.Sprite{

  

    constructor(scene, width, height){
        var x = width / 2;
        var y = height/ 6;
    
        super(scene, x, y, "Boss");
          scene.add.existing(this);
          this.play("Boss_anim");
          scene.physics.world.enableBody(this);
    
          scene.boss.add(this);
          
          this.beamTimer = scene.time.addEvent({
            delay: 3000, // 3 segundos de delay
            callback: this.shootBeam,
            callbackScope: this,
            loop: true
          });
         
    
    };

    shootBeam() {
      var beam1 = new Beam(this.scene, this.x - 130, this.y,'boss');
      beam1.setScale(6);
      beam1.type = 'boss';

      var beam2 = new Beam(this.scene, this.x + 130, this.y,'boss');
      beam2.setScale(6);
      beam2.type = 'boss';
      
    }

    preDestroy() {
      super.preDestroy();
      this.beamTimer.remove();
    }
  
    
    }