import Button from "../button";
import { useEffect, useRef } from "react";
import { gsap, SplitText } from "../../helpers/gsap";
import Background from "../background";
import Image from "next/image";

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
        <div ref={ref} className="classic-bg w-screen h-screen flex flex-col items-center justify-center absolute z-101 gap-4">
            <Background />  
            <div className="h-22 flex items-end">
                <h1 ref={titleRef} className="font-swash text-[100px]/[95px] text-center whitespace-nowrap opacity-100 [&>.single-char]:opacity-0">Chi ha rapito Babbo Natale?</h1>
            </div>
            <div className="flex justify-center items-center flex-col mt-0 opacity-0 gap-3" ref={subtitleRef}>
                <Image src="/assets/logo-375.svg" alt="Studio375 Logo" width={50} height={60} className="w-5 h-6 object-contain" />
                <h2 className="font-swash text-xl text-center">By Studio375</h2>
            </div>
            <Button className="mt-4 opacity-0" onClick={handleStart} ref={buttonRef}>Gioca</Button>
        </div>
    );
}