import { useStore } from "@/store/useStore";
import { Character, ClueVariable, GAME_DATA } from "@/helpers/gameData";
import ArcadeText from "../arcadeText";
import Button from "../button";
import React, { useState } from "react";
import PlayersGallery from "./playersGallery";
import PlayerDescription from "./playerDescription";



export default function ChoosePlayer(){
    const startGame = useStore(state => state.startGame);
    const [character, setCharacter] = useState <Character>(GAME_DATA.characters[0]);

    const pickRandomClue = (used: number[], guiltyId:number) => {

        const possibleClues = GAME_DATA.clues.filter((elem: ClueVariable, ) => {
            return (!used.includes(elem.id) && elem.suspected.includes(guiltyId));
        });
    
        return possibleClues[Math.floor(Math.random() * possibleClues.length)];
    };
    
    const handleChoose = () => {
        const suspects = GAME_DATA.characters.filter(candidate => candidate.id !== character.id);
        if (suspects.length === 0) throw new Error('Nessun sospettato disponibile per la partita.');
        const guilty = suspects[Math.floor(Math.random() * suspects.length)];
        const currentClues: ClueVariable[] = [];
        const newUsedClues:number[] = [];
        for (let index = 0; index < 8; index++) {
    
            const newClue = pickRandomClue(newUsedClues, guilty.id);
    
            if (newClue) {
                currentClues.push(newClue);
                newUsedClues.push(newClue.id);
            }
        }
        currentClues.sort((a,b) => a.exclusivityLevel - b.exclusivityLevel);
        startGame(character, guilty, currentClues);
    };

    return <section className="character-selection flex flex-col items-center gap-5 md:gap-10 w-screen max-h-dvh overflow-y-auto px-[5vw] py-4 relative">
        <ArcadeText>Seleziona un personaggio</ArcadeText>
        <div className="character-selection-content flex flex-col md:flex-row items-center gap-3 w-full relative justify-between">
            <PlayersGallery characters={GAME_DATA.characters} onSlideChange={(char:Character) => {setCharacter(char)}} />
            <PlayerDescription character={character} />
        </div>
        <Button onClick={handleChoose}>Start game</Button>
    </section>
}