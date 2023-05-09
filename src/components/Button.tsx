import {MouseEvent, ReactNode} from "react";
import styles from "./Button.module.css";

interface Props {
    label?: string;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "tertiary" | "icon" | "cancel";
    icon?: ReactNode
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: Props) {
    const variant = props.variant || "primary";

    return (
        <button
            type={"button"}
            className={`${styles.btn} ${styles[`btn-${variant}`]}`}
            disabled={props.disabled || false}
            onClick={props.onClick}

        >

            {props.label && props.label}
            {props.icon && props.icon}
        </button>
    )
}