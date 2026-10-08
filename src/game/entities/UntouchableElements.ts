import Phaser from "phaser"
import { GAME_POSITIONS } from "@/helpers/objectsPosition";
import { ASSET_KEYS } from "@/helpers/assets";
export class UntouchableElements{
    elements:Phaser.Physics.Arcade.StaticGroup;
    constructor(private scene:Phaser.Scene){}
    create(){
        this.elements = this.scene.physics.add.staticGroup();
        GAME_POSITIONS.untouchableElements.forEach(elem => {
            this.elements.create(elem.x, this.scene.registry.get('floor-start')-elem.y, (ASSET_KEYS as keyof object)[elem.key]).setOrigin(0,1);
        });
    }
}