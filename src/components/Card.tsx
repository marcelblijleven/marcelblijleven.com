import {ReactNode, MouseEvent} from "react";

interface Props {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export default function Card(props: Props) {
    return (
        <div
            className={"flex items-center background-gradient border border-slate-600/25 dark:border-slate-100/25 rounded-2xl px-3 py-3 md:px-6 md:py-8"}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}