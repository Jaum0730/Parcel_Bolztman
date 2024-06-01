import { Scene } from "phaser";

export class Prologue extends Scene {
    constructor() {
        super('Prologue');
    }

    create() {
        // Add background and other visual elements for the prologue

        // Initialize text objects with empty strings
        this.text1 = this.add.text(100, 100, '', { fontSize: '24px', fill: '#ffffff' });
        this.text2 = this.add.text(100, 140, '', { fontSize: '24px', fill: '#ffffff' });
        this.text3 = this.add.text(100, 220, '', { fontSize: '24px', fill: '#ffffff' });
        this.text4 = this.add.text(100, 300, '', { fontSize: '24px', fill: '#ffffff' });
        this.text5 = this.add.text(100, 350, '', { fontSize: '24px', fill: '#ffffff' });

        // Define the full text strings
        this.text1FullString = "Havia uma época em que o universo estava mergulhado em conflito.";
        this.text2FullString = "Uma guerra intergaláctica de proporções épicas havia eclodido\nentre as diferentes facções que lutavam pelo controle\ndos recursos e da supremacia.";
        this.text3FullString = "Em meio a esse caos, um jovem piloto destemido chamado\nMax Boltzman emergiu como uma esperança para a liberdade.";
        this.text4FullString = "Max cresceu em um planeta distante chamado Lagrange,\nonde as naves espaciais eram uma parte intrínseca da cultura.";
        this.text5FullString = "Desde de criança,Max sonhava em se tornar um piloto de elite\ne viajar pelos vastos céus estelares.";

        // Add a button to go back to the menu
        const backButton = this.add.text(100, 480, "<<Voltar para o Menu>>", { fontSize: '24px', fill: '#ffffff' });
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
            alpha: 0.5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

        // Create tweens for the typing effect
        this.typeText1 = this.tweens.addCounter({
            from: 0,
            to: this.text1FullString.length,
            duration: 3000,
            onUpdate: this.updateText.bind(this, this.text1, this.text1FullString)
        });

        this.typeText2 = this.tweens.addCounter({
            from: 0,
            to: this.text2FullString.length,
            duration: 5000,
            delay: 4000,
            onUpdate: this.updateText.bind(this, this.text2, this.text2FullString)
        });

        this.typeText3 = this.tweens.addCounter({
          from: 0,
          to: this.text3FullString.length,
          duration: 3000,
          delay: 9000,
          onUpdate: this.updateText.bind(this, this.text3, this.text3FullString)
      });

      this.typeText4 = this.tweens.addCounter({
        from: 0,
        to: this.text4FullString.length,
        duration: 3000,
        delay: 12000,
        onUpdate: this.updateText.bind(this, this.text4, this.text4FullString)
    });

    this.typeText5 = this.tweens.addCounter({
      from: 0,
      to: this.text5FullString.length,
      duration: 3000,
      delay: 15000,
      onUpdate: this.updateText.bind(this, this.text5, this.text5FullString)
  });

        
    }

    updateText(textObject, fullString, tween) {
        const value = Math.floor(tween.getValue());
        textObject.setText(fullString.substr(0, value));
    }
}