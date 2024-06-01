import { Scene } from 'phaser';
import { scoreManager, updateTopScores} from './MainMenu';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        
       
        this.add.bitmapText(this.game.renderer.width / 2, 200, 'pixelFont', 'GAME OVER', 70)
        .setOrigin(0.5);

        if(scoreManager.currentScore > scoreManager.highScore){
            scoreManager.highScore = scoreManager.currentScore;
            updateTopScores(scoreManager.highScore);
            this.recordText = this.add.text(this.game.renderer.width / 2, 100, 'New Record: '+ scoreManager.currentScore, { font: '24px Orbitron', fill: '#f7f2ad' })
            .setOrigin(0.5);
            
            

            

        }
        else { 
          this.recordText = this.add.text(this.game.renderer.width / 2, 100, 'Final Score: '+ scoreManager.currentScore, { font: '24px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5);
      }

  
      this.playAgainButton = this.add.text(this.game.renderer.width / 2, 300, 'Play Again', { font: '24px Orbitron', fill: '#f7f2ad' })
        .setOrigin(0.5)
        .setInteractive();
  
      this.playAgainButton.once('pointerdown', function() {
        // Remove as cenas anteriores e inicia o menu novamente
        this.time.addEvent({delay: 1000, callback: this.EndGame, callbackScope: this, loop: false});
        }, this);

        this.input.on('gameobjectover', function (pointer, gameObject) {
        gameObject.setTintFill(0xcf70cf);
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
        gameObject.clearTint();
        });



    }
    EndGame(){
      // Reinicia o jogo
      this.scene.restart("Boot");
      this.scene.restart("Game");
      this.scene.restart("MainMenu");
      this.scene.start("Preloader");
    }
}
