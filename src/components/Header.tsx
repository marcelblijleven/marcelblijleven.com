"use client"

import Link from "next/link";
import Avatar from "@/components/Avatar";

export default function Header() {
    // Note: z-10 on header because the progress bars from /coffee would overlap on Safari
    return (
        <>
            <header className={"sticky top-0 z-10 w-full bg-white dark:bg-slate-900 mb-2"}>
                <div className={"flex justify-between items-center max-w-5xl mx-auto px-8 h-14"}>
                    <div className={"flex gap-2 items-center"}>
                    <Link href={"/"}>
                        <Avatar />
                    </Link>
                    <Link className={"hidden md:block hover:underline hover:decoration-sky-600 hover:decoration-4 font-semibold text-lg"} href={"/"}>

                        <span>Marcel Blijleven</span>
                    </Link>
                    </div>
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
