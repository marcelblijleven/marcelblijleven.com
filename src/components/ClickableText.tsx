interface Props {
    text: string;
    onClick: (...args: any) => any;
}

export default function ClickableText(props: Props) {
    return (
        <p onClick={props.onClick} className={"text-slate-900 dark:text-slate-100 underline decoration-2 decoration-blue-500 hover:text-blue-500 cursor-pointer"}>
            {props.text}
        </p>
    )
}