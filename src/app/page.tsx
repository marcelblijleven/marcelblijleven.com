import Link from "next/link";
import {Github} from "lucide-react";

export default function HomePage() {
    return (
        <div className={"flex flex-col gap-20 snap-y"}>
            <section className={"w-full px-4 snap-center"}>
                <div className={"mt-10 md:mt-32"}>
                    <h1 className={"text-xl md:text-2xl"}>
                        <span className={"text-md font-medium"}>Marcel Blijleven</span>
                        <p className={"text-balance max-w-xl"}>Software engineer creating quality software and
                            automating the boring stuff</p>
                    </h1>
                    <p>
                        Get in touch via <a className={"link"} href={"https://www.linkedin.com/in/marcelblijleven"}
                                            target={"_blank"} rel={"noopener noreferrer"}>Linkedin</a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-5 h-5 gap-x-2 inline">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
                        </svg>
                        , or view my <a className={"link"} href={"https://www.github.com/marcelblijleven"}
                                        target={"_blank"} rel={"noopener noreferrer"}>Github</a>
                    </p>
                </div>
            </section>
            <section className={"w-full px-4 text-right snap-center"}>
                <h3 className={"text-2xl font-medium"}>Writings</h3>
                <span className={"uppercase tracking-wide font-light"}>personal | hobby | work</span>
                <p className={"max-w-lg ml-auto"}>Nothing here yet</p>
            </section>
            <section className={"w-full px-4 text-left snap-center"}>
                <h3 className={"text-2xl font-medium"}>Coffee</h3>
                <span className={"uppercase tracking-wide font-light"}>personal | hobby</span>
                <p className={"max-w-md space-y-4"}>
                    I keep track of the (specialty) coffee I drink, the data is synced during
                    build time and displayed on the <Link href={"/coffee"} className={"link"}>coffee page</Link>.
                </p>
            </section>
            <section className={"w-full px-4 text-right snap-center"}>
                <h3 className={"text-2xl font-medium"}>Activities</h3>
                <span className={"uppercase tracking-wide font-light"}>personal | hobby | fitness</span>
                <p className={"max-w-md ml-auto space-y-4"}>
                    My activities are automatically synced and summaries can be found on the <Link
                    href={"/activities"} className={"link"}>activities page</Link>.
                </p>
            </section>
            <section className={"w-full px-4"}>
                <div className={"mx-auto w-20"}>
                    <div className={"flex gap-x-4"}>
                        <a href={"https://www.github.com/marcelblijleven"} target={"_blank"} rel={"noopener noreferrer"}>
                            <Github className={"text-muted-foreground hover:text-foreground hover:shadow-xl transition-all duration-300"}/>
                        </a>
                        <a href={"https://www.linkedin.com/in/marcelblijleven"} target={"_blank"} rel={"noopener noreferrer"}>
                            <svg className={"w-6 h-6 fill-muted-foreground hover:fill-foreground hover:shadow-xl transition-all duration-300"} role="img"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title>
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}