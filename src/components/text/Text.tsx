import {forwardRef, HTMLAttributes} from "react";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {}

const Text = forwardRef<HTMLParagraphElement, TextProps>((props, ref) => (
   <p
    ref={ref}
    className={[
        "text-sm",
        "font-light",
        "text-gray-900 dark:text-gray-100",
        props.className || "",
    ].join(" ")
   }
   >
      {props.children}
   </p>
));

Text.displayName = "Text";

export default Text;