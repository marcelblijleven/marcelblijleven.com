import {ReactNode, MouseEvent} from "react";

interface Props {
    children: ReactNode;
    onClick: (event: MouseEvent<HTMLElement>) => void;
}

export default function Card(props: Props) {
    return (
        <div
            className={"flex flex-col gap-2 items-center bg-gradient-to-tr from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-150 dark:from-slate-900 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-800 border border-slate-600/25 dark:border-slate-100/25 rounded-2xl px-6 py-8"}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}