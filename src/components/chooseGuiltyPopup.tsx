import ArcadeText from "./arcadeText";
import Button from "./button";
import { useStore } from "@/store/useStore";
import ClassicText from "./classicText";
import { EventBus } from "@/game/EventBus";

export default function ChooseGuiltyPopup() {
    const { setGameStep, setShowComponents, setClueIndex, clueIndex } = useStore();
    const handleClick = () => {
        setGameStep('chooseGuilty');
        EventBus.emit('close-clue');
        setClueIndex(clueIndex + 1)
        setShowComponents([]);
    }
    return <div className="absolute left-0 top-0 w-full h-full bg-[#00000080] flex justify-center items-center z-10">
        <div className="flex flex-col items-center justify-between p-4 w-60 bg-white h-30">
            <ClassicText Tag="h2" addClassName="text-[#000] text-center  text-[30px]">Hai ottenuto tutti gli indizi! È il momento di scegliere il colpevole.</ClassicText>
            <Button onClick={handleClick}>Vai alla scelta</Button>
        </div>
    </div>
}