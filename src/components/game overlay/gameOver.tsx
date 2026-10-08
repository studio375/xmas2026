import { EventBus } from "@/game/EventBus";
import { ASSET_PATHS } from "@/helpers/assets";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GameOver(){
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        const onGameOver = () => {
            setVisible(true);
        }
        EventBus.on('game-over', onGameOver);

        return () => {
            EventBus.removeListener('game-over', onGameOver);
        }
    })
    if(!visible) return null;
    return <div className="fixed w-screen h-screen flex items-center justify-center">
        <Image src={`/assets/${ASSET_PATHS.gameOver}`} width={100} height={100} className="w-[70vw] h-auto" alt="game over" />
    </div>
}