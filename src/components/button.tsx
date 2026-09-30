export default function Button({Tag = 'button', children, ...props}:any){
    return <Tag {...props} className={`font-press button-style ${props.className || ''}`}>{children}</Tag>
}