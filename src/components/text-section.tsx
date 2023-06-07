import {ReactNode} from "react";

const TextSection = (props: {heading?: string, children: ReactNode}) => (
    <div className={"max-w-2xl mb-4"}>
        {props.heading && (<h2 className={"text-xl font-semibold mb-2"}>{props.heading}</h2>)}
        <div className={"space-y-2 text-slate-900 dark:text-slate-100"}>
            {props.children}
        </div>
    </div>
)

export default TextSection;