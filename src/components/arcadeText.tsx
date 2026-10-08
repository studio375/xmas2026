import React from "react";
import parse from 'html-react-parser';

interface ArcadeTextProps{
    Tag?:React.ElementType,
    children:any,
    addClassName?:string
}
export default function ArcadeText({Tag = 'h2', addClassName, children}:ArcadeTextProps){
    return <Tag className={`font-press ${addClassName}`}>{parse(children)}</Tag>
}