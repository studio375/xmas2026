import type { ClueVariable } from "@/helpers/gameData";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Button from "../button";
import Clue from "./clue";

interface CluePreviewProps {
    obj: ClueVariable;
    index: number;
    isNew: boolean;
    getTarget: () => HTMLDivElement | null | undefined;
    onReturn: () => void;
}

export default function CluePreview({obj, index, isNew, getTarget, onReturn}: CluePreviewProps){
    const paper = useRef<HTMLButtonElement>(null);
    const returnButton = useRef<HTMLButtonElement>(null);
    const tween = useRef<gsap.core.Tween | null>(null);
    const returning = useRef(false);

    useLayoutEffect(() => {
        returnButton.current?.focus();
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const target = getTarget();
            const from = target?.getBoundingClientRect();
            const to = paper.current?.getBoundingClientRect();
            tween.current = gsap.fromTo(paper.current, from && to && !isNew ? {
                x: from.left + from.width / 2 - (to.left + to.width / 2),
                y: from.top + from.height / 2 - (to.top + to.height / 2),
                scale: Math.min(from.width / to.width, from.height / to.height),
            } : {scale: 0.5, opacity: 0}, {
                x: 0, y: 0, scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out',
            });
        }
        return () => { tween.current?.kill(); };
    }, [getTarget, isNew]);

    const handleReturn = () => {
        if (returning.current) return;
        const target = getTarget();
        if (!target || !paper.current) throw new Error('Cella della lavagna non disponibile.');
        returning.current = true;
        tween.current?.kill();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            onReturn();
            return;
        }
        gsap.set(paper.current, {scale: 1, opacity: 1});
        const from = paper.current.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        tween.current = gsap.to(paper.current, {
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale: Math.min(to.width / from.width, to.height / from.height),
            duration: 0.45,
            ease: 'power2.inOut',
            onComplete: onReturn,
        });
    };

    return <div
        role="dialog"
        aria-modal="true"
        aria-label={`Indizio ${index + 1}`}
        className="clue-preview"
        onKeyDown={event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                handleReturn();
            }
            if (event.key === 'Tab') {
                event.preventDefault();
                if (document.activeElement === returnButton.current) paper.current?.focus();
                else returnButton.current?.focus();
            }
        }}
    >
        <button type="button" className="clue-preview-backdrop" tabIndex={-1} aria-label="Torna alla lavagna" onClick={handleReturn} />
        <button type="button" ref={paper} className="clue-expanded" aria-label={`${obj.text} — Torna alla lavagna`} onClick={handleReturn}>
            <Clue obj={obj} />
        </button>
        <Button ref={returnButton} className="clue-return" onClick={handleReturn}>{isNew ? 'Attacca alla lavagna' : 'Torna alla lavagna'}</Button>
    </div>;
}
