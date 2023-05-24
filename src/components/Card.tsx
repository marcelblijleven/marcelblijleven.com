import {forwardRef, HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Card = forwardRef<HTMLDivElement, Props>((props, ref) => (
        <div
            ref={ref}
            className={`
                relative 
                w-full 
                text-left 
                bg-white dark:bg-slate-900
                ring-1 ring-slate-100 dark:ring-slate-600
                shadow 
                rounded-lg 
                p-4
                ${props.className || ""}`
            }
        >
            {props.children}
        </div>
    )
)

Card.displayName = "Card";

export default Card


// export default function Card(props: Props) {
//     return (
//         <div
//             className={"flex items-center background-gradient border border-slate-600/25 dark:border-slate-100/25 rounded-2xl px-3 py-3 md:px-6 md:py-8"}
//             onClick={props.onClick}
//         >
//             {props.children}
//         </div>
//     )
// }