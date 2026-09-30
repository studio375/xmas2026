import Phaser, {Math} from 'phaser';
import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';

export class BombManager
{
    bombs: Phaser.Physics.Arcade.Group;

    constructor(private scene: Phaser.Scene, private player: Phaser.Physics.Arcade.Sprite) {}

    create()
    {
        this.bombs = this.scene.physics.add.group();
        this.addBomb();
    }

    addBomb()
    {
        const bomb = this.bombs.create(
            this.player.x + this.scene.cameras.main.worldView.width / 2,
            16,
            ASSET_KEYS.bomb
        ).setScale(0.1);

        const [minBounce, maxBounce] = GAME_CONFIG.bombBounceLimits;
        const [minVelX, maxVelX] = GAME_CONFIG.bombVelocityXLimits;
        const [minVelY, maxVelY] = GAME_CONFIG.bombVelocityXLimits;
        bomb.setBounce(Math.FloatBetween(minBounce, maxBounce));
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Math.Between(minVelX, maxVelX), Math.Between(minVelY, maxVelY));
    }
}
