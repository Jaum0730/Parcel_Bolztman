import { Scene } from "phaser";
import { topScoresManager, updateTopScores } from "./MainMenu";

export class TopScores extends Scene {
    constructor() {
        super('TopScores');
    }

    preload() {
        // Nada a pré-carregar aqui
    }

    create() {
        //============================== RENDER ==============================
        this.topRanking = this.add.text(
            this.game.renderer.width / 2,
            100,
            'TOP RANKING ',
            {
                font: '30px Orbitron',
                fill: '#fff'
            })
            .setOrigin(0.5);

        this.top1 = this.add.text(
            this.game.renderer.width / 2,
            150,
            'TOP 1: ' + topScoresManager.top1,
            {
                font: '24px Orbitron',
                fill: '#fff'
            })
            .setOrigin(0.5);

        this.top2 = this.add.text(
            this.game.renderer.width / 2,
            200,
            'TOP 2: ' + topScoresManager.top2,
            {
                font: '24px Orbitron',
                fill: '#fff'
            })
            .setOrigin(0.5);

        this.top3 = this.add.text(
            this.game.renderer.width / 2,
            250,
            'TOP 3: ' + topScoresManager.top3,
            {
                font: '24px Orbitron',
                fill: '#fff'
            })
            .setOrigin(0.5);

        this.top4 = this.add.text(
            this.game.renderer.width / 2,
            300,
            'TOP 4: ' + topScoresManager.top4,
            {
                font: '24px Orbitron',
                fill: '#fff'
            })
            .setOrigin(0.5);

        this.top5 = this.add.text(
            this.game.renderer.width / 2,
            350,
            'TOP 5: ' + topScoresManager.top5,
            {
                font: '24px Orbitron',
                fill: '#fff'
            })
            .setOrigin(0.5);

        // Botão para atualizar a tabela
        this.refreshButton = this.add.text(
            this.game.renderer.width / 2,
            400,
            '<< Refresh >>',
            {
                font: '24px Orbitron',
                fill: '#fff'
            })
            .setOrigin(0.5)
            .setInteractive();

        this.refreshButton.on('pointerdown', async () => {
            this.refreshButton.setTintFill(0xcf70cf);
            await updateTopScores();
            this.refreshButton.clearTint();
            this.update();
        });

        // Animação de colorido (acho q fica top)
        this.startColorCycle(this.top1);
        // Animação de pulsação do título
        this.startPulse(this.topRanking);

        //=================================Colorir Botões do Menu================================//
        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTintFill(0xcf70cf);
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.clearTint();
        });

        const backButton = this.add.text(100, 450, "<<Voltar para o Menu>>", { fontSize: '24px', fill: '#f7f2ad' });
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start("MainMenu");
        });
    }


    // Função para iniciar a animação de pulsação do texto
    startPulse(text) {
        // Cria um tween para aumentar a escala do texto
        this.tweens.add({
            targets: text,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1500,
            yoyo: true, // Faz o tween voltar à escala original
            repeat: -1, // Faz o tween repetir indefinidamente
            ease: 'Sine.easeInOut' // Tipo de interpolação suave
            });
    }
    
    // Função para iniciar a mudança de cores
    startColorCycle(text) {
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
        let colorIndex = 0;
        this.changeColor(text, colors, colorIndex);
        }

    // Função por tratar o comportamento das mudanças de cores
    changeColor(text, colors, colorIndex) {
        const nextColorIndex = (colorIndex + 1) % colors.length;
        const currentColor = Phaser.Display.Color.IntegerToColor(colors[colorIndex]);
        const nextColor = Phaser.Display.Color.IntegerToColor(colors[nextColorIndex]);

        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 800,
            onUpdate: (tween) => {
                const value = tween.getValue();
                const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                    currentColor,
                    nextColor,
                    100,
                    value
                );
                const colorInt = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
                text.setTintFill(colorInt);
                },
            onComplete: () => {
                this.changeColor(text, colors, nextColorIndex);
                }
                });
    }
    async update(){

        // acredito que dê para mehorar
        // await updateTopScores();
        this.top1.setText('TOP 1: ' + topScoresManager.top1);
        this.top2.setText('TOP 2: ' + topScoresManager.top2);
        this.top3.setText('TOP 3: ' + topScoresManager.top3);
        this.top4.setText('TOP 4: ' + topScoresManager.top4);
        this.top5.setText('TOP 5: ' + topScoresManager.top5);
    }
}
