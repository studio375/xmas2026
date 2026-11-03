import type { AssetKey } from './assets';

interface PositionedElement {
    x: number;
    y: number;
    key: AssetKey;
}

//x=0 -> sx
//y=0 -> in linea col pavimento
export const GAME_POSITIONS = {
    floorTiles: 22,
    platforms: [
        { x: 650, y: 130, key: 'ground2' },
        { x: 1600, y: 100, key: 'ground' },
        { x: 2600, y: 240, key: 'ground2' },
        { x: 3150, y: 140, key: 'ground2' },
        { x: 4400, y: 120, key: 'ground' },
        { x: 4780, y: 240, key: 'ground2' },
        { x: 5300, y: 140, key: 'ground2' },
        { x: 5780, y: 260, key: 'ground' },
        { x: 6200, y: 140, key: 'ground2' },
        { x: 6610, y: 280, key: 'ground2' },
        { x: 7080, y: 400, key: 'ground' },
        { x: 7500, y: 240, key: 'ground2' },
        { x: 8070, y: 120, key: 'ground2' },
    ],

    //con prop 62px - senza prop 63px
    cubes: [
        { x: 150, y: 200, hasProp: false },
        { x: 213, y: 200, hasProp: true },
        { x: 275, y: 200, hasProp: false },
        
        { x: 800, y: 270, hasProp: true },
        
        { x: 1200, y: 220, hasProp: false },
        { x: 1263, y: 220, hasProp: true },
        
        { x: 1650, y: 300, hasProp: true },
        { x: 1713, y: 300, hasProp: true },
        
        { x: 2200, y: 120, hasProp: false },
        { x: 2263, y: 120, hasProp: true },
        { x: 2325, y: 120, hasProp: false },

        { x: 3250, y: 300, hasProp: true },
        { x: 3313, y: 300, hasProp: true },
        { x: 3375, y: 300, hasProp: false },
        
        { x: 3900, y: 120, hasProp: false },
        { x: 3963, y: 120, hasProp: false },
        { x: 4025, y: 120, hasProp: false },

        { x: 3963, y: 300, hasProp: true },

        { x: 4500, y: 280, hasProp: true },
        { x: 4910, y: 400, hasProp: true },
        { x: 4975, y: 400, hasProp: false },
        { x: 5040, y: 400, hasProp: true },

        { x: 5480, y: 300, hasProp: false },
        { x: 5545, y: 300, hasProp: true },
        { x: 5610, y: 300, hasProp: false },
        { x: 5840, y: 420, hasProp: true },

        { x: 6040, y: 65, hasProp: false },
        { x: 6105, y: 65, hasProp: false },
        { x: 6105, y: 130, hasProp: false },
        { x: 6300, y: 300, hasProp: true },
        { x: 6680, y: 440, hasProp: true },
        { x: 6745, y: 440, hasProp: false },
        { x: 6810, y: 440, hasProp: true },
        { x: 7140, y: 560, hasProp: true },
        { x: 7205, y: 560, hasProp: true },

        { x: 7350, y: 65, hasProp: false },
        { x: 7415, y: 65, hasProp: false },
        { x: 7415, y: 130, hasProp: false },
        { x: 7630, y: 400, hasProp: true },
        { x: 7695, y: 400, hasProp: false },
        { x: 7760, y: 400, hasProp: true },

        { x: 8170, y: 280, hasProp: true },
        { x: 8235, y: 280, hasProp: true },
        { x: 8490, y: 160, hasProp: false },
        { x: 8555, y: 160, hasProp: true },
        { x: 8620, y: 160, hasProp: false },
        
    ],

    untouchableElements: [
        {x:0, y:0, key: 'christmas_tree'},
        {x:4640, y:0, key: 'igloo'},
        {x:6940, y:0, key: 'christmas_tree'},
        {x:8340, y:0, key: 'igloo'},
    ]
} satisfies {
    floorTiles: number;
    platforms: PositionedElement[];
    cubes: { x: number; y: number; hasProp: boolean }[];
    untouchableElements: PositionedElement[];
};