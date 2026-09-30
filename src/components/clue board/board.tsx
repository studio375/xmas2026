import { useStore } from "@/store/useStore"
import Clue from "./clue";
import { ClueVariable } from "@/helpers/gameData";

export default function Board(){
    const {clues, clueIndex}:any = useStore();
    return <div className="board">
        Lavagna dei sospettati
        {
            clues.map((elem:ClueVariable, i:number) => {
                return <Clue key={i} className={`${i >= clueIndex?'hidden':''}`} index={i} obj={elem} onlyPostIT={true} />
            })
        }
    </div>
}