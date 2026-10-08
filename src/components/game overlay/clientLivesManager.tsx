import { useEffect, useState } from "react";
import ClassicText from "../classicText";
import { GAME_CONFIG } from "@/helpers/gameConfig";
import { EventBus } from "@/game/EventBus";
import { ASSET_PATHS } from "@/helpers/assets";

export default function ClientLivesManager({manageRecovered=false}:any){
    const [lives, setLives] = useState<number>(GAME_CONFIG.initialLives);
    const [recoveredLives, setRecoveredLives] = useState<number>(0);

    useEffect(() => {
        const handleUpdateLives = (livesCounter:number) => {
            setLives(livesCounter);
        }
        const handleRecoveredLife = (totalRecoveredLives:number) => {
            setRecoveredLives(totalRecoveredLives);
        }

        EventBus.on('update-lives', handleUpdateLives)
        EventBus.on('recovered-life', handleRecoveredLife);

        return () => {
            EventBus.removeListener('update-lives', handleUpdateLives);
            EventBus.removeListener('recovered-life', handleRecoveredLife);
        }
    }, [])

    if(manageRecovered){
        return <ClassicText Tag={'span'} addClassName="text-[32px]">{`Vite recuperabili: ${(GAME_CONFIG.maxRecoverableLives-recoveredLives)}`}</ClassicText>
    }

    return <div className="flex items-center gap-[5px]">
        {
            Array.from({ length: GAME_CONFIG.initialLives }).map((_, index) => {
                const lifeNumber = index + 1;
                const isFull = lifeNumber <= lives;
                const src = `${isFull ? ASSET_PATHS.heart : ASSET_PATHS.emptyHeart}`;
                return <img key={index} src={src} alt="" className="w-[45px] h-auto" />
            })
        }
    </div>

}