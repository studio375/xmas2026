

//x=0 -> sx
//y=0 -> in linea col pavimento
export const GAME_POSITIONS = {
    platforms: [
        { x: 650, y: 130, key: 'ground2' },
        { x: 1600, y: 100, key: 'ground' },
        { x: 2600, y: 240, key: 'ground2' },
        { x: 3150, y: 140, key: 'ground2' },
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
        
    ],

    untouchableElements: [
        {x:0, y:-10, key: 'christmas_tree', scale: 0.7}
    ]
}