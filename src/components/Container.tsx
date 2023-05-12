import {ReactNode} from "react";

interface Props {
    children: ReactNode
}

export default function Container({ children }: Props) {
    return (
        <main className={"max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full"}>
            {children}
        </main>
    )
}
