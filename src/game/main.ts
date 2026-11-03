import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Types } from "phaser";
import type { Character } from '@/helpers/gameData';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [],
    physics: {
        default: 'arcade',  
        arcade: {
            gravity: { y: 300, x:0 },
            debug: false,
        },
    },
    input: true
};

const StartGame = (parent: string, selectedPlayerObject: Character) => {
    const game = new Game({ ...config, parent, width: window.innerWidth, height: window.innerHeight });
    game.scene.add('Game', MainGame, true, { selectedPlayerObject });
    return game;
}

export default StartGame;
