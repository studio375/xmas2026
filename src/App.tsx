import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { useStore } from './store/useStore';
import ChoosePlayer from './components/choose player/chosePlayer';
import { EventBus } from './game/EventBus';
import ClueBoard from './components/clue board/clueBoard'
import GameOverlay from './components/game overlay/gameOverlay';
import SuspectedSection from './components/suspectedSection';
import { useShallow } from 'zustand/react/shallow';
import Intro from './components/intro/intro';
import CountDown from './components/countdown';
import EntryPage from './components/intro/entrypage';
import ChooseGuiltyPage from './components/chooseGuiltyPage';

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
    const sectionOpen = menuOpen || showClue || boardOpenedByMenu || suspectedOpened;
    const [countdown, setCountdown] = useState<number>(0);
    const previousSectionOpen = useRef(sectionOpen);
    const paused = sectionOpen || countdown !== 0;

    useLayoutEffect(() => {
        if (previousSectionOpen.current && !sectionOpen) {
            setCountdown(3);
        }
        previousSectionOpen.current = sectionOpen;
    }, [sectionOpen]);

    useEffect(() => {
        const handleShowClue = () => {
            if (clueIndex >= clues.length) {
                if (!paused) phaserRef.current?.game?.resume();
                return;
            }
            setShowClue(true);
        }
        const handleCloseClue = () => setShowClue(false);
        EventBus.on('show-clue', handleShowClue);
        EventBus.on('close-clue', handleCloseClue);
        return () => {
            EventBus.removeListener('show-clue', handleShowClue);
            EventBus.removeListener('close-clue', handleCloseClue);
        }
    }, [clueIndex, clues, paused])

    useEffect(() => useStore.subscribe((state, previousState) => {
        if (state.gameStep === 'intro' && state.gameStep !== previousState.gameStep) {
            setShowClue(false);
            setCountdown(0);
        }
    }), []);

    const handleCloseBoard = (openSuspects = false) => {
        const newIndex = showClue ? clueIndex + 1 : clueIndex;
        setShowClue(false); 
        setShowComponents(openSuspects ? ['suspected'] : []);
        setClueIndex(newIndex)
    }
    const handleCloseSuspects = () => {
        setShowComponents(showComponents.filter(component => component !== 'suspected'));
    }
    return (
        <div id="app">
            
            {/* ENTRY PAGE */}
            {gameStep === 'intro' && <><EntryPage /><Intro /><ChoosePlayer /></> }
            
            {/* SUSPECTED SECTION AND CLUE BOARD */}
            {(gameStep !== 'intro') && suspectedOpened && <SuspectedSection onClose={handleCloseSuspects} />}
            {(gameStep !== 'intro') && (showClue || boardOpenedByMenu) && (
                <ClueBoard
                    handleClickButton={() => handleCloseBoard(false)}
                    handleGoToSuspects={() => handleCloseBoard(true)}
                    openedByMenu={!showClue}
                />
            )}
            
            {/* PHASER GAME SECTION */}
            {gameStep === 'start' && <div className={`absolute w-full h-full`}><PhaserGame ref={phaserRef} paused={paused} /></div>}
            {gameStep === 'start' && countdown !== 0 && (
                <CountDown count={countdown} setCount={setCountdown} />
            )}

            {/* CHOOSE GUILTY PAGE */}
            {gameStep === 'chooseGuilty' && <ChooseGuiltyPage />}

            {/* GAME OVERLAY */}
            {gameStep !== 'intro' && <GameOverlay />}
        </div>
    )
}

export default App
