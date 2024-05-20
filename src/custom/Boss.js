import { Beam } from "./Beam";
export class Boss extends Phaser.GameObjects.Sprite{

  

    constructor(scene, width, height){
        var x = width / 2;
        var y = height - 640;
    
        super(scene, x, y, "Boss");
          scene.add.existing(this);
          this.play("Boss_anim");
          scene.physics.world.enableBody(this);
    
          scene.boss.add(this);
          
          this.beamTimer = scene.time.addEvent({
            delay: 2000, // 2 segundos
            callback: this.shootBeam,
            callbackScope: this,
            loop: true
          });
    
    };

    shootBeam() {
      var beam = new Beam(this.scene, this.x, this.y);
      beam.setScale(4);
    }

    /*preDestroy() {
      super.preDestroy();
      this.beamTimer.remove();
    }
  */
    
    }