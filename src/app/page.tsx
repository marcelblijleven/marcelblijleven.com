import Intro from "@/app/Intro";
import TextSection from "@/components/TextSection";
import Link from "next/link";

export default function Home() {

    return (
        <>
            <Intro title={"Hi there, I'm Marcel 👋"}/>
            <TextSection>
                <p>
                    I&apos;m a software developer from the Netherlands.
                    I love to automate the boring stuff and I have a strong focus on code quality.
                </p>
                <p>
                    Here you can find some of my <Link className={"link"} href={"/projects"}>projects</Link>.
                    Find out what kind of coffee I&apos;ve been drinking <Link className={"link"} href={"/coffee"}>here</Link>.
                </p>
                <p>
                    <Link className={"link"} href={"https://www.github.com/marcelblijleven"}>github.com/marcelblijleven</Link>
                </p>
            </TextSection>
        </>
    )
}
