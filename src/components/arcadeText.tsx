import React from "react"

interface AracadeTextProps{
    Tag?:React.ElementType,
    children:React.ReactNode
}
export default function ArcadeText({Tag = 'h2', children}:AracadeTextProps){
    return <Tag className="font-press">{children}</Tag>
}