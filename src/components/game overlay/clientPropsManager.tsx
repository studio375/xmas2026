import { EventBus } from "@/game/EventBus";
import { ASSET_PATHS } from "@/helpers/assets";
import { useEffect, useState } from "react"

export default function ClientPropsManager(){
    const [collectedProps, setCollectedProps] = useState(0);
    useEffect(()=>{
        const handleUpdateCount = (count:number) => {
            console.log(count);
            setCollectedProps(count);
        }
        EventBus.on('props-count-update', handleUpdateCount);
        return () => {
            EventBus.removeListener('props-count-update', handleUpdateCount);
        }
    })
    return <div className="flex items-center gap-[5px] justify-end">
        {
            Array.from({length:collectedProps}).map((elem, index) => {
                return <img key={index} src={`/assets/${ASSET_PATHS.collectible}`} alt="" className="w-[45px] h-auto" />
            })
        }
    </div>
}