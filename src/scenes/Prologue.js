import { Scene } from "phaser";

export class Prologue extends Scene {
    constructor() {
      super('Prologue');
    }
  
    create() {
      // Add background and other visual elements for the prologue
  
      // Add text and dialogues for the prologue
      this.text1 = this.add.text(100, 100, "Havia uma época em que o universo estava mergulhado em conflito.", { fontSize: '24px', fill: '#ffffff' });
      this.text2 = this.add.text(100, 150, "Uma guerra intergaláctica de proporções épicas havia eclodido entre as diferentes facções\nque lutavam pelo controle dos recursos e da supremacia.", { fontSize: '24px', fill: '#ffffff' });
      this.text3 = this.add.text(100, 200, "Em meio a esse caos, um jovem piloto destemido chamado Max Boltzman emergiu\ncomo uma esperança para a liberdade.\n", { fontSize: '24px', fill: '#ffffff' });
      this.text4 = this.add.text(100, 250, "Max cresceu em um planeta distante chamado Lagrange,\nonde as naves espaciais eram uma parte intrínseca da cultura.", { fontSize: '24px', fill: '#ffffff' });
      this.text5 = this.add.text(100, 300, "Desde tenra idade,\nMax sonhava em se tornar um piloto de elite e viajar pelos vastos céus estelares.", { fontSize: '24px', fill: '#ffffff' });
  
      // Add a button to go back to the menu
      const backButton = this.add.text(100, 450, "<<Voltar para o Menu>>", { fontSize: '24px', fill: '#ffffff' });
      backButton.setInteractive();
      backButton.on('pointerdown', () => {
        this.scene.start("MainMenu");
      });


  
      // Add any animations or visual effects for the prologue
        this.input.on('gameobjectover', function (pointer, gameObject) {
        gameObject.setTintFill(0xcf70cf);
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
        gameObject.clearTint();
        });

        this.loadingAnimation = this.tweens.add({
            targets: [backButton],
            alpha: 0.5, // Esmace o texto
            duration: 1500, // Duração da animação em milisegungos
            ease: 'Sine.easeInOut', // Easing function
            loop: -1, // numero de repetições do loop no caso -1 é indefinidament
            yoyo: true // efeito de yoyo
            });
    
    
    }

  }