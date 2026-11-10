import Phaser, {Math} from 'phaser';
import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';

export class BombManager
{
    bombs: Phaser.Physics.Arcade.Group;
    private collectedSinceBomb = 0;

    constructor(
        private scene: Phaser.Scene,
        private player: Phaser.Physics.Arcade.Sprite,
        private bombEveryX: number,
    ) {}
    
    create()
    {
        this.bombs = this.scene.physics.add.group();
        this.addBomb(true);
    }

    addBomb(isFirst: boolean = false)
    {
        const bomb = this.bombs.create(
            this.player.x + this.scene.cameras.main.worldView.width / 2,
            16,
            ASSET_KEYS.bomb
        ).setScale(0.1);

        const [minBounce, maxBounce] = GAME_CONFIG.bombBounceLimits;
        const [minVelX, maxVelX] = GAME_CONFIG.bombVelocityXLimits;
        const [minVelY, maxVelY] = GAME_CONFIG.bombVelocityYLimits;
        var velX = Math.Between(minVelX, maxVelX); 
        if (isFirst) velX*=-1;
        bomb.setBounce(Math.FloatBetween(minBounce, maxBounce));
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(velX, Math.Between(minVelY, maxVelY));
    }

    registerCollection()
    {
        this.collectedSinceBomb += 1;
        if (this.collectedSinceBomb >= this.bombEveryX) {
            this.addBomb();
            this.collectedSinceBomb = 0;
        }
    }
}
