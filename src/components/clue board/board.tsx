import type { ClueVariable } from "@/helpers/gameData";
import Clue from "./clue";

interface BoardProps {
    clues: ClueVariable[];
    visibleCount: number;
    expandedIndex: number | null;
    onSelect: (index: number) => void;
    setSlot: (index: number, element: HTMLDivElement | null) => void;
}

export default function Board({clues, visibleCount, expandedIndex, onSelect, setSlot}: BoardProps){
    if (clues.length > 8) throw new Error('La lavagna supporta al massimo otto indizi.');
    return <div className="board">
        <h2>Lavagna degli indizi</h2>
        <div className="board-clues" inert={expandedIndex !== null}>
            {Array.from({length: 8}, (_, index) => {
                const clue = clues[index];
                return <div className="board-clue-slot" key={index} ref={element => setSlot(index, element)}>
                    {clue && index < visibleCount && <button
                        type="button"
                        className={`clue-pinned ${expandedIndex === index ? 'clue-hidden' : ''}`}
                        aria-label={`Ingrandisci indizio ${index + 1}: ${clue.text}`}
                        aria-haspopup="dialog"
                        onClick={() => onSelect(index)}
                    >
                        <Clue obj={clue} />
                    </button>}
                </div>;
            })}
        </div>
    </div>
}