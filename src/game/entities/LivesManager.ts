import Phaser from 'phaser';
import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';

export class LivesManager
{
    livesCounter: number;
    livesImages: Phaser.GameObjects.Image[] = [];
    recoveredLives:number = 0;
    private maxLives: number;

    constructor(private scene: Phaser.Scene, maxLives: number = GAME_CONFIG.initialLives)
    {
        this.maxLives = maxLives;
        this.livesCounter = maxLives;
    }

    create()
    {
        for (let index = 1; index <= this.maxLives; index++)
        {
            const isEmpty = this.livesCounter < index;
            const texture = isEmpty ? ASSET_KEYS.emptyHeart : ASSET_KEYS.heart;
            const scale = isEmpty ? 0.05 : 0.1;
            const heartWidth = this.scene.textures.get(texture).get().width * scale;
            const y = 16;
            const x = (this.scene.sys.scale.width - 16) - ((this.maxLives - index) * (heartWidth + 5));

            const heart = this.scene.add.image(x, y, texture).setOrigin(1, 0).setScrollFactor(0).setScale(scale);
            this.livesImages.push(heart);
        }
    }

    /** Toglie una vita e aggiorna la UI. Ritorna true se il game over è raggiunto. */
    loseLife(): boolean
    {
        this.livesCounter -= 1;
        this.update();
        return this.livesCounter <= 0;
    }

    update()
    {
        this.livesImages.forEach((heart, index) => {
            const lifeNumber = index + 1;
            if (lifeNumber <= this.livesCounter)
            {
                heart.setTexture(ASSET_KEYS.heart).setScale(0.1);
            }
            else
            {
                heart.setTexture(ASSET_KEYS.emptyHeart).setScale(0.05);
            }
        });
    }
}
