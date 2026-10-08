import { useEffect, useState } from "react";
import ClientLivesManager from "./clientLivesManager";
import ClientPropsManager from "./clientPropsManager";
import GameOver from "./gameOver";
import Menu from "./menu/menu";

export default function GameOverlay(){
    return <>
        <div className="fixed top-0 left-0 w-screen p-[16px] flex items-center justify-between">
            <ClientLivesManager manageRecovered={true} />
            <div className="flex items-start justify-end gap-2">
                <div className="flex flex-col items-end gap-1">
                    <ClientLivesManager />
                    <ClientPropsManager />
                </div>
                <Menu />
            </div>
        </div>
        <GameOver />
    </>
}