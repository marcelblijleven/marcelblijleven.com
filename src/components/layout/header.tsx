import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Header() {
    // Note: z-10 on header because the progress bars from /coffee would overlap on Safari
    return (
        <>
            <header className={"sticky top-0 z-10 w-full bg-white dark:bg-slate-900 mb-2"}>
                <div className={"flex justify-between items-center max-w-5xl mx-auto px-8 h-14"}>
                    <div className={"flex gap-4 md:gap-6 items-center"}>
                        <Link href={"/"}>
                            <Avatar>
                                <AvatarImage src={"/avatar.png"} />
                                <AvatarFallback>MB</AvatarFallback>
                            </Avatar>
                        </Link>
                        <Link className={"hidden md:block no-underline font-semibold text-lg"} href={"/"}>
                            <span>Marcel Blijleven</span>
                        </Link>
                    </div>
                    <div className={"flex gap-4 md:gap-6"}>
                        <nav>
                            <div className={"flex gap-4 md:gap-6 font-semibold"}>
                                <Link className={"no-underline"} href={"/projects"}>Projects</Link>
                                <Link className={"no-underline"} href={"/coffee"}>Coffee</Link>
                            </div>
                        </nav>
                        <ThemeSwitcher/>
                    </div>
                </div>
            </header>
        </>
    )
}
