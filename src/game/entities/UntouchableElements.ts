import Phaser from "phaser"
import { GAME_POSITIONS } from "@/helpers/objectsPosition";
import { ASSET_KEYS } from "@/helpers/assets";
export class UntouchableElements{
    elements:Phaser.GameObjects.Group;
    private cloudPositions: {x: number, y: number}[] = [];
    constructor(private scene:Phaser.Scene){}
    create(){
        this.elements = this.scene.add.group();

        const totalWidth = this.scene.registry.get('world-width');
        const totalHeight = this.scene.sys.scale.height*0.75;
        
        for (let index = 0; index < 30; index++) {
            const x = Math.random() * totalWidth;
            const y = (Math.random() * totalHeight);
            const possibleClouds = [ASSET_KEYS.cloud, ASSET_KEYS.cloud2, ASSET_KEYS.cloud3];
            const cloudKey = possibleClouds[Math.floor(Math.random() * possibleClouds.length)];
            const minY = this.scene.registry.get('floor-start') - 250;
            const cloudY = minY-y;

            //controllo se la nuvola si sovrappone ad altre nuvole
            const overlap = this.checkOverlap(x, cloudY);
            if (!overlap) {
                this.addElement(x, cloudY, cloudKey);
                this.cloudPositions.push({x, y: cloudY});
            }else{
                index--; // riprovo con un nuovo posizionamento della nuvola
            }
        }

        GAME_POSITIONS.untouchableElements.forEach(elem => {
            var y = this.scene.registry.get('floor-start')-elem.y;
            this.addElement(elem.x, y, ASSET_KEYS[elem.key]);
        });
    }

    private checkOverlap(x:number, y:number): boolean{
        for (const pos of this.cloudPositions) {
            //controllo che le posizioni della nuova nuvola sia abbastanza distante dalle altre nuvole esistenti
            if (Math.abs(pos.x - x) < 150 && Math.abs(pos.y - y) < 100) {
                return true;
            }
        }
        return false;
    }

    private addElement(x:number, y:number, img:string){
        //l'origine non è la posizione rispetto al canvas, ma rispetto all'immagine stessa, quindi (0,1) significa che il punto di riferimento da cui iniziare a contare è in basso a sinistra dell'immagine
        this.elements.add(this.scene.add.image(x, y, img).setOrigin(0,1).setDepth(-1));
    }
}