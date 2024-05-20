import { Scene } from 'phaser';
import { gameSettings, musicConfig } from './MainMenu';
import { scoreManager } from './MainMenu';
import { Beam } from '../custom/Beam';
import { Explosion } from '../custom/Explosion';
import { Boss } from '../custom/Boss';





export class Game extends Scene
{
  
    constructor ()
    {
        super('Game');
    }

    create ()
    {

  
      
        
        this.background2 = this.add.tileSprite(0,0,this.game.renderer.width,this.game.renderer.height,"background2");
        this.background2.setPosition(100,100);
        this.background2.setScale(2);
        this.lifes = 4;
        
        
        //adicionando inimigos
        this.boss_spawnwed = false;
  
          this.enemy1 = this.physics.add.sprite(width + 10, height, "alien");
          this.enemy2 = this.physics.add.sprite(width + 10, height, "alien2");
          this.enemy3 = this.physics.add.sprite(width + 50, height, "alien3");
          
          //criando grupo
          this.boss   = this.physics.add.group();
          this.enemies =  this.physics.add.group();
          this.enemies.add(this.enemy1);
          this.enemies.add(this.enemy2);
          this.enemies.add(this.enemy3);
        //ajustando o tamanho
          this.enemy1.setScale(2);
          this.enemy2.setScale(2);
          this.enemy3.setScale(2);
        //Animação naves aliens
        this.enemy1.play("alien_anim");
          this.enemy2.play("alien_anim");
          this.enemy3.play("alien_anim");
        //Interação dos inimigos
          this.enemy1.setInteractive();
          this.enemy2.setInteractive();
          this.enemy3.setInteractive();
          
          
  
          //Logica para nave do jogador
          this.player = this.physics.add.sprite(width/2+50, height/2, "ship_player");
          this.player.setScale(2);
          //Animação das naves
          this.player.play("ship_animation");
          //setando controles da nave
          this.cursorKeys = this.input.keyboard.createCursorKeys();
          //setando os colisores
          this.player.setCollideWorldBounds(true);
          //botão para disparos
          this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
          
          
          //grupo com os projteis
          this.projectiles = this.add.group();
          
          //colisores do alien_chefe
          this.physics.add.overlap(this.projectiles, this.boss, this.hitBoss, null, this);
          
  
  
          // interação player e alien
          this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
          
          this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
  
  
  
         //vidas
          this.life_painel = this.add.bitmapText(width - 200, 5, "pixelFont", "Lifes: " + this.lifes, 32);
            
          var scoreFormated = this.zeroPad(scoreManager.currentScore, 6);
          this.scorePainel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: " + scoreFormated, 32);
  
          this.beamSound = this.sound.add("audio_beam");
          this.explosionSound = this.sound.add("audio_explosion")
  
          this.music = this.sound.add("music_gameplay");
          this.music.setLoop(true);
          this.music.play(musicConfig);
  
  
          
          
    }

    hurtPlayer(player, enemy){
        this.lifes--;
        this.life_painel.text = "Lifes: " + this.lifes
        
        this.Reset_ship(enemy);
        
        if(this.player.alpha < 1){
          return;
        }
        
        var explosion = new Explosion(this, this.player.x, player.y);
        this.explosionSound.play();
        
        this.player.disableBody(true, true);
        
        
        this.time.addEvent({
          delay: 1000,
          callback: this.Reset_Player,
          callbackScope: this,
          loop: false
        });

        
        
      };

      Reset_Player(){
        
        var x = width/2 - 8;
        var y =  height + 64;
        this.player.enableBody(true, x, y, true, true);
  
        this.player.alpha = 0.5;
          var tween = this.tweens.add({
            targets: this.player,
            y: height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat:0,
            onComplete: function(){
              this.player.alpha = 1;
              
            },
            callbackScope: this
          });

          
  
  
  
      };
      
      hitEnemy(projectile, enemy){

        var explosion = new Explosion(this, enemy.x, enemy.y);
        explosion.setScale(2);

        projectile.destroy();
        this.Reset_ship(enemy);
        scoreManager.currentScore += 15;
        //add pontos
        var scoreFormated = this.zeroPad(scoreManager.currentScore, 6);
        this.scorePainel.text = "SCORE: " + scoreFormated

        this.explosionSound.play()

      };

      hitBoss(projectile, boss){
        var explosion = new Explosion(this, boss.x, boss.y);
        explosion.setScale(2);

        projectile.destroy();
        scoreManager.currentScore += 30;

        var scoreFormated = this.zeroPad(scoreManager.currentScore, 6);
        this.scorePainel.text = "SCORE: " + scoreFormated

        this.explosionSound.play()
      }

      Boss_spawn(){
        if(scoreManager.currentScore >= 10 && !this.boss_spawnwed){
          this.boss = new Boss(this, this.game.renderer.width, this.game.renderer.height);
          this.boss_spawnwed = true;
        };
      };





      zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
          stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    };

    update(){
        
        
        
        this.aceleration_ship(this.enemy3, 5);
        this.aceleration_ship(this.enemy2, 3);
        this.aceleration_ship(this.enemy1, 1);
    
      
      

        this.movePlayer();
        this.Boss_spawn();
        

        for(var i = 0; i < this.projectiles.getChildren().length; i++){
          var beam = this.projectiles.getChildren()[i];
          beam.update();

        };

        if(this.lifes < 0){
        
          this.music.stop();
          this.scene.start("GameOver");
        };
      
    };

    Laser_Shot(){
        var beam = new Beam(this, this.player.x, this.player, 'player');
        beam.setScale(2);
        this.beamSound.play();
        
      };
  
      aceleration_ship(ship, speed){
        ship.y += speed; 
        if(ship.y > height){
          this.Reset_ship(ship)
        }
      };
      
      Reset_ship(ship){
        ship.y = 0;
        var aleatorizeX = Phaser.Math.Between(0, width);
        ship.x = aleatorizeX
      };
  
  
  
      
      destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explosion_animation");
      };
      
      movePlayer(){
        if(this.cursorKeys.left.isDown){
          this.player.setVelocityX(-gameSettings.playerSpeed);
          }
          else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            
          }
          
          if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
            
          }
          else if (this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            
          }
          if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.player.active){
              console.log("fogo!");
              this.Laser_Shot();}
          }
          
        };
  
      

}

var height = 720;
var width = 1024;
