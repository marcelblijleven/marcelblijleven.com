import Intro from "@/app/Intro";
import TextSection from "@/components/TextSection";
import Link from "next/link";
import {createElement, ReactNode} from "react";
import GitHubIcon from "@/components/icons/GithubIcon";

const stripHttps = (url: string) => url.split("https://www.")[1];

function Project(props: {title: string, url: string, children: ReactNode, shortDescription: string, icon: ReactNode}) {
    return (
        <div className={"flex flex-col gap-2 px-4 py-4 md:px-6 md:py-8 hover:shadow"}>
            <div className={"flex align-baseline justify-between"}>
                <div className={"flex flex-col md:flex-row gap-0 md:gap-1 items-baseline"}>
                    <h3 className={"text-lg font-semibold"}>{props.title}</h3>
                    <span className={"text-md italic font-normal"}>{props.shortDescription}</span>
                </div>
                {props.icon && <Link href={props.url}>{createElement(props.icon)}</Link>}
            </div>
            {props.children}
            <Link className={"link"} href={props.url}>{stripHttps(props.url)}</Link>
        </div>
    )
}

export default function ProjectPage() {
    return (
        <>
            <Intro title={"Projects"} description={""}/>
            <TextSection heading={"GitHub"}>
                <p>
                    A small collection of projects hosted on my <Link className={"link"} href={"https://www.github.com/marcelblijleven"}>GitHub</Link> page.
                </p>
            </TextSection>
            <div className={"flex flex-col gap-4 mb-4"}>
                <Project
                    title={"Fittie"}
                    shortDescription={"a Python package for decoding .FIT workout files"}
                    url={"https://www.github.com/marcelblijleven/fittie"}
                    icon={GitHubIcon}
                >
                    <p>
                        Using the documentation on the Garmin FIT Protocol I wrote this Python package to be able to decode
                        my bike workouts.
                    </p>
                </Project>
                <Project
                    title={"Advent of Code"}
                    shortDescription={"my solutions for the AOC puzzles"}
                    url={"https://www.github.com/marcelblijleven/adventofcode"}
                    icon={GitHubIcon}
                >
                    <p>
                        Every year I like to participate in the Advent of Code, an Advent calendar of small programming puzzles.<br />
                        I don&apos;t always have the time to finish a complete year, but it is a fun exercise nonetheless.
                    </p>
                    <Link className={"link"} href={"https://www.adventofcode.com"}>Advent of Code website</Link>
                </Project>
            </div>
        </>
    )
}
