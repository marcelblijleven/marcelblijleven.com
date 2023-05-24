import {forwardRef, HTMLAttributes} from "react";

export interface ValueProps extends HTMLAttributes<HTMLParagraphElement> {
}

const Value = forwardRef<HTMLParagraphElement, ValueProps>((props, ref) => (
    <p
        ref={ref}
        className={
            [
                "text-3xl",
                "font-semibol",
                "text-gray-900 dark:text-gray-100",
                props.className
            ].join(" ")
        }
    >
        {props.children}
    </p>
));

Value.displayName = "Value";

export default Value;