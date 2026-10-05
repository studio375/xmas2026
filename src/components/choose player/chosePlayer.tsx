import { useStore } from "@/store/useStore";
import { Character, ClueVariable, GAME_DATA } from "@/helpers/gameData";
import Image from "next/image";
import ArcadeText from "../arcadeText";
import Button from "../button";
import React, { useState } from "react";
import PlayersGallery from "./playersGallery";



export default function ChoosePlayer(){
    const {gameStep, setGameStep, setSelectedPlayer} : any = useStore();
    const [character, setCharacter] = useState <Character>(GAME_DATA.characters[0]);
    const {clues, setClues} : any = useStore();
    const [usedClues, setUsedClues] = useState<number[]>([]);

    const pickRandomClue = (used: number[]) => {

        const possibleClues = GAME_DATA.clues.filter((elem: ClueVariable) => {
            return !used.includes(elem.id);
        });
    
        return possibleClues[Math.floor(Math.random() * possibleClues.length)];
    };
    
    const handleChoose = () => {
        setGameStep('start');
        setSelectedPlayer(character);
        const currentClues: ClueVariable[] = [];
        const newUsedClues:number[] = [];
        for (let index = 0; index < 3; index++) {
    
            const newClue = pickRandomClue(newUsedClues);
    
            if (newClue) {
                currentClues.push(newClue);
                newUsedClues.push(newClue.id);
            }
        }
        setClues(currentClues);
    };

    return <section className="flex flex-col items-center gap-10 w-screen px-[5vw] relative">
        <ArcadeText>Seleziona un personaggio</ArcadeText>
        <div className="flex items-center w-full relative justify-between">
            <PlayersGallery characters={GAME_DATA.characters} onSlideChange={(char:Character) => {setCharacter(char)}} />
            <div className="w-[35%] h-40 bg-white p-5">
                <ArcadeText addClassName="text-[#000] text-[20px]">{character.name}</ArcadeText>
                <ArcadeText Tag={'span'} addClassName="text-[#000] text-[13px] mt-1 block">{character.role}</ArcadeText>
                <ArcadeText Tag={'span'} addClassName="text-[#000] text-[12px] mt-2 block">{character.description}</ArcadeText>
            </div>
        </div>
        <Button onClick={handleChoose} className={`${character == null && 'disabled'}`}>Start game</Button>
    </section>
}