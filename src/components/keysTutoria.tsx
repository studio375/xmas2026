import { gsap } from "@/helpers/gsap";
import { useRef } from "react";
import Button from "./button";

export default function KeysTutorial({ onClick }: { onClick: () => void }) { 
    const ref = useRef<HTMLDivElement | null>(null);
    const handleClick = () => {
        gsap.to(ref.current, { opacity: 0, duration: 0.5 }).then(() => {
            onClick();
        });
    };
    return (
        <div ref={ref} className="bg-[#000000cc] flex flex-col gap-3 justify-center items-center absolute w-full h-full z-9999">
            <h2>Qui anita ci creerà un bell'overlay con le istruzioni dei tasti</h2>
            <Button onClick={handleClick}>Ho capito</Button>
        </div>
    );
}
