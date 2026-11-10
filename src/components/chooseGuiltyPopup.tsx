import ArcadeText from "./arcadeText";
import Button from "./button";
import { useStore } from "@/store/useStore";
import ClassicText from "./classicText";
import { EventBus } from "@/game/EventBus";
import Image from "next/image";

export default function ChooseGuiltyPopup({fromSuspected=false, onClickClose}: {fromSuspected: boolean, onClickClose?: () => void}) {
    const { setGameStep, setShowComponents, setClueIndex, clueIndex } = useStore();
    const handleClick = () => {
        setGameStep('chooseGuilty');
        EventBus.emit('close-clue');
        setClueIndex(clueIndex + 1)
        setShowComponents([]);
    }
    return <div className="absolute left-0 top-0 w-full h-full bg-[#00000080] flex justify-center items-center z-10">
        <div className="flex flex-col items-center justify-between p-4 w-60 bg-white h-30 relative">
            {fromSuspected && <button onClick={onClickClose} className="absolute right-[5px] top-[5px] cursor-pointer"><Image src="/assets/close.svg" width={32} height={32} alt="" /></button>}
            <ClassicText Tag="h2" addClassName="text-[#000] text-center text-[30px]">
                {
                    fromSuspected ? "Sei sicuro di chi sia il colpevole?":"Hai ottenuto tutti gli indizi! È il momento di scegliere il colpevole."
                }
            </ClassicText>
            <Button onClick={handleClick}>Vai alla scelta</Button>
        </div>
    </div>
}