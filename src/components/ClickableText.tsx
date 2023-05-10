interface Props {
    text: string;
    onClick: (...args: any) => any;
}

export default function ClickableText(props: Props) {
    return (
        <p onClick={props.onClick} className={"text-sky-700 hover:underline"}>
            {props.text}
        </p>
    )
}