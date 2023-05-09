"use client"

import Link from "next/link";
import Button from "@/components/Button";
import HamburgerIcon from "@/components/icons/HamburgerIcon";
import {useState} from "react";
import CloseIcon from "@/components/icons/CloseIcon";

interface Props {

}

export default function Header(props: Props) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const onMenuClick = () => setMenuOpen(!menuOpen);
    const navLinks = (
        <div className={"flex gap-4"}>
            <Link href={"/"}>Home</Link>
            <Link href={"/coffee"}>Coffee</Link>
            <Link href={"/about"}>About</Link>
        </div>
    )

    return (
        <>
            <header className={"sticky top-0 w-full bg-slate-50 dark:bg-slate-900 border-b border-gray-300/25 mb-2"}>
                <div className={"flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-14"}>
                    <nav className={"hidden md:flex"}>
                        <div
                            className={"flex gap-6 text-sm leading-6 font-semibold text-gray-900 dark:text-gray-100"}>
                            {navLinks}
                        </div>
                    </nav>
                    <div className={"flex sm:justify-self-start md:justify-self-end font-semibold"}>
                        Marcel Blijleven
                    </div>

                    <div className={"flex justify-self-end md:hidden"}>
                        <Button variant={"icon"} onClick={onMenuClick}
                                icon={menuOpen ? <CloseIcon/> : <HamburgerIcon/>}/>
                    </div>
                </div>
            </header>
            {menuOpen && (
                <div className={"absolute top-14 left-0 h-screen w-full h-full z-10 bg-white dark:bg-slate-900"}>
                    <div className={"flex flex-col w-full divide-y-2 font-semibold"}>
                        <div className={"flex items-center justify-center flex-grow h-14"}>
                            <Link href={"/"}>Home</Link>
                        </div>
                        <div className={"flex items-center justify-center flex-grow h-14"}>
                            <Link href={"/coffee"}>Coffee</Link>
                        </div>
                        <div className={"flex items-center justify-center flex-grow h-14"}>
                            <Link href={"/about"}>About</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
