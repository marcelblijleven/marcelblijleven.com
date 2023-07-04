import {HTMLAttributes} from "react";

export default function PageShell(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={"flex flex-col items-start w-full max-w-5xl space-y-4 pb-6 md:px-4"}>
            {props.children}
        </div>
    )
}