import { ASSET_KEYS } from '@/helpers/assets';
import Phaser from 'phaser';


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

    collect(star: Phaser.Physics.Arcade.Sprite)
    {
        star.destroy();
        this.score += 1;
        this.onScoreUpdate(this.score);
    }

    spawnStarAt(x: number, y: number)
    {
        this.stars.create(x, y, ASSET_KEYS.star).setScale(0.7);
    }
}
