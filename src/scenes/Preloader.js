import { Scene } from 'phaser';

import { nameInput } from './GameOver'; 




export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }


    preload ()
    {
        //  Load the assets for the game - Replace with your own assets

        this.load.spritesheet("Boss", "assets/Sprite_Sheet_Ships/Boss.png",{
            frameWidth: 400,
            frameHeight: 400
          });

          this.load.image("menu_background","assets/Sprite_Sheet_backgrounds/Space Background.png" );
          this.load.image("background2", "assets/Sprite_Sheet_backgrounds/Background2.png");
          this.load.spritesheet("ship_player", "assets/Sprite_Sheet_Ships/Model1/1.png",{
            frameWidth: 32,
            frameHeight: 32
          });
          this.load.spritesheet("explosion","assets/Efects/Explosion1.png",{
            frameWidth: 53,
            frameHeight: 39.66
          });
          
          this.load.spritesheet("beam", "assets/Efects/beam.png",{
            frameWidth : 16,
            frameHeight: 16
          });
          this.load.spritesheet("missel", "assets/Efects/missel.png",{
            frameWidth : 20.33,
            frameHeight: 86
          });
          this.load.spritesheet("alien", "assets/Sprite_Sheet_Ships/Alien.png",{
            frameWidth : 32,
            frameHeight: 32
          });
    
          
    
          
    
          this.load.audio("audio_beam", "assets/snd/beam.ogg");
          this.load.audio("audio_explosion", "assets/snd/explosion.ogg");
    
          this.load.audio("music_gameplay", "assets/snd/gameplay.ogg");
        

        this.load.audio("music", "assets/snd/menu_music.ogg");
        this.load.bitmapFont("pixelFont", "assets/fonte/vdc_0.png", "assets/fonte/vdc.xml");
    }

    create ()
    {       
        this.anims.create({
            key: "alien_anim",
            frames: this.anims.generateFrameNumbers("alien"),
            frameRate: 10,
            repeat: -1
          });
          //animação da nave do player
          this.anims.create({
            key: "ship_animation",
            frames: this.anims.generateFrameNumbers("ship_player"),
            frameRate: 10,
            repeat: -1
         });
        //animação disparo
        this.anims.create({
          key: "beam_anim",
          frames: this.anims.generateFrameNumbers("beam"),
          frameRate: 20,
          repeat: -1
        });
        
        this.anims.create({
          key: "missel_anim",
        frames: this.anims.generateFrameNumbers("missel"),
        frameRate: 20,
        repeat: -1
      });
    
    
        
        //Animação de efeitos
        this.anims.create({
          key: "explosion_animation",
          frames: this.anims.generateFrameNumbers("explosion"),
          frameRate: 10,
          repeat: 0,
          hideOnComplete: true,
        });    
          //Animação Boss
          this.anims.create({
            key: "Boss_anim",
            frames: this.anims.generateFrameNumbers("Boss"),
            frameRate: 15,
            repeat: -1,
            
          });






        // Initialize text objects with empty strings
        this.text1 = this.add.text(100, 100, 'Use as setas direcionais para mover a nave', { fontSize: '24px', fill: '#ffffff' });
        this.text2 = this.add.text(420, 150, 'Presione barra de espaço para os disparar', { fontSize: '24px', fill: '#ffffff' });


        // Create tweens for the typing effect
        this.Text1 = this.tweens.add({
          targets: this.text1,
          alpha: 0, // Fade the text in and out
          duration: 3000, // Animation duration in milliseconds
          ease: 'Sine.easeInOut', // Easing function
          loop: -1, // Loop the animation infinitely
          yoyo: true, // Make the animation go back and forth

        });
        
        this.Text2 = this.tweens.add({
          targets: this.text2,
          alpha: 0, // Fade the text in and out
          duration: 3000, // Animation duration in milliseconds
          ease: 'Sine.easeInOut', // Easing function
          loop: -1, // Loop the animation infinitely
          yoyo: true, // Make the animation go back and forth

        });


        // Create the loading text
        this.loadingText = this.add.text(this.game.renderer.width/2, 430, "Loading game...", { fontSize: '32px Orbitron' });
              // Set up the loading animation
              this.loadingAnimation = this.tweens.add({
                targets: this.loadingText,
                alpha: 0.5, // Fade the text in and out
                duration: 1000, // Animation duration in milliseconds
                ease: 'Sine.easeInOut', // Easing function
                loop: -1, // Loop the animation infinitely
                yoyo: true // Make the animation go back and forth
                });
            
                // Start the actual game scene after a short delay
                this.time.delayedCall(5000, () => {
                this.scene.start("MainMenu");
              });

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        //this.scene.start('MainMenu');

        nameInput.type = 'text';
        nameInput.id = 'nameInput';
        nameInput.placeholder = 'Digite seu nome';
        // Mostrar o input
        nameInput.style.display = 'none';

        nameInput.style.position = 'absolute';
        nameInput.style.top = '50%';
        nameInput.style.left = '50%';
        nameInput.style.transform = 'translate(-50%, -50%)';
        nameInput.style.padding = '10px';
        nameInput.style.fontSize = '16px';
        nameInput.style.border = '1px solid #ccc';
        nameInput.style.borderRadius = '5px';
        nameInput.hidden = false;
        nameInput.disabled = false;
    }

    updateText(textObject, fullString, tween) {
      const value = Math.floor(tween.getValue());
      textObject.setText(fullString.substr(0, value));
  }
}