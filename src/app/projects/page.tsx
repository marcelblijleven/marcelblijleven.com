import Intro from "@/app/Intro";
import TextSection from "@/components/text-section";
import Link from "next/link";
import {Metadata} from "next";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GitFork, LucideIcon, LucideProps, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";


export const metadata: Metadata = {
    title: "Projects | marcelblijleven.com",
    description: "A small collection of projects hosted on my GitHub"
}

interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    language: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
}

async function getRepositoryDetails(owner: string, repo: string): Promise<Repository> {
    if (process.env.NODE_ENV !== "production") {
        return {
            id: Math.random(),
            name: repo,
            full_name: `${owner}/${repo}`,
            description: "This is a placeholder, running in dev mode",
            language: "Python",
            html_url: "https://example.com",
            stargazers_count: 10,
            forks_count: 10,
            updated_at: "",
        }
    }


    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const content = await res.json();
    return (content as Repository);
}


interface IconProps extends LucideProps {
    Icon: LucideIcon;
    count: number;
}

const IconCount = ({Icon, count, ...props}: IconProps) => {
    return (
        <div className={"flex gap-2 items-center"}>
            <Icon className={"h-4 w-4"} {...props} />
            {count}
        </div>
    );
};

function Project(props: { repository: Repository }) {

    return (
        <Card key={props.repository.id}>
            <CardHeader>
                <CardTitle>
                    <div className={"flex justify-between"}>
                        {props.repository.name}
                    </div>
                </CardTitle>
                <CardDescription>{props.repository.description}</CardDescription>
            </CardHeader>
            <CardContent className={"flex items-center gap-2"}>
                <Badge variant={"outline"}>{props.repository.language}</Badge>
                <IconCount Icon={Star} count={props.repository.stargazers_count} />
                <IconCount Icon={GitFork} count={props.repository.forks_count} />
            </CardContent>
        </Card>
    )
}

export default async function ProjectPage() {
    const fittie = await getRepositoryDetails("marcelblijleven", "fittie");
    const aoc = await getRepositoryDetails("marcelblijleven", "adventofcode");

    return (
        <>
            <Intro title={"Projects"} description={""}/>
            <TextSection heading={"GitHub"}>
                <p>
                    A small collection of projects hosted on my <Link className={"link"}
                                                                      href={"https://www.github.com/marcelblijleven"}>GitHub</Link> page.
                </p>
            </TextSection>
            <div className={"flex flex-col gap-4 mb-4"}>
                <Project key={fittie.id} repository={fittie}/>
                <Project key={aoc.id} repository={aoc}/>
            </div>
        </>
    )
}
