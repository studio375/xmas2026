import { ClueVariable } from "@/helpers/gameData";
import Button from "../button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CLUES_POSITIONS } from "@/helpers/cluePositions";

interface clueProps {
    obj:ClueVariable,
    onlyPostIT:boolean,
    className?:string,
    index:number
}
export default function Clue({obj, onlyPostIT = false, className, index=0}:clueProps){
    const bgRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const postItRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<gsap.core.Timeline | null>(null);
    useEffect(() => () => { timeline.current?.kill(); }, []);
    const position = CLUES_POSITIONS[index];
    if (!position) throw new Error(`Posizione dell'indizio ${index} non configurata.`);
    const handleClickButton = () => {
        if(!bgRef.current || !btnRef.current || !ref.current || !postItRef.current) return;
        bgRef.current.style.display = 'none';
        btnRef.current.style.display = 'none';
        const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2;
        timeline.current = gsap.timeline()
            .to(ref.current, {scale: 0.4, left: position.left, top: position.top, duration})
            .to(postItRef.current, {left:0, top: 0, duration}, '<');
    }
    if(onlyPostIT){
        return <div className={`clue ${className || ''} absolute ${position.boardClassName} scale-[0.4]`}>
            <span className="font-marker">{obj.text}</span>
        </div> 
    }
    return <div ref={ref} className="clue-presentation fixed w-35 h-35 z-2 top-0 left-0 flex flex-col gap-5 justify-center items-center">
        <div className="absolute left-0 top-0 w-screen h-screen bg-[#000000aa]" ref={bgRef}></div>
        <div className="clue w-full h-full absolute left-[calc(50vw-175px)] top-[calc(50vh-175px)]" ref={postItRef}>
            <span className="font-marker">{obj.text}</span>
        </div>
        <Button className="!absolute left-[50vw] top-[calc(100vh-120px)] -translate-x-1/2 z-1" ref={btnRef} onClick={handleClickButton}>Avanti</Button>
    </div>
    
}