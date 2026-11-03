import type { ClueVariable } from "@/helpers/gameData";
import { useLayoutEffect, useRef } from "react";

export default function Clue({obj}: {obj: ClueVariable}){
    const paper = useRef<HTMLSpanElement>(null);
    useLayoutEffect(() => {
        const element = paper.current;
        const container = element?.parentElement;
        if (!element || !container) return;
        const resize = () => {
            const scale = Math.min(container.clientWidth / element.offsetWidth, container.clientHeight / element.offsetHeight);
            element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);
    return <span ref={paper} className="clue clue-paper"><span className="font-marker">{obj.text}</span></span>;
}
