interface NarrationTextProps {
    Tag?: React.ElementType;
    AddClassName?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLHeadingElement>;
}
export default function NarrationText({Tag='h2', AddClassName, children, ref}: NarrationTextProps) {
    return <Tag ref={ref} className={`font-swash ${AddClassName ?? ""}`}>{children}</Tag>
}