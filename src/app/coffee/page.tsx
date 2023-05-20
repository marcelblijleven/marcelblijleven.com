import Intro from "@/app/Intro";

// import {readBrewData, readStatistics} from "@/lib/brew_data";
import Link from "next/link";
import {Metadata} from "next";
import {processMyBCFile} from "@/lib/brew_statistics";
import TextSection from "@/components/TextSection";
import Statistics from "@/app/coffee/components/Statistics";

export const metadata: Metadata = {
    title: "My coffee stats | marcelblijleven.com",
    description: "Some coffee statistics I track"
}

export default function Coffee() {
    // const brews = readBrewData(10);
    const statistics = processMyBCFile();

    return (
        <>
                <Intro title={"My coffee stats"} description={""}/>
                <TextSection heading={"So, what is this?"}>
                    <p>
                        I keep track of most of my coffee brews in an app called Beanconqueror.
                        I wrote a script to parse the JSON exports from this app, which I sync and deploy to
                        this website using an iOS shortcut.
                    </p>
                    <p>
                        <Link className={"link"} href={"/coffee/upload"}>Click here</Link> if you want to upload and visualize your own data.
                    </p>
                </TextSection>
                <Statistics {...statistics} uploaded={false}/>
        </>
    )
}
