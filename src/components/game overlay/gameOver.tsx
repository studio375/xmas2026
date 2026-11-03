import { EventBus } from "@/game/EventBus";
import { ASSET_PATHS } from "@/helpers/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../button";
import { useStore } from "@/store/useStore";

export default function GameOver(){
    const [visible, setVisible] = useState<boolean>(false);
    const resetGame = useStore(state => state.resetGame);
    useEffect(() => {
        const onGameOver = () => {
            setVisible(true);
        }
        EventBus.on('game-over', onGameOver);

        return () => {
            EventBus.removeListener('game-over', onGameOver);
        }
    }, [])
    if(!visible) return null;
    return <div role="dialog" aria-modal="true" aria-label="Partita terminata" className="game-over-screen fixed inset-0 z-20 flex flex-col gap-5 items-center justify-center bg-[#000000aa]">
        <Image src={`/assets/${ASSET_PATHS.gameOver}`} width={100} height={100} className="w-[70vw] h-auto" alt="game over" />
        <Button autoFocus onClick={resetGame}>Ricomincia</Button>
    </div>
}