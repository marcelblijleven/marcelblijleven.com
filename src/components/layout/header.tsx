"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

import ThemeSwitcher from "@/components/theme-switcher";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

export default function Header() {
    const pathname = usePathname();
    const isActive = (href: string) => (
        href === pathname ? "underline" : ""
    )

    return (
        <header className={"sticky z-20 top-0 px-2 md:px-24 bg-opacity-90 w-full"}>
            <div className={"flex align-middle items-center justify-between p-4 w-full bg-background/95"}>
                <Link className={"hidden md:block text-2xl font-extrabold"} href={"/"}>
                    Marcel Blijleven
                </Link>
                <Link className={"block md:hidden"} href={"/"}>
                    <Avatar>
                        <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                </Link>

                <div className={"flex space-x-4 items-center"}>
                    <Link
                        className={cn("font-semibold hover:underline", isActive("/coffee"))}
                        href={"/coffee"}
                    >
                        Coffee
                    </Link>
                    <Link
                        className={cn("font-semibold hover:underline", isActive("/activities"))}
                        href={"/activities"}
                    >
                        Activities
                    </Link>
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    )
}