import { GAME_DATA } from '../helpers/gameData';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import NarrationText from './narrationText';
import { gsap } from '@/helpers/gsap';
import Button from './button';
export default function ClosurePage(){
    const text = GAME_DATA.clousureText;
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(!ref.current) return;
        gsap.to(ref.current, { opacity: 1, duration: 1 });
    }, []);
    const handleRestart = () => {
        window.location.reload();
    }
    return <div ref={ref} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center opacity-0 gap-2 [&_*]:text-center">
        <NarrationText AddClassName="text-xl" Tag="h2">{text.title}</NarrationText>
        <NarrationText Tag="span" AddClassName="text-m">{text.paragraph}</NarrationText>
        <div className="flex items-center justify-center gap-2">
            <Button onClick={handleRestart}>Ricomincia</Button>
            <Button><Link href="https://375.studio" target="_blank">Visita il nostro sito</Link></Button>
        </div>
    </div>
}