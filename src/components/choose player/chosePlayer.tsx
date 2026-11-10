import { useStore } from "@/store/useStore";
import { Character, ClueVariable, GAME_DATA } from "@/helpers/gameData";
import ArcadeText from "../arcadeText";
import Button from "../button";
import React, { useRef, useState } from "react";
import PlayersGallery from "./playersGallery";
import PlayerDescription from "./playerDescription";
import SetDifficulty from "./setDifficulty";
import Background from "../background";
import { gsap } from "@/helpers/gsap";


export default function ChoosePlayer(){
    const startGame = useStore(state => state.startGame);
    const [character, setCharacter] = useState <Character>(GAME_DATA.characters[0]);
    const [step, setStep] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const pickRandomClue = (used: number[], guiltyId:number) => {

        const possibleClues = GAME_DATA.clues.filter((elem: ClueVariable, ) => {
            return (!used.includes(elem.id) && elem.suspected.includes(guiltyId));
        });
    
        return possibleClues[Math.floor(Math.random() * possibleClues.length)];
    };
    
    const handleChoose = () => {
        const suspects = GAME_DATA.characters.filter(candidate => candidate.id !== character.id);
        if (suspects.length === 0) throw new Error('Nessun sospettato disponibile per la partita.');
        // const guilty = suspects[Math.floor(Math.random() * suspects.length)];
        const guilty = suspects[0];
        console.log('Guilty character:', guilty);
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

        var tml = gsap.timeline();
        tml.to(innerRef.current, { opacity: 0, duration: 0.5 })
           .then(() => {
               startGame(character, guilty, currentClues);
           });
    };

    return <section ref={ref} className={`classic-bg w-screen max-h-dvh overflow-y-auto relative`}>
        <Background /> 
        <div ref={innerRef} className={`${step === 0 ? "character-selection" : "h-screen justify-center"} flex flex-col items-center w-full h-full gap-5 md:gap-10 px-[5vw] py-4 relative`}>
            {
                step === 0 ? <><ArcadeText>Seleziona un personaggio</ArcadeText>
                <div className="character-selection-content flex flex-col md:flex-row items-center gap-3 w-full relative justify-between">
                    <PlayersGallery characters={GAME_DATA.characters} onSlideChange={(char:Character) => {setCharacter(char)}} />
                    <PlayerDescription character={character} />
                </div></> : <SetDifficulty />
            }
            {
                step === 0 ? <Button onClick={() => setStep(1)}>Avanti</Button> : <Button onClick={handleChoose}>Start Game</Button>
            }
        </div>
    </section>
}