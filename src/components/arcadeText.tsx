import React from "react";
import parse from 'html-react-parser';

interface ArcadeTextProps{
    Tag?:React.ElementType,
    children:React.ReactNode,
    addClassName?:string
}
export default function ArcadeText({Tag = 'h2', addClassName, children}:ArcadeTextProps){
    return <Tag className={`font-press ${addClassName || ''}`}>{typeof children === 'string' ? parse(children) : children}</Tag>
}