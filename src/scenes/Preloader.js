import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    /*init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }*/

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets

        this.load.spritesheet("Boss", "assets/Sprite_Sheet_Ships/Boss.png",{
            frameWidth: 400,
            frameHeight: 400
          });
          
          this.load.image("background2", "assets/Sprite_Sheet_backgrounds/Background2.png");
          this.load.spritesheet("ship_player", "assets/Sprite_Sheet_Ships/Model1/1.png",{
            frameWidth: 32,
            frameHeight: 30
          });
          this.load.spritesheet("explosion","assets/Efects/Explosion1.png",{
            frameWidth: 53,
            frameHeight: 39.66
          });
          this.load.spritesheet("asteroid", "assets/Sprite_Sheet_backgrounds/Asteroid.png",{
            frameWidth : 50,
            frameHeight: 15
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
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
       
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










        // Create the loading text
        this.loadingText = this.add.text(this.game.renderer.width/2, 430, "Loading game...", { fontSize: '32px Orbitron' });
              // Set up the loading animation
              this.loadingAnimation = this.tweens.add({
                targets: this.loadingText,
                alpha: 0.5, // Fade the text in and out
                duration: 1500, // Animation duration in milliseconds
                ease: 'Sine.easeInOut', // Easing function
                loop: -1, // Loop the animation infinitely
                yoyo: true // Make the animation go back and forth
                });
            
              // Start the actual game scene after a short delay
              this.time.delayedCall(2000, () => {
                this.scene.start("MainMenu");
              });

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        //this.scene.start('MainMenu');
    }
}
