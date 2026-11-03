import Board from "./board";
import Clue from "./clue";
import { useStore } from "@/store/useStore";
import Image from "next/image";

interface ClueBoardProps {
    handleClickButton: () => void;
    openedByMenu?: boolean;
}

export default function ClueBoard({handleClickButton, openedByMenu = false}: ClueBoardProps){
    const clues = useStore(state => state.clues);
    const clueIndex = useStore(state => state.clueIndex);
    return <div role="dialog" aria-modal="true" aria-label="Lavagna degli indizi" className="fixed top-0 left-0 w-screen h-dvh bg-[#000000aa] flex flex-col gap-5 justify-center items-center px-[10vw] py-[10vh] z-10">
        <Board />
        {!openedByMenu && clueIndex < clues.length && <Clue key={clues[clueIndex].id} obj={clues[clueIndex]} index={clueIndex} className={'z-2'} onlyPostIT={false} />}
        <button type="button" autoFocus aria-label="Chiudi lavagna" onClick={handleClickButton} className="z-3 absolute right-[calc(10vw+40px)] top-[calc(10vh+0px)] translate-1/2 cursor-pointer"><Image src={'/assets/close.svg'} width={40} height={40} alt="" /></button>
    </div>
}