import { Scene } from "phaser";

export class Credits extends Scene {
    constructor() {
        super("Credits");
    }

    create() {
        // Initialize text objects with empty strings
        this.text1 = this.add.text(100, 100, '', { fontSize: '24px', fill: '#ffffff' });
        this.text2 = this.add.text(100, 150, '', { fontSize: '24px', fill: '#ffffff' });

        // Define the full text strings
        this.text1FullString = "Agradeceço ao professor pela dedicação e conhecimentos\ncompartilhados, além da paciência com os meus atrasos.";
        this.text2FullString = "Esse foi um jogo que fiz na minha gradução espero que gostem.\nOs links dos materiais aqui usados estão no meu\nrespositório do git hub.";

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
            duration: 5000,
            onUpdate: this.updateText.bind(this, this.text1, this.text1FullString)
        });

        this.typeText2 = this.tweens.addCounter({
            from: 0,
            to: this.text2FullString.length,
            duration: 7000,
            delay: 5500,
            onUpdate: this.updateText.bind(this, this.text2, this.text2FullString)
        });
    }

    updateText(textObject, fullString, tween) {
        const value = Math.floor(tween.getValue());
        textObject.setText(fullString.substr(0, value));
    }
}