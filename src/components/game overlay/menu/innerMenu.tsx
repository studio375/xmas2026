import { useStore } from "@/store/useStore";
import ArcadeText from "../../arcadeText";
import Button from "../../button";

export default function InnerMenu(){
    const setShowComponents = useStore(state => state.setShowComponents);
    const setMenuOpen = useStore(state => state.setMenuOpen);
    const resetGame = useStore(state => state.resetGame);
    const handleOnClickClues = () => {
        setShowComponents(['clues']);
        setMenuOpen(false);
    }
    return <div role="dialog" aria-modal="true" aria-label="Menu di gioco" className="game-menu fixed inset-0 z-10 bg-[#000000c9] py-10 overflow-y-auto pointer-events-auto">
        <div className="flex flex-col items-center gap-3">
            <ArcadeText addClassName="text-[35px]">Menu</ArcadeText>
            <Button onClick={handleOnClickClues}>Indizi</Button>
            <Button onClick={() => {
                setShowComponents(['suspected']);
                setMenuOpen(false);
            }}>Sospettati</Button>
            <Button onClick={resetGame}>Ricomincia</Button>
            <Button autoFocus onClick={() => setMenuOpen(false)}>Indietro</Button>
        </div>
    </div>
}