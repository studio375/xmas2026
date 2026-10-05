export interface Character {
    id: number,
    name:string,
    chooseImg:string,
    spriteImg:string,
    description?:string,
    role?:string
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
            role: 'Non so cosa faccia',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
        {
            id: 2,
            name: 'Sbobby',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
            role: 'Programmatore software',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
        {
            id: 3,
            name: 'Danny',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
            role: 'UX UI developer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
        {
            id: 4,
            name: 'Cosmic',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
            role: 'Web developer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
        {
            id: 5,
            name: 'Granita',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
            role: 'Grafica',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
        {
            id: 6,
            name: 'Mela',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
            role: 'Grafica seria',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
        {
            id: 7,
            name: 'Ale',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
            role: 'Big boss',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
        {
            id: 8,
            name: 'Elena',
            chooseImg: '/assets/characters/Rams/rams-choose.png',
            spriteImg: '/assets/characters/Rams/rams-sprite.png',
            role: 'Colei che sceglierà le musiche di questo gioco',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis velit ut pretium molestie. Phasellus elementum ex nulla, dictum laoreet justo placerat sit amet. Fusce eget tempor nunc.'
        },
    ],
    clues: [
        {id: 1, text:'Son stati trovati per terra un paio d\'occhiali', suspected: [2]},
        {id: 2, text:'è stata trovata una mentina alla liquirizia per terra verso la porta di ingresso', suspected: [2]},
        {id: 3, text:'è stato Sbobby', suspected: [2]},
    ]
}

