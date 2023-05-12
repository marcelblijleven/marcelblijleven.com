"use client"

import Link from "next/link";

interface Props {

}

export default function Header(props: Props) {
    // Note: z-10 on header because the progress bars from /coffee would overlap on Safari
    return (
        <>
            <header className={"sticky top-0 z-10 w-full bg-white dark:bg-slate-900 mb-2"}>
                <div className={"flex justify-between items-center max-w-7xl mx-auto px-8 h-14"}>
                    <Link className={"hover:underline hover:decoration-sky-600 hover:decoration-4 font-semibold text-lg"} href={"/"}>Marcel Blijleven</Link>
                    <nav>
                        <div className={"flex gap-4 md:gap-6 font-semibold"}>
                            <Link className={"hover:underline hover:decoration-4 hover:decoration-sky-600"} href={"/coffee"}>Coffee</Link>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
