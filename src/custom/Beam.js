export class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sourceType) {
    super(scene, x, y, "beam");
    scene.add.existing(this);
    this.source = sourceType;

    

    this.play("beam_anim");
    scene.physics.world.enableBody(this);

    // Definir a velocidade do feixe com base no tipo de fonte
    if (sourceType === 'player') {
      this.body.velocity.y = -250; // Velocidade para cima quando disparado pelo jogador
      scene.projectiles.add(this);
    } else if (sourceType === 'boss') {
      this.body.velocity.y =  250; // Velocidade para baixo quando disparado pelo chefe
      scene.bossProjectiles.add(this);
    }

  }

  update() {
    // Destruir o feixe quando sair da tela
    if(this.source === 'boss'){
      if (this.y < 32 || this.y > this.scene.game.renderer.height - 32) {
        this.destroy();
      }
    }
  }
}