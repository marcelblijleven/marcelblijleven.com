import {forwardRef, HTMLAttributes} from "react";

export interface TitleProps extends HTMLAttributes<HTMLParagraphElement> {}

const Title = forwardRef<HTMLParagraphElement, TitleProps>((props, ref) => {
    // Maybe return heading instead of paragraph?
    return (
      <p
        ref={ref}
        className={[
            "text-lg",
            "font-medium",
            "text-gray-900 dark:text-gray-100",
            props.className || "",
        ].join(" ")}
        >
          {props.children}
      </p>
    );
});

Title.displayName = "Title";

export default Title;