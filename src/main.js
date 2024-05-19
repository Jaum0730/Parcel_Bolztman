import { Physics } from 'phaser';
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

var gameSettings = {
    playerSpeed: 200,
}


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#00000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ],
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade:{
          debug: false}
      }
};

export default new Phaser.Game(config);
