import { Scene } from 'phaser';
import { scoreManager, sendScoresToDatabase, app, db} from './MainMenu';




export var name
// Criar o elemento de input
console.log("Criando nameInput!!")
export var nameInput = document.createElement('input');
// nameInput.type = 'text';
// nameInput.id = 'nameInput';
// nameInput.placeholder = 'Digite seu nome';
// // Mostrar o input
// nameInput.style.display = 'none';

// nameInput.style.position = 'absolute';
// nameInput.style.top = '50%';
// nameInput.style.left = '50%';
// nameInput.style.transform = 'translate(-50%, -50%)';
// nameInput.style.padding = '10px';
// nameInput.style.fontSize = '16px';
// nameInput.style.border = '1px solid #ccc';
// nameInput.style.borderRadius = '5px';
// nameInput.hidden = false;
// nameInput.disabled = false;
// nameInput.opacity = 1;
// Adicionar o input ao document


export class GameOver extends Scene
{
  constructor ()
  {
    super('GameOver');
  }
  
  create ()
  {
    console.log("mostrando nameInput!!!!!")
    document.body.appendChild(nameInput);
    nameInput.style.display = 'block'
      
      this.add.bitmapText(this.game.renderer.width / 2, 200, 'pixelFont', 'GAME OVER', 70)
      .setOrigin(0.5);


      
      if(scoreManager.currentScore > scoreManager.highScore){
          scoreManager.highScore = scoreManager.currentScore;
          
          this.recordText = this.add.text(this.game.renderer.width / 2, 100, 'New Record: '+ scoreManager.highScore, { font: '24px Orbitron', fill: '#f7f2ad' })
          .setOrigin(0.5);

      }
      else { 
        
          this.recordText = this.add.text(this.game.renderer.width / 2, 100, 'Final Score: '+ scoreManager.currentScore, { font: '24px Orbitron', fill: '#f7f2ad' })
          .setOrigin(0.5);
      }

  
      this.playAgainButton = this.add.text(this.game.renderer.width / 2, 400, 'Play Again', { font: '24px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5)
        .setInteractive();
  
      this.playAgainButton.once('pointerdown', function() {
        this.name = nameInput.value
        name = this.name
        // Remove as cenas anteriores e inicia o menu novamente
        this.time.addEvent({
          delay: 1000, 
          callback: this.EndGame, 
          callbackScope: this, 
          loop: false});
        }, this);

        this.input.on('gameobjectover', function (pointer, gameObject) {
        gameObject.setTintFill(0xcf70cf);
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
        gameObject.clearTint();
        });



    }
    EndGame(){
      if(scoreManager.currentScore > scoreManager.highScore){
        scoreManager.highScore = scoreManager.currentScore;
        sendScoresToDatabase(scoreManager.highScore, name );
        
      }
      else { 
        
        sendScoresToDatabase(scoreManager.currentScore, name);
        
      }
      
      // Reinicia o jogo
      nameInput.disabled = true;
      // nameInput.style.opacity = 0;
      nameInput.style.display = 'none';
      nameInput.hidden = true;
    
      
      this.scene.restart("Boot");
      this.scene.restart("Game");
      this.scene.restart("MainMenu");
      this.scene.start("Preloader");
    }
}