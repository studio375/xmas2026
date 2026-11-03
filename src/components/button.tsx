import type { ComponentPropsWithRef } from "react";

export default function Button({children, className = '', type = 'button', ...props}: ComponentPropsWithRef<'button'>){
    return <button {...props} type={type} className={`font-press button-style ${className}`}>{children}</button>
}