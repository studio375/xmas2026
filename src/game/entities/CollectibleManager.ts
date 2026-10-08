import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';
import Phaser, { Math as PhaserMath } from 'phaser';
import { EventBus } from '../EventBus';


export class CollectibleManager
{
    collectibles: Phaser.Physics.Arcade.Group;
    counter = 0;
    counterLimit = 3;

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

    collect(player: any, coll: any)
    {
        coll.disableBody(true, true);
        this.onCollect();
        this.counter += 1;
        if (this.counter === 3)
        {
            this.onClueScore();
            this.counter = 0;
        }
        console.log(this.counter);
        EventBus.emit('props-count-update', this.counter);
    }

    spawnCollectibleAt(x: number, y: number)
    {
        this.collectibles?.create(x, y, ASSET_KEYS.collectible).setScale(0.05);
    }
}
