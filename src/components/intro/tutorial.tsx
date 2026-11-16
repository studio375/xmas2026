import { useRef } from "react";
import NarrationText from "../narrationText";
import Background from "../background";
import { GAME_DATA } from "@/helpers/gameData";
import Button from "../button";
import { gsap } from "@/helpers/gsap";

export default function Tutorial() {
    const tutorialText = GAME_DATA.tutorialText;
    const ref = useRef(null);
    const handleClick = () => {
        gsap.to(ref.current, { opacity: 0, duration: 0.5, onComplete: () => {
            gsap.set(ref.current, { display: "none" });
        } });
    };
    return (
        <div ref={ref} className="w-screen h-screen flex flex-col items-center justify-center absolute bg-black z-100 gap-4">
            <Background />
            <NarrationText AddClassName="text-xl">{tutorialText.title}</NarrationText>
            <NarrationText AddClassName="text-l">{tutorialText.subtitle}</NarrationText>
            <NarrationText AddClassName="text-m [&_li]:text-center">{tutorialText.text}</NarrationText>
            <Button onClick={handleClick}>Inizia</Button>
        </div>
    );
}