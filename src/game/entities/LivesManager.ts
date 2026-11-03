import Phaser from 'phaser';
import { GAME_CONFIG } from '@/helpers/gameConfig';
import { EventBus } from '../EventBus';

export class LivesManager
{
    livesCounter: number;
    recoveredLives: number = 0;

    constructor(private scene: Phaser.Scene)
    {
        this.livesCounter = GAME_CONFIG.initialLives;
    }

    /** Toglie una vita e aggiorna la UI. Ritorna true se il game over è raggiunto. */
    loseLife(): boolean
    {
        this.livesCounter -= 1;
        EventBus.emit('update-lives', this.livesCounter);
        return this.livesCounter <= 0;
    }

}
