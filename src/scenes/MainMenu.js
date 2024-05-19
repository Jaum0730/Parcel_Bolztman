import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        if(!localStorage.getItem('top_highScore')){
			localStorage.setItem('top_highScore',0);
		}
		
		if(highScore > localStorage.getItem('top_highScore')){
			localStorage.setItem('top_highScore', highScore);
		} else {
			highScore = localStorage.getItem('top_highScore');
        }
        
        this.music = this.sound.add("music");
        this.music.setLoop(true);
        this.music.play(musicConfig);
        



        


        this.Logo = this.add.bitmapText(this.game.renderer.width /4, 200, 'pixelFont', 'BOLTZMAN LAGRANGE', 70)
        

        //=================================Botões do Menu================================//
        this.playButton = this.add.text(this.game.renderer.width / 2, 300, 'PLAY', { font:'37px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5).setInteractive();  
        
        this.prologueButton = this.add.text(this.game.renderer.width / 2, 350, 'PROLOGO', { font: '18px Orbitron', fill: '#f7f2ad' })
            .setOrigin(0.5).setInteractive();
            
        this.creditsButton = this.add.text(this.game.renderer.width / 2, 390, '{CREDITOS}', { font: '18px Orbitron', fill: '#f7f2ad' })
            .setOrigin(0.5).setInteractive();

        //=================================Colorir Botões do Menu================================//


        this.input.on('gameobjectover', function (pointer, gameObject) {
                gameObject.setTintFill(0xcf70cf);
            });
        this.input.on('gameobjectout', function (pointer, gameObject) {
                gameObject.clearTint();
            });
        
        //=================================Pontuação================================//


        this.txtHighScore = this.add.text(this.game.renderer.width / 2, 430, '->>> RECORDE:'+ highScore +' <<<-', { font: '20px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5);
        this.txtHighScore.setTintFill(0xf7f2ad, 0xf7f2ad, 0xbf40bf, 0xbf40bf);

        this.playButton.once('pointerdown', function () {
            this.playButton.setTintFill(0xcf70cf);
            this.music.stop();
            this.time.addEvent({delay: 1000, callback: this.startGame, callbackScope: this, loop: false});
        }, this);

        this.prologueButton.once('pointerdown', function () {
            this.prologueButton.setTintFill(0xcf70cf);
            this.music.stop();
            this.time.addEvent({delay: 1000, callback: this.startPrologue, callbackScope: this, loop: false});
        }, this);

        this.creditsButton.once('pointerdown', function () {
            this.creditsButton.setTintFill(0xcf70cf);
            this.music.stop();
            this.time.addEvent({delay: 1000, callback: this.startCreditos, callbackScope: this, loop: false});
        }, this);
    }

    startGame(){
        this.scene.start('Game');
    }
    startPrologue(){
        this.scene.start('prologo')
    }
    startCreditos(){
        this.scene.start('creditos')
    }


}

var highScore = 0;
var currentScore = 0;
var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0}
