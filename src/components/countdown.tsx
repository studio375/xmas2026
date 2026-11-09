import { useState, useEffect } from "react";

export default function CountDown({count, setCount}:any) {
    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [count]);
    return (
        <div className="fixed z-20 flex flex-col items-center justify-center gap-5 bg-[#000000aa] w-screen h-screen left-0 top-0" role="status" aria-live="assertive" aria-atomic="true">
            <span className="text-white text-[20px]/[25px] font-press">La partita riprende tra</span>
            <span className="text-white text-[50px]/[55px] font-press">{count}</span>
        </div>
    );  
}