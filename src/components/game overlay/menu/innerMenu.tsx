import { useStore } from "@/store/useStore";
import ArcadeText from "../../arcadeText";
import Button from "../../button";
import { EventBus } from "@/game/EventBus";
import { useRef } from "react";

export default function InnerMenu(){
    const {showComponents, setShowComponents}:any = useStore();
    const ref = useRef<any>(null);
    const handleOnClickClues = () => {
        setShowComponents([...showComponents, 'clues']);
        if(!ref.current) return;
        ref.current.style.display = 'none';
    }
    return <div ref={ref} className="fixed top-0 left-0 w-screen h-screen bg-[#000000c9] py-10">
        <div className="flex flex-col items-center gap-3">
            <ArcadeText addClassName="text-[35px]">Menu</ArcadeText>
            <Button onClick={handleOnClickClues}>Indizi</Button>
            <Button>Sospettati</Button>
            <Button>Ricomincia</Button>
            <Button onClick={() => EventBus.emit('open-menu', false)}>Indietro</Button>
        </div>
    </div>
}