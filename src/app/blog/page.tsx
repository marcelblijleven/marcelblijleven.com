import Intro from "@/app/Intro";
import TextSection from "@/components/TextSection";
import Link from "next/link";
import {getSortedPostsData} from "@/lib/posts";
import {getDateStringWithMonthName} from "@/utils/dates";




function Post(props: {id: string, slug: string, date: string, title: string, tags: string}) {
    return (
        <Link href={`/blog/${props.slug}`}>
            <div className={"flex gap-2 items-baseline link no-underline"}>
                <p>{getDateStringWithMonthName(props.date)}</p>
                <h3 className={"font-semibold text-lg"}>{props.title}</h3>
                <p className={"text-gray-500"}>{`(${props.tags})`}</p>
            </div>
        </Link>
    )
}

export function Posts() {
    const postData = getSortedPostsData();

    return (
        <div className={"flex flex-col space-y-4"}>
            {/* @ts-ignore */}
            {postData.map(post => (<Post key={post.id} {...post} />))}
        </div>
    )
}

export default function Blog() {
    return (
        <>
            <Intro title={"Blog"}/>
            <TextSection heading={"Recent posts"}>
                <p>
                    An overview of my most recent posts
                </p>
            </TextSection>
            <Posts />
        </>
    )
}