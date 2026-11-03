import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_POSITIONS } from '@/helpers/objectsPosition';
import { Physics } from 'phaser';

export class FloorAndPlatforms
{
    floor: Phaser.Physics.Arcade.StaticGroup;
    platforms: Phaser.Physics.Arcade.StaticGroup;

    constructor(private scene: Phaser.Scene) {}

    create()
    {
        this.createFloor();
        this.createPlatforms();
    }

    private createFloor()
    {
        const floorWidth = this.scene.textures.get(ASSET_KEYS.base).get().width;
        this.floor = this.scene.physics.add.staticGroup({
            key: ASSET_KEYS.base,
            repeat: 10,
            setXY: {
                x: 0,
                y: this.scene.registry.get('floor-start'),
                stepX: floorWidth
            },
            setScale: { x: 1, y: 1 },
            setOrigin: { x: 0, y: 0 }
        });
        this.floor.refresh();
    }

    private createPlatforms()
    {
        this.platforms = this.scene.physics.add.staticGroup();
        GAME_POSITIONS.platforms.forEach(element => {
            this.platforms.create(element.x, this.scene.registry.get('floor-start')-element.y, ASSET_KEYS[element.key]).setOrigin(0,1).setScale(1).refreshBody();
        });
    }

    getTotalWidth(group: Phaser.Physics.Arcade.StaticGroup): number
    {
        let total = 0;
        group.children.forEach(elem => {
            if (elem instanceof Physics.Arcade.Sprite) total += elem.displayWidth;
            return true;
        });
        return total;
    }
}
