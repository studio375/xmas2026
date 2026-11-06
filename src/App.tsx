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
    const [countdown, setCountdown] = useState<number | null>(null);
    const previousSectionOpen = useRef(sectionOpen);
    const paused = sectionOpen || countdown !== null;

    useLayoutEffect(() => {
        if (previousSectionOpen.current && !sectionOpen) {
            setCountdown(3);
        }
        previousSectionOpen.current = sectionOpen;
    }, [sectionOpen]);

    useEffect(() => {
        if (countdown === null) return;
        const timer = window.setTimeout(() => {
            setCountdown(countdown === 1 ? null : countdown - 1);
        }, 1000);
        return () => window.clearTimeout(timer);
    }, [countdown]);

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
        if (state.gameStep === 'intro' && state.gameStep !== previousState.gameStep) {
            setShowClue(false);
            setCountdown(null);
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
            {gameStep === 'start' && suspectedOpened && <SuspectedSection onClose={handleCloseSuspects} />}
            {gameStep === 'start' && (showClue || boardOpenedByMenu) && (
                <ClueBoard
                    handleClickButton={() => handleCloseBoard(false)}
                    handleGoToSuspects={() => handleCloseBoard(true)}
                    openedByMenu={!showClue}
                />
            )}
            {gameStep == 'intro' && <><Intro /><ChoosePlayer /></> }
            {gameStep == 'start' && <><PhaserGame ref={phaserRef} paused={paused} /><GameOverlay /></>}
            {gameStep === 'start' && countdown !== null && (
                <div className="fixed z-20 flex flex-col items-center justify-center gap-5 bg-[#000000aa] w-screen h-screen left-0 top-0" role="status" aria-live="assertive" aria-atomic="true">
                    <span className="text-white text-[20px]/[25px] font-press">La partita riprende tra</span>
                    <span className="text-white text-[50px]/[55px] font-press">{countdown}</span>
                </div>
            )}
        </div>
    )
}

export default App
