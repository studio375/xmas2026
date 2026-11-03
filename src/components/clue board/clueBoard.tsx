import Board from "./board";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import CluePreview from "./cluePreview";

interface ClueBoardProps {
    handleClickButton: () => void;
    openedByMenu?: boolean;
}

export default function ClueBoard({handleClickButton, openedByMenu = false}: ClueBoardProps){
    const clues = useStore(state => state.clues);
    const clueIndex = useStore(state => state.clueIndex);
    const hasNewClue = !openedByMenu && clueIndex < clues.length;
    const [attached, setAttached] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(hasNewClue ? clueIndex : null);
    const slots = useRef<(HTMLDivElement | null)[]>([]);
    const focusIndex = useRef<number | null>(null);
    useLayoutEffect(() => {
        if (expandedIndex === null && focusIndex.current !== null) {
            slots.current[focusIndex.current]?.querySelector('button')?.focus();
            focusIndex.current = null;
        }
    }, [expandedIndex]);
    const returnToBoard = () => {
        focusIndex.current = expandedIndex;
        if (hasNewClue) setAttached(true);
        setExpandedIndex(null);
    };
    return <div role="dialog" aria-modal="true" aria-label="Lavagna degli indizi" className="clue-board-screen fixed inset-0 bg-[#000000aa] z-10">
        <Board
            clues={clues}
            visibleCount={clueIndex + (hasNewClue && attached ? 1 : 0)}
            expandedIndex={expandedIndex}
            onSelect={setExpandedIndex}
            setSlot={(index, element) => { slots.current[index] = element; }}
        />
        {expandedIndex !== null && <CluePreview
            key={clues[expandedIndex].id}
            obj={clues[expandedIndex]}
            index={expandedIndex}
            isNew={hasNewClue && !attached}
            getTarget={() => slots.current[expandedIndex]}
            onReturn={returnToBoard}
        />}
        <button type="button" autoFocus={expandedIndex === null} tabIndex={expandedIndex === null ? 0 : -1} aria-label="Chiudi lavagna" onClick={handleClickButton} className="board-close cursor-pointer"><Image src={'/assets/close.svg'} width={40} height={40} alt="" /></button>
    </div>
}