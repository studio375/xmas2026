import Phaser from 'phaser';
import { ASSET_KEYS } from '@/helpers/assets';
import { GAME_POSITIONS } from '@/helpers/objectsPosition';
import { CollectibleManager } from './CollectibleManager';
import { useStore } from '@/store/useStore';

export class CubeManager
{
    cubes: Phaser.Physics.Arcade.StaticGroup;

    constructor(private scene: Phaser.Scene, private CollectibleManager: CollectibleManager) {}

    create()
    {
        var floorStart = this.scene.registry.get('floor-start');
        console.log(floorStart);
        this.cubes = this.scene.physics.add.staticGroup();
        GAME_POSITIONS.cubes.forEach(elem => {
            if(elem.hasProp)
                this.cubes.create(elem.x,  floorStart - elem.y, ASSET_KEYS.cube).setOrigin(0,1).refreshBody().setData('has-prop', true);
            else{
                this.cubes.create(elem.x, floorStart - elem.y, ASSET_KEYS.emptyCube2).setOrigin(0,1).refreshBody();
            }
        })
    }

    // inserisco due parametri generici + il player esplicito perché
    // Phaser non sempre ordina i parametri in base all'ordine della collision
    hit(a: any, b: any, player: any)
    {
        const isAPlayer = a === player;
        const hitPlayer = isAPlayer ? a : b;
        const cube = isAPlayer ? b : a;

        const playerBody = hitPlayer.body as Phaser.Physics.Arcade.Body;
        const cubeBody = cube.body as Phaser.Physics.Arcade.StaticBody;

        const overlapX = Math.min(playerBody.right, cubeBody.right) - Math.max(playerBody.left, cubeBody.left);
        const overlapY = Math.min(playerBody.bottom, cubeBody.bottom) - Math.max(playerBody.top, cubeBody.top);

        // controllo che la collisione avvenga verticalmente e che il player sia sotto il cubo
        if (overlapY < overlapX && playerBody.center.y > cubeBody.center.y && cube.getData('has-prop') == true)
        {
            const y = cubeBody.top;
            const x = cubeBody.left;
            cube.setData('has-prop', false);
            cube.setTexture(ASSET_KEYS.emptyCube);
            this.CollectibleManager.spawnCollectibleAt(x + cubeBody.halfWidth, y - cubeBody.height - 50);
        }
    }

    // pickRandomEmptyTexture(){
    //     var possibleTextures
    // }
}
