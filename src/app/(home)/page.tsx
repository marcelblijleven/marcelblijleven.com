import PageShell from "@/components/layout/page-shell";
import Link from "next/link";

export default function Home() {
    return (
        <PageShell>
            <h1>Hi there</h1>
            <p>I&apos;m a software engineer from the Netherlands</p>
            <section>
                <legend className={"text-lg font-semibold"}>What I&apos;ve been up to</legend>
                <ul className={"list-disc list-inside"}>
                   <li>
                       <Link className={"text-blue-500"} href={"/coffee"}>Coffee I&apos;ve been drinking</Link>
                   </li>
                    <li>
                        <Link className={"text-blue-500"} href={"/activities"}>Activities I&apos;ve been doing</Link>
                    </li>
                </ul>
            </section>
        </PageShell>
    )
}