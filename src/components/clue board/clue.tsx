import { ClueVariable } from "@/helpers/gameData";
import ArcadeText from "../arcadeText";
import Button from "../button";
import { useRef } from "react";
import gsap from "gsap";
import { CLUES_POSITIONS } from "@/helpers/cluePositions";

interface clueProps {
    obj:ClueVariable,
    onlyPostIT:boolean,
    className:any,
    index:number
}
export default function Clue({obj, onlyPostIT = false, className, index=0}:clueProps){
    const bgRef = useRef<any>(null);
    const btnRef = useRef<any>(null);
    const ref = useRef<any>(null);
    const postItRef = useRef<any>(null);
    const handleClickButton = () => {
        if(!bgRef.current || !btnRef.current || !ref.current || !postItRef.current) return;
        bgRef.current.style.display = 'none';
        btnRef.current.style.display = 'none';
        var tml = gsap.timeline();
        tml.to(ref.current, {scale: '0.4', left: CLUES_POSITIONS[index].left, top: CLUES_POSITIONS[index].top, duration: 2})
           .to(postItRef.current, {left:0, top: 0, duration: 2}, '<');
    }
    if(onlyPostIT){
        return <div className={`clue ${className} absolute ${CLUES_POSITIONS[index].boardClassName} scale-[0.4]`}>
            <span className="font-marker">{obj.text}</span>
        </div> 
    }
    return <div ref={ref} className="fixed w-30 h-30 z-2 top-0 left-0 flex flex-col gap-5 justify-center items-center">
        <div className="absolute left-0 top-0 w-screen h-screen bg-[#000000aa]" ref={bgRef}></div>
        <div className="clue absolute left-[calc(50vw-150px)] top-[calc(50vh-150px)]" ref={postItRef}>
            <span className="font-marker">{obj.text}</span>
        </div>
        <Button className="absolute left-[50vw] top-[calc(100vh-120px)] -translate-x-1/2 z-1" ref={btnRef} onClick={handleClickButton}>Avanti</Button>
    </div>
    
}