"use client"

import {motion} from "framer-motion"
import {MouseEventHandler, ReactNode, useState} from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";


import {cn} from "@/lib/utils";
import {AlertDialog} from "@radix-ui/react-alert-dialog";
import {AlertDialogContent, AlertDialogFooter, AlertDialogHeader} from "@/app/(home)/components/alert-dialog";
import {Button} from "@/components/ui/button";


function TopBar(props: { toggleFullSize: () => void, file: string, toggleMinimised: () => void }) {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    return (
        <div
            className={"flex justify-between items-center h-[30px] w-full bg-slate-200 dark:bg-slate-600 text-slate-600"}>

            <div className={"flex group items-center space-x-2 px-2"}>
                <button
                    className={`flex items-center justify-center rounded-full bg-[#FF605C] h-[12px] w-[12px]`}
                    onClick={() => setShowDialog(true)}
                    type={"button"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="hidden group-hover:block w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>

                </button>
                <button
                    type={"button"}
                    className={`flex items-center justify-center rounded-full bg-[#FFBD44] h-[12px] w-[12px]`}
                    onClick={props.toggleMinimised}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="hidden group-hover:block w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"/>
                    </svg>

                </button>
                <button
                    type={"button"}
                    className={`flex items-center justify-center rounded-full bg-[#00CA4E] h-[12px] w-[12px]`}
                    onClick={props.toggleFullSize}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="hidden group-hover:block w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                </button>
            </div>
            <span
                className={"hidden md:inline text-slate-500 dark:text-slate-300"}>nvim code/marcelblijleven.com/{props.file}</span>
            <span className={"inline md:hidden text-slate-500 dark:text-slate-300"}>nvim {props.file}</span>
            <div className={"w-[68px]"}/>
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent className={"max-w-[450px]"}>
                    <AlertDialogHeader>
                        <div
                            className={"flex justify-between h-[30px] items-center w-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm"}>
                            <div className={"flex space-x-2 px-2"}>
                                <button
                                    className={"flex items-center justify-center rounded-full bg-[#FF605C] h-[12px] w-[12px] group"}
                                    onClick={() => setShowDialog(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="hidden group-hover:block w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <button
                                    className={"flex items-center justify-center rounded-full bg-gray-300 h-[12px] w-[12px]"}
                                    disabled/>
                                <button
                                    className={"flex items-center justify-center rounded-full bg-gray-300 h-[12px] w-[12px]"}
                                    disabled/>
                            </div>
                            <span>Are you sure?</span>
                            <div className={"w-[48px]"}/>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className={"items-center gap-2 p-2 text-foreground dark:text-background"}>
                        Are you sure you want to close this window?
                        <div className={"flex gap-2"}>
                            <Button type={"button"} onClick={() => setShowDialog(false)} variant={"secondary"}
                                    size={"sm"}>No take me back</Button>
                            <Button type={"button"} onClick={() => setShowDialog(false)} variant={"destructive"}
                                    size={"sm"}>Yes close this dialog</Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

function BottomBar(props: { file: string }) {
    return (
        <div
            className={"flex justify-between items-center pl-2 h-[30px] w-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm"}>
            <div>NORMAL</div>
            <div className={"rounded-l-full pl-4 pr-2 gap-1 flex items-center bg-sky-200 dark:bg-sky-900 h-full"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-[18px] h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                {props.file}
            </div>
        </div>
    )
}

function Row(props: { text: string | ReactNode, index: number, hoverIndex: number | null, onMouseEnter: MouseEventHandler<HTMLDivElement> }) {
    return (
        <div className={"flex w-full gap-6 hover:bg-orange-200 hover:dark:bg-slate-800"}
             onMouseEnter={props.onMouseEnter}>
            <span
                className={"ml-2 w-[24px] text-right text-slate-400 dark:text-slate-600"}>{!!props.hoverIndex ? Math.abs(props.hoverIndex - props.index) : props.index + 1}</span>
            <span
                className={"flex max-w-[calc(100%-24px-theme(space.2)-theme(space.2)-theme(space.6))]"}>{props.text}</span>
        </div>
    )
}

function Heading(props: { level: string, text: string }) {
    return (
        <div className={"flex gap-2"}>
            <span className={"text-red-400 dark:text-purple-400"}>{props.level}</span>
            <span className={"text-blue-500"}>{props.text}</span>
        </div>
    )
}

const text = [
    <Heading key={"heading-1"} level={"#"} text={"Hi there"}/>,
    "",
    "Nice to see you here!",
    "",
    <Heading key={"heading-2"} level={"##"} text={"About me"}/>,
    "",
    "I'm a software engineer from the Netherlands. I'm sure I'll come up with some more intro text soon.",
    "",
    <Heading key={"heading-3"} level={"##"} text={"What I've been up to"}/>,
    "",
    <Heading key={"heading-4"} level={"###"} text={"Coffee"}/>,
    "",
    <div key={"div-1"}>An overview of some coffee I&apos;ve been drinking <Link
        className={"underline text-blue-500"} href={"/coffee"}>can be found here</Link>.</div>,
    "",
    <Heading key={"heading-5"} level={"###"} text={"Activities"}/>,
    "",
    <div key={"div-2"}>Some of my recent Strava activities <Link className={"underline text-blue-500"}
                                                                 href={"/activities"}>can be found here</Link>.
    </div>,
    "",
];

const techText = [
    <Heading key={"tech-heading-1"} level={"#"} text={"Tech I like to work with"}/>,
    "",
    <Heading key={"tech-heading-2"} level={"##"} text={"Programming languages"}/>,
    "",
    "* Python",
    "* TypeScript, JavaScript",
    "* Go",
    "",
    <Heading key={"tech-heading-3"} level={"##"} text={"Frameworks, packages, DBs & tools"}/>,
    "",
    "* Django",
    "* FastAPI",
    "* Next.js",
    "* React",
    "* Postgres",
    "* Strawberry",
    "* Tailwind",
    "* Docker",
    "* REST",
    "* Graphql",
    "* Git (conventional commits FTW)",
    "",
];

function MiniTerminal({onClick, minimised}: { onClick: () => void, minimised: boolean }) {
    return (
        <>
            <div
                className={"absolute flex flex-col items-center left-0 right-0 mx-auto bottom-0 h-[50px] w-[50px] bg-orange-100 dark:bg-gray-900 rounded-lg overflow-hidden hover:cursor-pointer"}
                onClick={onClick}>
                <div className={"flex items-center h-[12px] px-1 gap-1 w-full bg-slate-200 dark:bg-slate-600"}>
                    <div className={"h-1.5 w-1.5 rounded-full bg-[#FF605C]"}/>
                    <div className={"h-1.5 w-1.5 rounded-full bg-[#FFBD44]"}/>
                    <div className={"h-1.5 w-1.5 rounded-full bg-[#00CA4E]"}/>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-8 h-8 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
                </svg>
            </div>
            {minimised && <div className={"absolute left-0 right-0 mx-auto -bottom-[10px] h-[4px] w-[4px] rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"} />}
        </>
    )
}


function TerminalWindow() {
    const [fullSize, setFullSize] = useState(false);
    const [minimised, setMinimised] = useState(false);
    const [tab, setTab] = useState<string>("aboutme.md");
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    const variants = {
        minimised: {transform: "scale(0)", transformOrigin: "bottom center"},
        maximised: {transform: "scale(1)", transformOrigin: "bottom center"}
    }

    return (
        <>
            <MiniTerminal onClick={() => setMinimised(false)} minimised={minimised}/>
            <motion.div
                initial={'maximised'}
                variants={variants}
                animate={minimised ? 'minimised' : 'maximised'}
                transition={{duration: 0.2}}
                className={cn(
                    "absolute bottom-0 z-10 left-0 right-0 mx-auto bg-orange-100 dark:bg-gray-900 h-[680px] md:h-[700px] min-w-[300px] max-w-[1000px] rounded-lg overflow-hidden flex flex-col justify-between",
                    !fullSize ? "w-[95%]" : "w-[100%]",
                )}
                onMouseLeave={() => setHoverIndex(null)}
            >
                <Tabs.Root value={tab} onValueChange={(val) => setTab(val)}>
                    <div>
                        <TopBar toggleFullSize={() => setFullSize(!fullSize)} file={tab}
                                toggleMinimised={() => setMinimised(!minimised)}/>
                        <Tabs.TabsList
                            className={"flex items-end h-[28px] px-2 bg-orange-200/50 dark:bg-slate-700/50 border-b border-orange-300/50 dark:border-slate-800"}>
                            <Tabs.Trigger
                                className={'px-2 h-[24px] data-[state="active"]:rounded-t-lg data-[state="active"]:border-x data-[state="active"]:border-t data-[state="active"]:border-orange-300/50 data-[state="active"]:dark:border-slate-800/50  data-[state="active"]:bg-orange-200 data-[state="active"]:dark:bg-slate-700'}
                                value={"aboutme.md"}>aboutme.md</Tabs.Trigger>
                            <Tabs.Trigger
                                className={'px-2 h-[24px] data-[state="active"]:rounded-t-lg data-[state="active"]:border-x data-[state="active"]:border-t data-[state="active"]:border-orange-300/50 data-[state="active"]:dark:border-slate-800/50  data-[state="active"]:bg-orange-200 data-[state="active"]:dark:bg-slate-700'}
                                value={"tech.md"}>tech.md</Tabs.Trigger>
                        </Tabs.TabsList>

                    </div>

                    <div className={"flex flex-col grow text-slate-700 dark:text-slate-300"}>
                        <Tabs.Content value={"aboutme.md"}>
                            {text.map((value, index) => (
                                <Row key={`${value}_${index}`}
                                     text={value}
                                     index={index}
                                     hoverIndex={hoverIndex}
                                     onMouseEnter={() => setHoverIndex(index)}
                                />))}
                        </Tabs.Content>
                        <Tabs.Content value={"tech.md"}>
                            {techText.map((value, index) => (
                                <Row key={`${value}_${index}`}
                                     text={value}
                                     index={index}
                                     hoverIndex={hoverIndex}
                                     onMouseEnter={() => setHoverIndex(index)}
                                />))}
                        </Tabs.Content>
                    </div>
                </Tabs.Root>
                <BottomBar file={tab}/>
            </motion.div>
        </>
    )
}

function Terminal() {
    return (
        <div className={"relative w-full max-w-[1000px] h-[680px] md:h-[700px]"}>
            <TerminalWindow/>
        </div>
    )
}

export {
    Terminal
}