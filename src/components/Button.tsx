import { MouseEvent} from "react";

interface Props {
    text: string;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
    rounded?: "left" | "right" | "full";
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: Props) {
    let rounded;
    switch (props.rounded) {
        case "left":
            rounded = "rounded-l-lg";
            break;
        case "right":
            rounded = "rounded-r-lg";
            break;
        case "full":
        default:
            rounded = "rounded-lg";
    }

    let variant;
    switch (props.variant) {
        case "secondary":
            variant = "rounded-l-lg";
            break;
        case "secondary":
            variant = "rounded-r-lg";
            break;
        case "primary":
        default:
            variant = "text-slate-900 dark:text-slate-100 p-2 hover:bg-blue-900 disabled:bg-gray-400";
    }

    return (
        <button
            type={"button"}
            className={`${variant} ${rounded}`}
            disabled={props.disabled || false}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}