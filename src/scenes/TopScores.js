import { Scene } from "phaser";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from '../db/db';




export class TopScores extends Scene{
    constructor()
    {

        super('TopScores');
    }

    preload(){
    }
    
    create(){

       



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
            'TOP 1: '+ this.get5TopScores(0), 
            { 
                font: '24px Orbitron', 
                fill: '#fff'
            })
          .setOrigin(0.5);
    
        this.top2 = this.add.text(
            this.game.renderer.width / 2, 
            200, 
            'TOP 2: ', 
            { 
                font: '24px Orbitron', 
                fill: '#fff'
            })
          .setOrigin(0.5);
    
        this.top3 = this.add.text(
            this.game.renderer.width / 2, 
            250, 
            'TOP 3: ', 
            { 
                font: '24px Orbitron', 
                fill: '#fff'
            })
          .setOrigin(0.5);
    
        this.top4 = this.add.text(
            this.game.renderer.width / 2, 
            300, 
            'TOP 4: ', 
            { 
                font: '24px Orbitron', 
                fill: '#fff'
            })
          .setOrigin(0.5);
    
        this.top5 = this.add.text(
            this.game.renderer.width / 2, 
            350, 
            'TOP 5: ', 
            { 
                font: '24px Orbitron', 
                fill: '#fff'
            })
          .setOrigin(0.5);

        // animação de colorido (acho q fica top)
        this.startColorCycle(this.top1);
        // animação de pulsação do title
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


     async get5TopScores(index) {
        try{
    
        const topScoresRef = collection(db, "topScores");
        const topScoresQuery = query(topScoresRef, orderBy("score", "desc"), limit(5));
        const topScoresSnapshot = await getDocs(topScoresQuery);
        
    
        const topScores = [];
        topScoresSnapshot.forEach((doc) => {
          topScores.push(doc.data().score);
        });
      
        return topScores[index];
    
    }
    catch (error) {
        console.error("Erro ao requisitar os melhores scores:", error);
      }

      };

    // função para iniciar a animação de pulsação do texto
    startPulse(text) {
        // cria um tween para aumentar a escala do texto
        this.tweens.add({
            targets: text,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1500,
            yoyo: true, // faz o tween voltar à escala original
            repeat: -1, // faz o tween repetir indefinidamente
            ease: 'Sine.easeInOut' // tipo de interpolação suave
        });
    }

    // função para iniciar a mudança de cores
    startColorCycle(text) {
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
        let colorIndex = 0;
        
        this.changeColor(text, colors, colorIndex);
    }

    // função por tratar o comportamento das mudanças de cores
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

    




}