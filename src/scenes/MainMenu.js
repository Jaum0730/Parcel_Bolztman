import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        initTopScores();
        
        this.music = this.sound.add("music");
        this.music.setLoop(true);
        this.music.play(musicConfig);
        



        


        this.Logo = this.add.bitmapText(this.game.renderer.width /6, 200, 'pixelFont', 'BOLTZMAN LAGRANGE', 70)
        

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


        
        this.txtHighScore = this.add.text(this.game.renderer.width / 2, 430, '->>> Top 5:'+ localStorage.getItem('topScores')  +' <<<-', { font: '20px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5);
        this.txtHighScore.setTintFill(0xf7f2ad, 0xf7f2ad, 0xbf40bf, 0xbf40bf);*/

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
            this.time.addEvent({delay: 1000, 
                callback: this.startCreditos, 
                callbackScope: this, 
                loop: false});
        }, this);

        this.time.addEvent({
            delay:100,
            callback: this.displayTopScores,
            callbackScope: this,
            loop: false

        },this);
    }

    startGame(){
        this.scene.start('Game');
    }
    startPrologue(){
        this.scene.start('Prologue');
    }
    startCreditos(){
        this.scene.start('Credits');
    }
    displayTopScores() {
        let topScores = JSON.parse(localStorage.getItem('topScores')) || [];
    
        // Create a container for the top scores table
        let topScoresContainer = this.add.container(this.game.renderer.width / 2, 430);
    
        // Create a table header
        let tableHeader = this.add.text(0, 0, 'Rank | Player | Score', {
          fontSize: '18px',
          fill: '#f7f2ad',
          align: 'center'
        });
        topScoresContainer.add(tableHeader);
    
        // Add the top scores to the table
        let rowY = tableHeader.y + 30;
        topScores.forEach((score, index) => {
          let rankText = this.add.text(0, rowY, `${index + 1}.`, { fontSize: '16px', fill: '#f7f2ad' });
          let scoreText = this.add.text(100, rowY, score.toString(), { fontSize: '16px', fill: '#f7f2ad' });
          topScoresContainer.add([rankText, scoreText]);
          rowY += 30;
        });
    
        // Center the top scores container
        topScoresContainer.x -= topScoresContainer.width / 2;
      }

    



}

let _highScore = 0;
let _currentScore = 0;

export const scoreManager = {
  get highScore() {
    return _highScore;
  },
  set highScore(newScore) {
    _highScore = newScore;
  },
  get currentScore() {
    return _currentScore;
  },
  set currentScore(newScore) {
    _currentScore = newScore;
  }
};
export var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0};

export var gameSettings = {
    playerSpeed: 200,



};

// Função para inicializar o array de top pontuações
 function initTopScores() {
    if (!localStorage.getItem('topScores')) {
      localStorage.setItem('topScores', JSON.stringify([]));
    }
  };
  
  // Função para atualizar o array de top pontuações
export  function updateTopScores(score) {
    let topScores = JSON.parse(localStorage.getItem('topScores'));
    topScores.push(score);
    topScores.sort((a, b) => b - a); // Ordenar em ordem decrescente
    topScores = topScores.slice(0, 5); // Manter apenas os 5 melhores
    localStorage.setItem('topScores', JSON.stringify(topScores));
  };