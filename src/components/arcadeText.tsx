import React from "react"

interface AracadeTextProps{
    Tag?:React.ElementType,
    children:React.ReactNode,
    addClassName?:string
}
export default function ArcadeText({Tag = 'h2', addClassName, children}:AracadeTextProps){
    return <Tag className={`font-press ${addClassName}`}>{children}</Tag>
}