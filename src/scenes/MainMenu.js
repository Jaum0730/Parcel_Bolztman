import { Scene } from 'phaser';
// Import the functions you need from the SDKs you need
import {app, db} from '../db/db'
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";



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

        this.txtHighScore.once('pointerdown', () => {
          this.txtHighScore.setTintFill(0xcf70cf);
          this.music.stop();
          this.time.addEvent({delay: 1000, callback: this.startRanking, callbackScope: this, loop: false});
        }, this);

        const backButton = this.add.text(this.game.renderer.width / 2, 450, "<<Global Scores>>", { fontSize: '18px', fill: '#f7f2ad' })
        .setOrigin(0.5);
        
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start("TopScores");
        });



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

export async function get5TopScores() {
  try{

  const topScoresRef = collection(db, "topScores");
  const topScoresQuery = query(topScoresRef, orderBy("score", "desc"), limit(5));
  const topScoresSnapshot = await getDocs(topScoresQuery);
  

  const topScores = [];
  topScoresSnapshot.forEach((doc) => {
    topScores.push(doc.data());
  });

  return topScores;

}
catch (error) {
  console.error("Erro ao rquisitar os melhores scores:", error);
}

};



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

  let _topScoresString = [];

export const topScoresManager = {
  get topScoresString() {
    return _topScoresString;
  },
  set topScoresString(newTopScoresString) {
    _topScoresString = newTopScoresString;
  },
};


  
  // Função para atualizar top pontuações na variável local  // Função para atualizar top pontuações na variável local
export  async function updateTopScores(score, name) {
  try {
    // Salvar o novo score no Firestore
    await addDoc(collection(db, "topScores"), {
      name: name,
      score: score,
      timestamp: new Date().getTime()
    });

    // Obter os 5 melhores scores do Firestore
    const topScoresRef = collection(db, "topScores");
    const topScoresQuery = query(topScoresRef, orderBy("score", "desc"), limit(5));
    const topScoresSnapshot = await getDocs(topScoresQuery);
    
    const yourPositionQuery = query(topScoresRef, orderBy("score", "desc"));
    const yourPositionSnapshot = await getDocs(yourPositionQuery);
    let yourPosition = 0
    

    yourPositionSnapshot.docs.forEach((doc) => {
      // console.log("lido!")
      yourPosition += 1
      
      // para cada round verificar se "actualName" == "name"



    });

    console.log("Sua posição: " + yourPosition)

    // Atualizar a variável topScoresString com os 5 melhores scores
    topScoresSnapshot.docs.forEach((doc) => {
      const { name, score } = doc.data();
      topScoresManager.topScoresString += `${name}: ${score}\n`;
      console.log("TopScore = ", topScoresManager.topScoresString)
    });
  } 
  
  catch (error) {
    console.error("Erro ao atualizar os melhores scores:", error);
  }

  
  
};