import Button from "../button";
import { useEffect, useRef } from "react";
import { gsap, SplitText } from "../../helpers/gsap";

export default function EntryPage() {
    const ref = useRef<any>(null);
    const titleRef = useRef<any>(null);
    const subtitleRef = useRef<any>(null);
    const buttonRef = useRef<any>(null);
    useEffect(() => {
        if(!titleRef.current) return;
        const split = new SplitText(titleRef.current, { 
            type: "chars",
            charsClass: "single-char"
        });
        const fontSize = parseFloat(getComputedStyle(titleRef.current).fontSize);
        const arcHeight = fontSize * 1.25;
        split.chars.forEach((char, index) => {
            const progress = split.chars.length > 1 ? index / (split.chars.length - 1) : 0.5;
            const y = -arcHeight * Math.sin(Math.PI * progress);
            const rotation = -18 * Math.cos(Math.PI * progress);
            gsap.set(char, { y, rotation});
        });
        // gsap.set(titleRef.current, { opacity: 1 });
        var tml = gsap.timeline(); 
        tml.to(split.chars, {duration: 1,ease: "none",stagger: 0.05,opacity: 1})
            .to(subtitleRef.current, { duration: 1, opacity: 1 })
            .to(buttonRef.current, { duration: 1, opacity: 1 }, '<');
        return () => {
            split.revert();
        };
    }, []);
    const handleStart = () => {
        gsap.to(ref.current, { opacity: 0, duration: 0.5, onComplete: () => {
            gsap.set(ref.current, { display: "none" });
        } });
    }
    return (
        <div ref={ref} className="w-screen h-screen flex flex-col items-center justify-center absolute bg-black z-100 gap-4">
            <div className="h-22 flex items-end">
                <h1 ref={titleRef} className="font-swash text-[100px]/[95px] text-center whitespace-nowrap opacity-100 [&>.single-char]:opacity-0">Chi ha rapito Babbo Natale?</h1>
            </div>
            <h2 className="font-swash text-[40px] text-center mt-3 opacity-0" ref={subtitleRef}>Raccogli tutti quanti gli oggetti nascosti, scopri gli indizi e risolvi il mistero!<br />E ovviamente stai attento a schivare le palline!</h2>
            <Button className="mt-4 opacity-0" onClick={handleStart} ref={buttonRef}>Inizia</Button>
        </div>
    );
}