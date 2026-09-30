import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_POSITIONS } from '@/helpers/objectsPosition';
import Phaser from 'phaser';

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

    private getFloorY(){
        var start = this.scene.sys.scale.height - this.scene.textures.get(ASSET_KEYS.base).getSourceImage().height;
        this.scene.registry.set('floor-start', start);
        return start;
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
    }

    private createPlatforms()
    {
        this.platforms = this.scene.physics.add.staticGroup();
        const startX = window.innerWidth / 2;
        GAME_POSITIONS.platforms.forEach(element => {
            this.platforms.create(element.x, this.scene.registry.get('floor-start')-element.y, (ASSET_KEYS as keyof object)[element.key]).setOrigin(0,1).setScale(1).refreshBody();
        });
    }

    getTotalWidth(group: Phaser.Physics.Arcade.StaticGroup): number
    {
        let total = 0;
        group.children.forEach((elem: any) => {
            total += elem.displayWidth;
            return true;
        });
        return total;
    }
}
