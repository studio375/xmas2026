import { useStore } from "@/store/useStore";
import { GAME_CONFIG } from "@/helpers/gameConfig";
import type { Difficulty } from "@/helpers/gameConfig";
const difficulties: { value: Difficulty; label: string }[] = [
    { value: "easy", label: "Facile" },
    { value: "medium", label: "Media" },
    { value: "hard", label: "Difficile" },  
];
export default function SetDifficulty() {
    const difficulty = useStore(state => state.difficulty);
    const setDifficulty = useStore(state => state.setDifficulty);
    return (
        <div className="flex flex-col items-center gap-5">
            <span className="font-press">Difficoltà</span>
            <div className="flex flex-col items-center gap-3">
                {difficulties.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={difficulty === option.value}
                        className={`difficulty-option w-30 font-press${difficulty === option.value ? " is-selected" : ""}`}
                        onClick={() => setDifficulty(option.value)}
                    >
                        {option.label}
                        <span>
                            {
                                option.value !== "hard" ? 'Si aggiungerà una pallina da schivare ogni ' + GAME_CONFIG.bombEveryX[option.value] + ' collezionabili raccolti' : 'Si aggiungerà una pallina da schivare ogni collezionabile raccolto'
                            }
                        </span>
                        {}
                    </button>
                ))}
            </div>
        </div>
    );
}
