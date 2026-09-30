import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_CONFIG } from '@/helpers/gameConfig';
import Phaser, { Math as PhaserMath } from 'phaser';


export class CollectibleManager
{
    collectibles: Phaser.Physics.Arcade.Group;
    counter = 0;
    counterLimit = 3;
    collectiblesImages: Phaser.GameObjects.Image[] = [];

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
        for (let index = 0; index < this.counterLimit; index++)
        {
            const texture = ASSET_KEYS.collectible;
            const scale = 0.04;
            const collectibleWidth = this.scene.textures.get(texture).get().width * scale;
            const y = 60;
            const x = (this.scene.sys.scale.width - 16) - (index * (collectibleWidth + 5));
            const coll = this.scene.add.image(x, y, texture).setOrigin(1, 0).setScrollFactor(0).setScale(scale).setVisible(false);
            this.collectiblesImages.push(coll);
        }
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
        this.update();
    }

    update(){
        this.collectiblesImages.forEach((img:Phaser.GameObjects.Image, i:number)=> {
            if(i<this.counter)
                img.setVisible(true);
            else
                img.setVisible(false);
        })
    }

    spawnCollectibleAt(x: number, y: number)
    {
        this.collectibles?.create(x, y, ASSET_KEYS.collectible).setScale(0.05);
    }
}
