import Board from "./board";
import Clue from "./clue";
import { useStore } from "@/store/useStore";
import Image from "next/image";

export default function ClueBoard({handleClickButton}:any){
    const {clues, clueIndex}:any = useStore();
    return <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000aa] flex flex-col gap-5 justify-center items-center px-[10vw] py-[10vh]">
        <Board />
        <Clue obj={clues[clueIndex]} index={clueIndex} className={'z-2'} onlyPostIT={false} />
        <button onClick={handleClickButton} className="z-1 absolute right-[calc(10vw+40px)] top-[calc(10vh+0px)] translate-1/2 cursor-pointer"><Image src={'/assets/close.svg'} width={40} height={40} alt="Close board" /></button>
    </div>
}