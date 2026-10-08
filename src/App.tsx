import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import * as Phaser from 'phaser';
import { useStore } from './store/useStore';
import ChoosePlayer from './components/choose player/chosePlayer';
import { EventBus } from './game/EventBus';
import { ClueVariable, GAME_DATA } from './helpers/gameData';
import ClueBoard from './components/clue board/clueBoard'
import Menu from './components/game overlay/menu/menu';
import GameOverlay from './components/game overlay/gameOverlay';

function getClue(usedClues:number[]){
    const possibleClues = GAME_DATA.clues.filter((elem:ClueVariable) => {
        return !usedClues.includes(elem.id);
    });
    return possibleClues[Math.floor(Math.random() * possibleClues.length)];
}

function removeArrayElementByValue(val, array){
    var i = array.indexOf(val);
    if(i !== -1) array.splice(i, 1); 
    return array;
}


function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const {gameStep, setGameStep, usedClues, setUsedClues, clues, clueIndex, setClueIndex, showComponents, setShowComponents} : any = useStore();
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
        var newIndex = showClue?clueIndex+1:clueIndex;
        setShowClue(false); 
        var currentShowComponents = showComponents;
        setShowComponents(removeArrayElementByValue('clues', currentShowComponents));
        setClueIndex(newIndex)
        phaserRef.current?.game?.resume(); 
    }
    console.log(showComponents);
    return (
        <div id="app">
            {(showClue || (showComponents.length && showComponents.includes('clues'))) ? <ClueBoard  handleClickButton={handleCloseBoard} openedByMenu={(showComponents.length && showComponents.includes('clues'))} />:''}
            {/* {showClue && <Clue obj={showClue} handleClickButton={() => {setShowClue(false); phaserRef.current?.game?.resume();}}/>} */}
            {gameStep == 'choose player' && <ChoosePlayer />}
            {gameStep == 'start' && <><PhaserGame ref={phaserRef} /><GameOverlay /></>}
        </div>
    )
}

export default App
