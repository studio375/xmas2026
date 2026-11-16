"use client"
import ClientLivesManager from "./clientLivesManager";
import ClientPropsManager from "./clientPropsManager";
import GameOver from "./gameOver";
import Menu from "./menu/menu";
import { useStore } from '../../store/useStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useRef } from "react";
import { gsap } from "@/helpers/gsap";

export default function GameOverlay(){
    const {gameStep} = useStore(useShallow(state => ({
        gameStep: state.gameStep
    })));   
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (ref.current) {
            gsap.to(ref.current, { opacity: 1, duration: 1, delay: 0.5 });
        }
    }, []);
    return <>
        <div ref={ref} className="fixed top-0 left-0 w-screen p-[16px] flex items-start justify-between pointer-events-none z-11 opacity-0">
            {gameStep === 'start' ? <ClientLivesManager manageRecovered={true} />:<div></div>}    
            <div className="flex items-start justify-end gap-2">
                {gameStep === 'start' && <div className="flex flex-col items-end gap-1">
                    <ClientLivesManager />
                    <ClientPropsManager />
                </div>}
                <Menu />
            </div>
        </div>
        <GameOver />
    </>
}