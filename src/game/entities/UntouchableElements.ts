import Phaser from "phaser"
import { GAME_POSITIONS } from "@/helpers/objectsPosition";
import { ASSET_KEYS } from "@/helpers/assets";
export class UntouchableElements{
    elements:Phaser.GameObjects.Group;
    constructor(private scene:Phaser.Scene){}
    create(){
        this.elements = this.scene.add.group();
        GAME_POSITIONS.untouchableElements.forEach(elem => {
            this.elements.add(this.scene.add.image(elem.x, this.scene.registry.get('floor-start')-elem.y, ASSET_KEYS[elem.key]).setOrigin(0,1));
        });
    }
}