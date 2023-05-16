interface Props {
    text: string;
    onClick: (...args: any) => any;
}

export default function ClickableText(props: Props) {
    return (
        <p onClick={props.onClick} className={"text-slate-900 dark:text-slate-100 link cursor-pointer"}>
            {props.text}
        </p>
    )
}