"use client"

import {motion} from "framer-motion"
import {MouseEventHandler, ReactNode, useState} from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";


import {cn} from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader
} from "@/app/(home)/components/alert-dialog";
import {Button} from "@/components/ui/button";
import MenuBar from "@/components/terminal/menu-bar";
import TabsList from "@/components/terminal/tabs-list";
import BottomBar from "@/components/terminal/bottom-bar";
import {Github} from "lucide-react";


function TopBar(props: { toggleFullSize: () => void, file: string, toggleMinimised: () => void }) {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    return (
        <>
            <MenuBar title={`nvim ${props.file}`} onClose={() => setShowDialog(true)} onMinimise={props.toggleMinimised}
                     onZoom={props.toggleFullSize}/>
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent className={"max-w-[450px]"}>
                    <AlertDialogHeader>
                        <MenuBar title={"Are you sure?"} onClose={() => setShowDialog(false)}/>
                    </AlertDialogHeader>
                    <AlertDialogFooter className={"items-center gap-2 p-2 text-foreground dark:text-background"}>
                        Are you sure you want to close this window?
                        <div className={"flex gap-2"}>
                            <Button type={"button"} onClick={() => setShowDialog(false)} variant={"secondary"}
                                    size={"sm"}>No</Button>
                            <Button type={"button"} onClick={() => setShowDialog(false)} variant={"destructive"}
                                    size={"sm"}>Definitely not</Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
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
    "Click on the tech.md tab for some more tech related information.",
    "",
    <Heading key={"heading-3"} level={"##"} text={"What I've been up to"}/>,
    "",
    <Heading key={"heading-4"} level={"###"} text={"Coffee"}/>,
    "",
    <span key={"span-2"}>An overview of some coffee I&apos;ve been drinking <Link
        className={"underline text-blue-500"} href={"/coffee"}>can be found here</Link>.</span>,
    "",
    <Heading key={"heading-5"} level={"###"} text={"Activities"}/>,
    "",
    <span key={"span-3"}>Some of my recent Strava activities <Link className={"underline text-blue-500"}
                                                                 href={"/activities"}>can be found here</Link>.
    </span>,
    "",
];

const techText = [
    <Heading key={"tech-heading-1"} level={"#"} text={"Tech I like to work with"}/>,
    "",
    "I like to work with modern Python (walruses :=, type hinting, dataclasses ❤️), " +
    "JavaScript/TypeScript and the occasional Go projects.",
    "",
    "Although I consider myself primarily Backend-focussed, I also like to create beautiful " +
    "things on the frontend and I don't mind doing 'full stack' work. Especially since discovering Tailwind, " +
    "which makes css a joy to work with.",
    "",
    "I also like to automate the 'boring stuff' like automated releases based on Git commits, test automation and " +
    "shutting down unused appliances in the night to save energy ⚡️.",
    "",
    <Heading key={"tech-heading-2"} level={"##"} text={"Some bullet points"} />,
    "",
    <Heading key={"tech-heading-3"} level={"###"} text={"Programming languages & DB's"} />,
    "",
    "* Python",
    "* Typescript/JavaScript",
    "* Go",
    "* Postgres",
    "* MySQL",
    "",
    <Heading key={"tech-heading-3"} level={"###"} text={"Frameworks, packages, techniques, tools etc."}/>,
    "",
    "Some stuff I've been working with. It's not an exhaustive list and probably outdated since I'm constantly " +
    "learning about new stuff through blogs and podcasts.",
    "",
    "* Django",
    "* Pydantic",
    "* PEP8, black, ruff",
    "* REST (Django Rest Framework, FastAPI)",
    "* Graphql (Graphene, Strawberry 🍓)",
    "* Next.js, React",
    "* Tailwind",
    "* Docker",
    "* Supabase",
    "* Git (conventional commits FTW)",
    "* Test automation",
    "* A/B testing",
    "",
    <Heading key={"tech-heading-4"} level={"###"} text={"Personal projects"} />,
    "",
    <span key={"span-1"}>* <a className={"text-blue-500 underline"} target="_blank" href="https://beanstats.com" rel="noopener noreferrer">Beanstats</a>, a coffee data visualiser</span>,
    <span key={"span-2"}>* <a className={"text-blue-500 underline"} target="_blank" href="https://github.com/marcelblijleven/fittie" rel="noopener noreferrer">Fittie</a>, a package for decoding Garmin FIT files</span>,
    <span key={"span-3"}>* <a className={"text-blue-500 underline"} target="_blank" href="https://github.com/marcelblijleven/adventofcode" rel="noopener noreferrer">Advent of Code</a>, a slightly overkill project setup for Advent of Code</span>,
    "* Homelab",
    "",

];

function MiniTerminal({
                          onClick,
                          minimised = false,
                          children,
                          className,
                      }: { onClick?: () => void, minimised?: boolean, children: ReactNode, className?: string }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.2,
                transition: {duration: 0.3, stiffness: 50}
            }}
            className={cn("flex flex-col items-center h-[50px] w-[50px] bg-orange-100 dark:bg-gray-900 rounded-lg overflow-hidden hover:cursor-pointer hover:shadow-lg hover:shadow-cyan-500/50", className)}
            onClick={onClick}>
            <div className={"flex items-center h-[12px] px-1 gap-1 w-full bg-slate-200 dark:bg-slate-600"}>
                <div className={"h-1.5 w-1.5 rounded-full bg-[#FF605C]"}/>
                <div className={"h-1.5 w-1.5 rounded-full bg-[#FFBD44]"}/>
                <div className={"h-1.5 w-1.5 rounded-full bg-[#00CA4E]"}/>
            </div>
            {children}
            {minimised && <div
              className={"absolute -bottom-[12px] left-0 right-0 mx-auto h-1 w-1 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"}/>}
        </motion.div>
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
            <div
                className={"absolute flex items-center justify-center space-x-4 left-0 right-0 mx-auto bottom-0 w-full"}>
                <a target="_blank" href="https://github.com/marcelblijleven" rel="noopener noreferrer">
                    <MiniTerminal className={"bg-gray-500 dark:bg-gray-500 text-background dark:text-foreground"}>
                        <Github className={"w-6 h-6 mt-2"}/>
                    </MiniTerminal>
                </a>
                <MiniTerminal onClick={() => setMinimised(false)} minimised={minimised}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-8 h-8 mt-1">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
                    </svg>
                </MiniTerminal>
                <a target="_blank" href="https://www.linkedin.com/in/marcelblijleven/" rel="noopener noreferrer">
                    <MiniTerminal className={"bg-[#0a66c2] dark:bg-[#0a66c2]"}>
                        <svg className={"w-6 h-6 mt-2 fill-background dark:fill-foreground"} role="img"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title>
                            <path
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </MiniTerminal>
                </a>
            </div>
            <motion.div
                initial={'maximised'}
                variants={variants}
                animate={minimised ? 'minimised' : 'maximised'}
                transition={{duration: 0.2}}
                className={cn("absolute bottom-0 z-10 left-0 right-0 mx-auto min-h-[450px] md:min-h-[600px] bg-orange-100 dark:bg-gray-900 rounded-lg overflow-hidden", !fullSize ? "w-[95%]" : "w-[100%]")}
                onMouseLeave={() => setHoverIndex(null)}
            >
                <Tabs.Root value={tab} onValueChange={(val) => setTab(val)} className={"overflow-unset"}>
                    <div>
                        <TopBar toggleFullSize={() => setFullSize(!fullSize)} file={tab}
                                toggleMinimised={() => setMinimised(!minimised)}/>
                        <TabsList tabs={["aboutme.md", "tech.md"]}/>
                        <Tabs.Content value={"aboutme.md"}>
                            <div className={"h-[450px] md:h-[600px] overflow-y-scroll"}>
                                {text.map((value, index) => (
                                    <Row key={`${value}_${index}`}
                                         text={value}
                                         index={index}
                                         hoverIndex={hoverIndex}
                                         onMouseEnter={() => setHoverIndex(index)}
                                    />))}
                            </div>
                        </Tabs.Content>
                        <Tabs.Content value={"tech.md"}>
                            <div className={"h-[450px] md:h-[600px] overflow-y-scroll"}>
                                {techText.map((value, index) => (
                                    <Row key={`${value}_${index}`}
                                         text={value}
                                         index={index}
                                         hoverIndex={hoverIndex}
                                         onMouseEnter={() => setHoverIndex(index)}
                                    />))}
                            </div>
                        </Tabs.Content>
                        <BottomBar file={tab}/>
                    </div>
                </Tabs.Root>
            </motion.div>
        </>
    )
}

function Terminal() {
    return (
        <div className={"relative w-full max-w-[1000px] h-[600px] md:h-[600px]"}>
            <TerminalWindow/>
        </div>
    )
}

export {
    Terminal
}