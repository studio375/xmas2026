export interface Character {
    id: number,
    name:string,
    description?:string,
    role?:string,
    frameWidth?:number,
    frameHeight?:number
}

export interface ClueVariable {
    id: number, 
    text: string,
    suspected: number[],
    hasRelated?: boolean,
    relatedClue?: number,
    exclusivityLevel:number
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
            role: 'Non so cosa faccia',
            description: 'Il suo hobby è andare in presenza dai clienti, nessuno lo ha mai visto programmare, eppure lavora sempre e conosce tutto, di ogni progetto.<br>Ama tenersi allenato: palestra, corsa e cibo sano, o almeno così ci racconta.<br>Quando si mangia qualcosa di dolce dategli tutto, ma non la crema. Se salite in macchina con lui allacciate bene le cinture.'
        },
        {
            id: 2,
            name: 'Sbobby',
            role: 'Programmatore software',
            description: 'Sempre il primo ad arrivare in ufficio, non ha mai freddo e rinnega tutto ciò che fa parte della frutta e la verdura.<br>Adora i videogiochi, il mondo del tech e i suoi gatti.<br>Conosce tutto del mondo metal, ama cucinare la pizza e nessuno lo ha mai visto arrabbiato.<br>O meglio, nessuno, forse esclusa Anita.',
            frameWidth:105
        },
        {
            id: 3,
            name: 'Danny',
            role: 'UX UI developer',
            description: 'La persona più memata del gruppo, però quando è in studio per lui non ci sono orari. Dicono che all\'ora del caffè gli piaccia togliersi gli occhiali per perdere di vista il bicchierino.<br>Quando manca qualcosa in ufficio è sempre colpa sua. Ultimamente sta prendendo la strada da fit influencer, sempre attento agli zuccheri, alle proteine e favorendo sempre l\'integrale al classico.'
        },
        {
            id: 4,
            name: 'Cosmic',
            role: 'Web developer',
            description: 'Passano gli anni, cambiano i colleghi, ma lui rimane sempre il più piccolo del gruppo.<br>Potrebbe chiederti se il blu che ha scelto si avvicina al viola che ti immaginavi.<br>Gli piace il pistacchio, ma ultimamente la marmellata ai frutti di bosco vince su tutto.<br>Ama il suo cane tanto da dedicargli un tatuaggio, gioca a tennis e la leggenda narra che nessuno lo abbia mai visto con gli occhiali da vista al di fuori dell\'ufficio.'
        },
        {
            id: 5,
            name: 'Granita',
            role: 'Grafica',
            description: 'L\'anima della festa:<br>nel giro di un secondo potrebbe passare dal farti morire dal ridere al cancellare per sbaglio un\'intera cartella del server aziendale.<br>Adora il cibo, i suoi animali, la marmellata e le polpette.<br>Disegnare è la sua grande passione, con i suoi occhiali e la sua tavoletta grafica può fare grandi cose. La sua giornata lavorativa finisce alle 17.30 andando successivamente in palestra, o almeno così dichiara.',
            frameWidth:86,
        },
        {
            id: 6,
            name: 'Mela',
            role: 'Grafica seria',
            description: 'Sangue argentino, il suo idolo è Maradona (o così ci piace pensare), nei giorni in cui lavora in presenza, fino alle 17.30, trasmette a tutti la sua tranquillità e il suo ordine.<br>Da poco ha iniziato un percorso gluten free, per sua fortuna l\'asado lo può mangiare. Adora visitare città e le camminate in montagna. <br>Sa fare dei buonissimi biscotti con il dulce de leche e siamo tutti in attesa della versione senza glutine!'
        },
        {
            id: 7,
            name: 'Ale',
            role: 'Big boss',
            description: 'Il baskettaro classe 80: Probabilmente dirà in giro che se non fosse stato per quell\'infortunio ad oggi sarebbe in NBA.<br>Arriva in ufficio già in chiamata con dei clienti, assieme al suo cagnolino e indossando i suoi rayban, che non toglie neanche quando piove. Non mangia nessun dolce che non contenga cioccolato, berrebbe 10 caffè al giorno e i suoi orari in ufficio sono sempre un\'incognita.',
            frameWidth:85,
            frameHeight:204
        },
        {
            id: 8,
            name: 'Elena',
            role: 'Colei che sceglierà le musiche di questo gioco',
            description: 'Lavora con lo studio da più anni di tutti, eppure nessuno è ancora riuscito a darle un soprannome.<br>Quando in un sito non ci sono bug, lei li crea.<br>Ama il trekking in montagna, esplorare il mondo, e il suo gattone. Ha lo spirito da influencer, mangia sano, si allena a fa yoga il sabato mattina. Nell\'ultimo periodo, solo quando è in presenza, si fa chiamare da tutti "prof", esigendo che le venga dato del lei. Figura autoritaria, ma pur sempre buona e disponibile.',
            frameWidth:86,
            frameHeight:196
        },
    ],
    //rams - 1
    //sbobby - 2
    //danny - 3
    //cosmic - 4
    //granita - 5
    //mela - 6
    //ale - 7
    //elena - 8
    clues: [ 
        {id: 1, text:'Son stati trovati per terra un paio di occhiali', suspected: [3,4,5,7], exclusivityLevel: 3},
        {id: 2, text:'È stato rilevato un capello nel cappello di Babbo Natale. La scientifica approfondirà il caso.', suspected: [2,3,4,5,6,7,8], hasRelated: true, exclusivityLevel: 1},
        {id: 3, text:'La scientifica ha analizzato il campione, risulta essere il pelo di un animale', suspected: [2,4,5,7,8], relatedClue: 2, exclusivityLevel: 2},
        {id: 4, text:'Stando alle dichiarazioni, fino alle 17.30 nessuno si è mai mosso dall\'ufficio', suspected: [5,6], exclusivityLevel: 5},
        {id: 5, text:'Placeholder Clue', suspected: [1,2,3,4,5,6,7,8], exclusivityLevel: 1},
        {id: 6, text:'Placeholder Clue', suspected: [1,2,3,4,5,6,7,8], exclusivityLevel: 1},
        {id: 7, text:'Placeholder Clue', suspected: [1,2,3,4,5,6,7,8], exclusivityLevel: 1},
    ]
}

