import Image from "next/image";
import { useRef, useState } from "react";
import { GAME_DATA } from "@/helpers/gameData";
import { useStore, type SuspectStatus } from "@/store/useStore";
import Button from "./button";
import ChooseGuiltyPopup from "./chooseGuiltyPopup";

const statusLabels: Record<SuspectStatus, string> = {
    neutral: 'Da valutare',
    excluded: 'Escluso',
    suspected: 'Sospettato',
};

const nextLabels: Record<SuspectStatus, string> = {
    neutral: 'escludi',
    excluded: 'segna come sospettato',
    suspected: 'rimuovi annotazione',
};

export default function SuspectedSection({onClose}: {onClose: () => void}){
    const selectedPlayer = useStore(state => state.selectedPlayer);
    const statuses = useStore(state => state.suspectStatuses);
    const cycleSuspect = useStore(state => state.cycleSuspect);
    const section = useRef<HTMLDivElement>(null);
    const [announcement, setAnnouncement] = useState('');
    const characters = GAME_DATA.characters.filter(character => character.id !== selectedPlayer?.id);
    const [popUpOpen, setPopUpOpen] = useState(false);
    return <>
        <div
            ref={section}
            role="dialog"
            aria-modal="true"
            aria-labelledby="suspected-title"
            aria-describedby="suspected-instructions"
            className="suspected-section fixed inset-0 z-10"
            onKeyDown={event => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    onClose();
                }
                if (event.key === 'Tab') {
                    const buttons = section.current?.querySelectorAll<HTMLButtonElement>('button');
                    if (!buttons?.length) return;
                    const first = buttons[0];
                    const last = buttons[buttons.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first.focus();
                    }
                }
            }}
        >
            <div className="suspected-notebook">
                <header className="suspected-heading">
                    <span className="suspected-eyebrow font-press">Appunti di indagine</span>
                    <h2 id="suspected-title" className="font-marker">Il taccuino dei sospettati</h2>
                    <p id="suspected-instructions" className="font-fuzzy">Clicca una foto per cambiare annotazione. Le tue scelte restano salvate durante la partita.</p>
                    <p className="suspected-legend font-fuzzy">
                        <span>Da valutare</span><span aria-hidden="true">→</span>
                        <span className="legend-excluded">Escluso</span><span aria-hidden="true">→</span>
                        <span className="legend-suspected">Sospettato</span><span aria-hidden="true">→</span>
                        <span>Da valutare</span>
                    </p>
                </header>
                <div className="suspected-photos">
                    {characters.map(character => {
                        const status = statuses[character.id] ?? 'neutral';
                        return <button
                            key={character.id}
                            type="button"
                            className={`suspected-card is-${status}`}
                            aria-label={`${character.name}: ${statusLabels[status]}. Clicca per ${nextLabels[status]}.`}
                            onClick={() => {
                                cycleSuspect(character.id);
                                const next = useStore.getState().suspectStatuses[character.id] ?? 'neutral';
                                setAnnouncement(`${character.name}: ${statusLabels[next]}`);
                            }}
                        >
                            <span className="suspected-polaroid">
                                <Image
                                    src={`/assets/characters/${character.name}/${character.name.toLowerCase()}-polaroid.png`}
                                    width={355}
                                    height={413}
                                    alt=""
                                    draggable={false}
                                />
                                <svg className="suspected-circle" viewBox="0 0 100 100" aria-hidden="true">
                                    <path d="M 75,12 C 40,-2 3,21 7,53 C 10,91 69,99 89,70 C 111,36 82,5 49,9" />
                                </svg>
                                <span className="suspected-name font-marker">{character.name}</span>
                            </span>
                            <span className="suspected-status font-fuzzy">{statusLabels[status]}</span>
                        </button>;
                    })}
                </div>
                <button type="button" autoFocus aria-label="Chiudi taccuino" onClick={onClose} className="suspected-close">
                    <Image src="/assets/close.svg" width={32} height={32} alt="" />
                </button>
                <div className="flex justify-center">
                    <Button className="!text-[12px] !py-[8px] -mb-[7px]" onClick={() => setPopUpOpen(true)}>Ho capito chi è stato!</Button>
                </div>
                <span className="sr-only" role="status">{announcement}</span>
            </div>
        </div>
        {popUpOpen && <ChooseGuiltyPopup fromSuspected={true} onClickClose={() => setPopUpOpen(false)} />}
    </>;
}
