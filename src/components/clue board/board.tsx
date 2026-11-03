import { useStore } from "@/store/useStore"
import Clue from "./clue";

export default function Board(){
    const clues = useStore(state => state.clues);
    const clueIndex = useStore(state => state.clueIndex);
    return <div className="board">
        Lavagna dei sospettati
        {
            clues.slice(0, clueIndex).map((elem, i) => {
                return <Clue key={elem.id} index={i} obj={elem} onlyPostIT={true} />
            })
        }
    </div>
}