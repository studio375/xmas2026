'use client'
import Image from "next/image";
import {  ASSET_PATHS } from "@/helpers/assets";
import { useEffect, useState } from "react";
import InnerMenu from "./innerMenu";
import { EventBus } from "@/game/EventBus";

export default function Menu(){
    const [innerVisible, setInnerVisible] = useState<boolean>(false);
    useEffect(() => {
        const handleOpenMenu = (isOpen:boolean) => {
            setInnerVisible(isOpen);
        }   
        EventBus.on('open-menu', handleOpenMenu);
        return () => {
            EventBus.removeListener('open-menu', handleOpenMenu);
        }
    }, [])  
    return <>
        <div onClick={() => EventBus.emit('open-menu', !innerVisible)} className="cursor-pointer relative"><Image src={ASSET_PATHS.hamburger_menu} width={50} height={50} alt="hamburger menu" /></div>
        {innerVisible && <InnerMenu />}
    </>
}