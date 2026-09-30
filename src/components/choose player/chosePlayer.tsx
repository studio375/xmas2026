import { useStore } from "@/store/useStore";
import { Character, ClueVariable, GAME_DATA } from "@/helpers/gameData";
import Image from "next/image";
import ArcadeText from "../arcadeText";
import Button from "../button";
import React, { useState } from "react";



export default function ChoosePlayer(){
    const {gameStep, setGameStep, setSelectedPlayer} : any = useStore();
    const [character, setCharacter] = useState <Character | null>(null);
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
    return <section className="flex flex-col items-center gap-10">
        <ArcadeText>Seleziona un personaggio</ArcadeText>
        <div className="flex items-stretch gap-10">
            {
                GAME_DATA.characters.map((elem:Character, i:number) => {
                    return <div key={i} className={`flex flex-col items-center gap-1 p-2 cursor-pointer ${character==elem && 'border-[2px] border-[var(--arcade-color)]'}`} onClick={() => setCharacter(elem)}>
                        <Image className="h-15 w-auto" src={elem.chooseImg} width={400} height={100} alt={elem.name} />
                        <ArcadeText Tag="span">{elem.name}</ArcadeText>
                    </div>
                })
            }
        </div>
        <Button onClick={handleChoose} className={`${character == null && 'disabled'}`}>Start game</Button>
    </section>
}