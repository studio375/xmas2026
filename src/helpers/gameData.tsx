export interface Character {
    id: number,
    name:string,
    chooseImg:string,
    spriteImg:string
}

export interface ClueVariable {
    id: number, 
    text: string,
    suspected: number[]
}

interface GameData{
    characters:Character[],
    clues: ClueVariable[]
}

export const GAME_DATA:GameData = {
    characters : [
        {
            id: 1,
            name: 'Rams',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
        },
        {
            id:2,
            name: 'Dude',
            chooseImg: '/assets/characters/Dude/dude-choose.png',
            spriteImg: '/assets/characters/Dude/dude-sprite.png',
        },
    ],
    clues: [
        {id: 1, text:'Son stati trovati per terra un paio d\'occhiali', suspected: [2]},
        {id: 2, text:'è stata trovata una mentina alla liquirizia per terra verso la porta di ingresso', suspected: [2]},
        {id: 3, text:'è stato Sbobby', suspected: [2]},
    ]
}

