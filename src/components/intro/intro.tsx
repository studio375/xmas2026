import gsap from "gsap";
import Button from "../button";
import { useRef } from "react";

export default function Intro() {
    const ref = useRef(null);
    const handleSkipIntro = () => {
        gsap.to(ref.current, { opacity: 0, duration: 0.5, onComplete: () => {
            gsap.set(ref.current, { display: "none" });
        } });
    }
    return (
        <section ref={ref} className="w-screen h-screen flex flex-col items-center justify-center absolute bg-black z-99 gap-4">
            <h1>Facciamo finta che qui ci sia una intro</h1>
            <Button onClick={handleSkipIntro}>Skip</Button>
        </section>
    );
}