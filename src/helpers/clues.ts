
import { GAME_DATA } from "./gameData";
import type { ClueVariable } from "./gameData";


// suspected = personaggi compatibili con l'indizio
// exclusivityLevel = numero di personaggi esclusi


const CHARACTERS = [
    { id: 1, name: 'Rams' },
    { id: 2, name: 'Sbobby' },
    { id: 3, name: 'Danny' },
    { id: 4, name: 'Cosmic' },
    { id: 5, name: 'Granita' },
    { id: 6, name: 'Mela' },
    { id: 7, name: 'Ale' },
    { id: 8, name: 'Elena' },
    { id: 9, name: 'Cri' },
];

const CLUE_DATABASE: ClueVariable[] = [
    // ==========================================
    // 1. CARATTERISTICHE FISICHE
    // ========
    // ==================================
    {
        id: 1,
        text: 'Un testimone ricorda di aver visto una persona con gli occhiali.',
        suspected: [3, 4, 5, 7, 9],
    },
    {
        id: 2,
        text: 'La persona ripresa dalle telecamere aveva qualcosa di verde addosso.',
        suspected: [3, 5],
    },
    {
        id: 3,
        text: 'È stato visto un individuo con una felpa e il cappuccio.',
        suspected: [3, 4, 7],
    },
    {
        id: 5,
        text: 'La persona avvistata aveva una barba piuttosto folta.',
        suspected: [2, 7],
    },
    {
        id: 6,
        text: 'Un testimone ha notato una persona con i capelli particolarmente lunghi.',
        suspected: [6, 8, 9],
    },
    {
        id: 7,
        text: 'La telecamera ha ripreso un individuo con una maglia blu.',
        suspected: [6, 8],
    },

    // ==========================================
    // 2. ANIMALI
    // ==========================================

    {
        id: 11,
        text: 'La scientifica ha trovato del pelo di gatto sulla scena.',
        suspected: [2, 8],
    },
    {
        id: 12,
        text: 'Sul luogo del rapimento è stato rinvenuto del pelo di cane.',
        suspected: [4, 5, 6, 7, 9],
    },
    {
        id: 13,
        text: 'Un testimone sostiene di aver visto il responsabile parlare con un animale.',
        suspected: [2, 4, 5, 7, 8],
    },
    {
        id: 14,
        text: 'È stato trovato un oggetto con l\'immagine di un gatto.',
        suspected: [2, 8],
    },
    {
        id: 15,
        text: 'La persona ricercata potrebbe avere un cane.',
        suspected: [4, 5, 6, 7, 9],
    },

    // ==========================================
    // 3. CIBO E BRIOCHE
    // ==========================================

    {
        id: 17,
        text: 'Sul luogo del misfatto sono state trovate tracce di crema.',
        suspected: [2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
        id: 21,
        text: 'La scientifica ha rilevato tracce di cioccolato su una maniglia.',
        suspected: [2,7],
    },
    {
        id: 23,
        text: 'Il sospettato sembrerebbe prestare particolare attenzione agli zuccheri.',
        suspected: [3, 5, 8],
    },
    {
        id: 26,
        text: 'Un testimone ha riferito di aver visto qualcuno mangiare una brioche integrale ai frutti di bosco.',
        suspected: [1,3,4,5,8],
    },
    

    // ==========================================
    // 4. HOBBY E PASSIONI
    // ==========================================

    {
        id: 31,
        text: 'Il sospettato sembrerebbe avere una passione per il trekking.',
        suspected: [6, 8],
    },
    {
        id: 32,
        text: 'È stato ritrovato un biglietto con la scritta: "Ci vediamo in palestra!".',
        suspected: [1, 3, 5, 8],
    },
    {
        id: 33,
        text: 'Il responsabile potrebbe essere appassionato di musica metal.',
        suspected: [2,7],
    },
    /*
    {
        id: 34,
        text: 'Sulla scena è stato trovato un oggetto riconducibile al mondo del disegno digitale.',
        suspected: [5],
    },
    */
    {
        id: 35,
        text: 'Il responsabile sembrerebbe avere una particolare passione per i viaggi.',
        suspected: [6, 8],
    },
    
    // ==========================================
    // 5. UFFICIO E LAVORO
    // ==========================================

    {
        id: 37,
        text: 'Il responsabile conosce molto bene i progetti dello studio.',
        suspected: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
        id: 39,
        text: 'La persona ricercata è stata vista impegnata in una chiamata con un cliente.',
        suspected: [1, 7],
    },
    {
        id: 41,
        text: 'La persona ricercata sembrerebbe avere familiarità con la creazione di siti web.',
        suspected: [1, 2, 3, 4, 8],
    },
    {
        id: 44,
        text: 'Il sospettato sembrerebbe avere orari di lavoro poco prevedibili.',
        suspected: [1, 3, 7],
    },

    // ==========================================
    // 6. ORARI E TESTIMONIANZE
    // ==========================================

    {
        id: 45,
        text: 'Il rapimento è avvenuto prima delle 17.30.',
        suspected: [1, 2, 3, 4, 5, 7, 8, 9],
    },
    {
        id: 46,
        text: 'Il responsabile potrebbe essere rimasto in ufficio fino alle 17.30.',
        suspected: [5, 6],
    },
    {
        id: 47,
        text: 'Un testimone ha visto qualcuno dirigersi verso la palestra dopo il lavoro.',
        suspected: [1, 3, 5, 8],
    },
    {
        id: 48,
        text: 'Il responsabile sembrerebbe essere arrivato in ufficio molto presto.',
        suspected: [1,2,3,7],
    },
    {
        id: 49,
        text: 'Secondo le testimonianze, il responsabile era impegnato in una telefonata durante il pomeriggio.',
        suspected: [1, 7],
    },

    // ==========================================
    // 7. OGGETTI E INDIZI INVESTIGATIVI
    // ==========================================

    // ==========================================
    // 8. INDIZI IRONICI E DEPISTAGGI
    // ==========================================
    {
        id: 60,
        text: 'La persona ricercata potrebbe aver pianificato tutto durante una pausa caffè.',
        suspected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
];

// Aggiunta automatica del livello di esclusività
export const DEFINITIVE_CLUES = CLUE_DATABASE.map(clue => ({
    ...clue,
    exclusivityLevel: CHARACTERS.length - clue.suspected.length,
}));
