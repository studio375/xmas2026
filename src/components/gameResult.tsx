import { gsap } from "@/helpers/gsap";
import { useStore } from "@/store/useStore";
import { useEffect, useRef } from "react";
import Image from "next/image";
import NarrationText from "./narrationText";
import { GAME_DATA } from "@/helpers/gameData";

export default function GameResult() {
    const {selectedGuilty, guilty} = useStore();
    const ref = useRef<HTMLDivElement | null>(null);
    const refImage = useRef<HTMLImageElement | null>(null);
    const refPopup = useRef<HTMLDivElement | null>(null);
    const isWin = selectedGuilty === guilty;
    const popupText = GAME_DATA.gameResultText[isWin ? "win" : "lose"];
    console.log(selectedGuilty, guilty);
    useEffect(() => {
        if(!ref.current) return;
        var tml = gsap.timeline();
        tml.to(ref.current, { opacity: 1, duration: 1 })
           .to(refPopup.current, { opacity: 1, duration: 1 });
    }, []);
    return (
        <div ref={ref} className="absolute w-full h-full opacity-0 left-0 top-0 flex justify-center items-center">
            <Image ref={refImage} className="absolute w-full h-full object-cover" src={`/assets/characters/${selectedGuilty?.name}/${selectedGuilty?.name.toLocaleLowerCase()}-${isWin ? "win" : "lose"}.png`} width={1920} height={1080} alt="" />
            <div ref={refPopup} className="absolute top-1/2 left-1/2 -translate-1/2 w-[50vw] p-3 bg-[#ffffffaa] rounded-[20px] flex flex-col items-center gap-2 opacity-0">
                <NarrationText AddClassName="text-black text-[50px]">{popupText.title}</NarrationText>
                <NarrationText AddClassName="text-black text-[30px]">{popupText.paragraph}</NarrationText>
            </div>
        </div>
    );
}


