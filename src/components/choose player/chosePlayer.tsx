import { useStore } from "@/store/useStore";
import { Character, ClueVariable, GAME_DATA } from "@/helpers/gameData";
import Image from "next/image";
import ArcadeText from "../arcadeText";
import Button from "../button";
import React, { useState } from "react";
import PlayersGallery from "./playersGallery";
import PlayerDescription from "./playerDescription";



export default function ChoosePlayer(){
    const {gameStep, setGameStep, setSelectedPlayer} : any = useStore();
    const [character, setCharacter] = useState <Character>(GAME_DATA.characters[0]);
    const {clues, setClues, guilty, setGuilty} : any = useStore();
    const [usedClues, setUsedClues] = useState<number[]>([]);

    const pickRandomClue = (used: number[], guiltyId:number) => {

        const possibleClues = GAME_DATA.clues.filter((elem: ClueVariable, ) => {
            return (!used.includes(elem.id) && elem.suspected.includes(guiltyId));
        });
    
        return possibleClues[Math.floor(Math.random() * possibleClues.length)];
    };
    
    const handleChoose = () => {
        setGameStep('start');
        setSelectedPlayer(character);
        var guilty = null;
        while(!guilty){
            var randomChar = GAME_DATA.characters[Math.floor(Math.random() * GAME_DATA.characters.length)];
            if(randomChar.id !== character.id)
                guilty = randomChar;
        }
        setGuilty(guilty);
        const currentClues: ClueVariable[] = [];
        const newUsedClues:number[] = [];
        for (let index = 0; index < 3; index++) {
    
            const newClue = pickRandomClue(newUsedClues, guilty.id);
    
            if (newClue) {
                currentClues.push(newClue);
                newUsedClues.push(newClue.id);
            }
        }
        console.log('il colpevole è '+guilty.name);
        currentClues.sort((a,b) => a.exclusivityLevel - b.exclusivityLevel);
        console.log(currentClues);
        setClues(currentClues);
    };

    return <section className="flex flex-col items-center gap-10 w-screen px-[5vw] relative">
        <ArcadeText>Seleziona un personaggio</ArcadeText>
        <div className="flex items-center w-full relative justify-between">
            <PlayersGallery characters={GAME_DATA.characters} onSlideChange={(char:Character) => {setCharacter(char)}} />
            <PlayerDescription character={character} />
        </div>
        <Button onClick={handleChoose} className={`${character == null && 'disabled'}`}>Start game</Button>
    </section>
}