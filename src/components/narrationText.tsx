interface NarrationTextProps {
    Tag?: React.ElementType;
    AddClassName?: string;
    children?: any;
    ref?: React.Ref<HTMLHeadingElement>;
}
import parse from "html-react-parser";
export default function NarrationText({Tag='h2', AddClassName, children, ref}: NarrationTextProps) {
    return <Tag ref={ref} className={`font-swash ${AddClassName ?? ""}`}>{parse(children)}</Tag>
}