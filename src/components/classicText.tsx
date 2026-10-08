import React from "react";
import parse from 'html-react-parser';

interface ClassicTextProps{
    Tag?:React.ElementType,
    children:any,
    addClassName?:string
}
export default function ClassicText({Tag = 'h2', addClassName, children}:ClassicTextProps){
    return <Tag className={`font-fuzzy ${addClassName}`}>{parse(children)}</Tag>
}