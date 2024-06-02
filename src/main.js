
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { Prologue } from './scenes/Prologue';
import { Credits } from './scenes/Credits';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig




const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: 'game-container',
    backgroundColor: '#00000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        Prologue,
        Credits,
        MainMenu,
        Game,
        GameOver,
    ],
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade:{
          debug: false}
      }
};

export default new Phaser.Game(config);
