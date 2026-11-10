import { useStore } from "@/store/useStore";
import ArcadeText from "./arcadeText";
import { useRef } from "react";
import { gsap } from "@/helpers/gsap";
import { Character, GAME_DATA, } from "@/helpers/gameData";
import Button from "./button";
import Image from "next/image";


export default function ChooseGuiltyPage() {
    const selectedPlayer = useStore(state => state.selectedPlayer);
    const { selectedGuilty, setSelectedGuilty, guilty, restartGame, setShowComponents } = useStore();
    const characters = GAME_DATA.characters.filter(character => character.id !== selectedPlayer?.id);
    const handleClickCharacted = (character:Character) => {
        if(selectedGuilty?.id === character.id) {
            setSelectedGuilty(null);
        } else {
            setSelectedGuilty(character);
        }
    }
    const ref = useRef<HTMLDivElement>(null);
    const handleConfirm = () => {
        if(!selectedGuilty || !guilty) return;
        setShowComponents([]);
        gsap.to(ref.current, { opacity: 0, duration: 0.5 }).then(() => {
            restartGame();
        });
    }
    return <div ref={ref} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between px-15 py-5">
        <ArcadeText>Chi è il colpevole?</ArcadeText>
        <div className="flex flex-wrap justify-center gap-x-15 gap-y-3">
            {characters.map(character => (
                <div key={character.id} className={`w-[calc((100%-450px)/4)] flex items-center justify-center relative cursor-pointer`} onClick={() => handleClickCharacted(character)}>
                    <img src={`/assets/characters/${character.name}/${character.name.toLowerCase()}-polaroid.png`} alt={character.name} className="w-full h-full object-cover" />
                    <span className="font-marker absolute bottom-1 text-black">{character.name}</span>
                    {selectedGuilty?.id === character.id && <Image src="/assets/overlay-elements/wanted.png" width={32} height={32} alt="Selected" className="absolute w-6 h-auto top-0 -right-0" />}
                </div>
            ))}
        </div>
        <Button onClick={handleConfirm} className={`${selectedGuilty ? '' : 'opacity-50 pointer-events-none'}`}>Conferma</Button>
    </div>
}