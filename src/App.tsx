import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import * as Phaser from 'phaser';
import { useStore } from './store/useStore';
import ChoosePlayer from './components/choose player/chosePlayer';
import { EventBus } from './game/EventBus';
import { ClueVariable, GAME_DATA } from './helpers/gameData';
import ClueBoard from './components/clue board/clueBoard'

function getClue(usedClues:number[]){
    const possibleClues = GAME_DATA.clues.filter((elem:ClueVariable) => {
        return !usedClues.includes(elem.id);
    });
    return possibleClues[Math.floor(Math.random() * possibleClues.length)];
}


function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const {gameStep, setGameStep, usedClues, setUsedClues, clues, clueIndex, setClueIndex} : any = useStore();
    const [showClue, setShowClue] = useState<boolean | false>(false);
    useEffect(() => {
        const handleShowClue = () => {
            //const clue:ClueVariable = getClue(usedClues);
            setShowClue(true);
            //setUsedClues([...usedClues, clue.id])
        }
        EventBus.on('show-clue', handleShowClue);
        return () => {
            EventBus.removeListener('show-clue', handleShowClue);
        }
    }, [])
    const handleCloseBoard = () => {
        setShowClue(false); 
        setClueIndex(clueIndex+1)
        phaserRef.current?.game?.resume(); 
    }
    return (
        <div id="app">
            {showClue && <ClueBoard  handleClickButton={handleCloseBoard} />}
            {/* {showClue && <Clue obj={showClue} handleClickButton={() => {setShowClue(false); phaserRef.current?.game?.resume();}}/>} */}
            {gameStep == 'choose player' && <ChoosePlayer />}
            {gameStep == 'start' && <PhaserGame ref={phaserRef} />}
        </div>
    )
}

export default App
