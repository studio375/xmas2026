'use client'
import Image from "next/image";
import {  ASSET_PATHS } from "@/helpers/assets";
import InnerMenu from "./innerMenu";
import { useStore } from "@/store/useStore";

export default function Menu(){
    const innerVisible = useStore(state => state.menuOpen);
    const setMenuOpen = useStore(state => state.setMenuOpen);
    return <>
        <button type="button" onClick={() => setMenuOpen(!innerVisible)} aria-label="Apri menu" aria-expanded={innerVisible} className="cursor-pointer relative pointer-events-auto"><Image src={ASSET_PATHS.hamburger_menu} width={50} height={50} alt="" /></button>
        {innerVisible && <InnerMenu />}
    </>
}