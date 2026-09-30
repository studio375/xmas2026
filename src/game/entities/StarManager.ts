import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';
import Phaser, { Math as PhaserMath } from 'phaser';


export class StarManager
{
    stars: Phaser.Physics.Arcade.Group;
    score = 0;

    constructor(
        private scene: Phaser.Scene,
        private onScoreUpdate: (score: number) => void,
    ) {}

    create()
    {
        this.stars = this.scene.physics.add.group({
            bounceY: 0.4
        });
    }

    // param naming e ordine mantenuti identici all'originale (l'overlap li passa così)
    collect(player: any, star: any)
    {
        star.disableBody(true, true);
        this.score += 1;
        this.onScoreUpdate(this.score);
    }

    spawnStarAt(x: number, y: number)
    {
        this.stars.create(x, y, ASSET_KEYS.star).setScale(0.7);
    }
}
