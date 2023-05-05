import Link from "next/link";

interface Props {

}

export default function Header(props: Props) {
    return (
        <header className={"sticky top-0 bg-slate-50 dark:bg-slate-900 border-b border-gray-300/25 mb-2"}>
            <div className={"flex items-center justify-between max-w-7xl mx-auto py-4 px-4 sm:px-6 md:px-8"}>
                <div className={"flex w-1/2 font-bold"}>
                    <Link href={"/"}>Home</Link>
                </div>
                <nav className={"text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200"}>

                    <div className={"flex gap-6"}>
                        <Link href={"/coffee/brews"}>Coffee</Link>
                        <Link href={"/about"}>About</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}