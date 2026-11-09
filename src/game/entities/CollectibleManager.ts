import { ASSET_KEYS } from '@/helpers/assets';
import Phaser from 'phaser';
import { EventBus } from '../EventBus';


export class CollectibleManager
{
    collectibles: Phaser.Physics.Arcade.Group;
    counter = 0;
    readonly counterLimit = 3;

    constructor(
        private scene: Phaser.Scene,
        private onClueScore: () => void,
        private onCollect: () => void,
    ) {}

    create()
    {
        this.collectibles = this.scene.physics.add.group({
            bounceY: 0.4
        });
    }

    collect(coll: Phaser.Physics.Arcade.Sprite)
    {
        coll.destroy();
        this.onCollect();
        this.counter += 1;
        if (this.counter === this.counterLimit)
        {
            this.onClueScore();
            this.counter = 0;
        }
        EventBus.emit('props-count-update', this.counter);
    }

    spawnCollectibleAt(x: number, y: number)
    {
        const collectibleKeys = [ASSET_KEYS.collectible, ASSET_KEYS.collectible2, ASSET_KEYS.collectible3];
        const randomKey = collectibleKeys[Math.floor(Math.random() * collectibleKeys.length)];
        this.collectibles?.create(x, y, randomKey);
    }
}
