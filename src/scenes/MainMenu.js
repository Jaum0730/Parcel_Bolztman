import { Scene } from 'phaser';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2HAqCBowazO4V_LgGmeOb8KGn2JpS8pc",
  authDomain: "boltzmanlagrange.firebaseapp.com",
  projectId: "boltzmanlagrange",
  storageBucket: "boltzmanlagrange.appspot.com",
  messagingSenderId: "515936640801",
  appId: "1:515936640801:web:d72c908a5613c8df7fe860"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        initTopScores();

        this.background = this.add.tileSprite(0,0,this.game.renderer.width, this.game.renderer.height, "menu_background");
        this.background.setPosition(512,288);
        
        this.music = this.sound.add("music");
        this.music.setLoop(true);
        this.music.play(musicConfig);
        



        


        this.Logo = this.add.bitmapText(this.game.renderer.width /6, 200, 'pixelFont', 'BOLTZMAN LAGRANGE', 70)
        

        //=================================Botões do Menu================================//
        this.playButton = this.add.text(this.game.renderer.width / 2, 300, 'PLAY', { font:'37px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5).setInteractive();  
        
        this.prologueButton = this.add.text(this.game.renderer.width / 2, 350, 'PROLOGUE', { font: '18px Orbitron', fill: '#f7f2ad' })
            .setOrigin(0.5).setInteractive();
            
        this.creditsButton = this.add.text(this.game.renderer.width / 2, 390, 'CREDITS', { font: '18px Orbitron', fill: '#f7f2ad' })
            .setOrigin(0.5).setInteractive();

        //=================================Colorir Botões do Menu================================//


        this.input.on('gameobjectover', function (pointer, gameObject) {
                gameObject.setTintFill(0xcf70cf);
            });
        this.input.on('gameobjectout', function (pointer, gameObject) {
                gameObject.clearTint();
            });
        
        //=================================Pontuação================================//


        
        this.txtHighScore = this.add.text(this.game.renderer.width / 2, 430, '->>> Top Score: '+ localStorage.getItem('topScores')  +' <<<-', { font: '20px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5);
        this.txtHighScore.setTintFill(0xf7f2ad, 0xf7f2ad, 0xbf40bf, 0xbf40bf);
        //=========================================================================//
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


    



}

let _highScore = 0
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
      localStorage.setItem('topScores', 0);
    }

  };
  
  // Função para atualizar top pontuações na variável local
export  function updateTopScores(score, name) {
    const topScores = localStorage.getItem('topScores');
    console.log("updateTopScores.name = ", name)
    if(score > topScores){
        localStorage.setItem('topScores', score);
    }
  };