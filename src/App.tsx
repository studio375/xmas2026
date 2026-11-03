import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { useStore } from './store/useStore';
import ChoosePlayer from './components/choose player/chosePlayer';
import { EventBus } from './game/EventBus';
import ClueBoard from './components/clue board/clueBoard'
import GameOverlay from './components/game overlay/gameOverlay';
import SuspectedSection from './components/suspectedSection';
import { useShallow } from 'zustand/react/shallow';

function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const {gameStep, clues, clueIndex, setClueIndex, showComponents, setShowComponents, menuOpen} = useStore(useShallow(state => ({
        gameStep: state.gameStep,
        clues: state.clues,
        clueIndex: state.clueIndex,
        setClueIndex: state.setClueIndex,
        showComponents: state.showComponents,
        setShowComponents: state.setShowComponents,
        menuOpen: state.menuOpen,
    })));
    const [showClue, setShowClue] = useState(false);
    const boardOpenedByMenu = showComponents.includes('clues');
    const suspectedOpened = showComponents.includes('suspected');
    const paused = menuOpen || showClue || boardOpenedByMenu || suspectedOpened;
    useEffect(() => {
        const handleShowClue = () => {
            if (clueIndex >= clues.length) {
                if (!paused) phaserRef.current?.game?.resume();
                return;
            }
            setShowClue(true);
        }
        EventBus.on('show-clue', handleShowClue);
        return () => {
            EventBus.removeListener('show-clue', handleShowClue);
        }
    }, [clueIndex, clues, paused])
    useEffect(() => useStore.subscribe((state, previousState) => {
        if (state.gameStep === 'choose player' && state.gameStep !== previousState.gameStep) {
            setShowClue(false);
        }
    }), []);
    const handleCloseBoard = () => {
        const newIndex = showClue ? clueIndex + 1 : clueIndex;
        setShowClue(false); 
        setShowComponents(showComponents.filter(component => component !== 'clues'));
        setClueIndex(newIndex)
    }
    return (
        <div id="app">
            {gameStep === 'start' && suspectedOpened && <SuspectedSection onClose={() => setShowComponents(showComponents.filter(component => component !== 'suspected'))} />}
            {gameStep === 'start' && (showClue || boardOpenedByMenu) && <ClueBoard handleClickButton={handleCloseBoard} openedByMenu={!showClue} />}
            {gameStep == 'choose player' && <ChoosePlayer />}
            {gameStep == 'start' && <><PhaserGame ref={phaserRef} paused={paused} /><GameOverlay /></>}
        </div>
    )
}

export default App
