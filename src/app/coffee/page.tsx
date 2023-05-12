import Header from "@/components/Header";
import Container from "@/components/Container";
import Intro from "@/app/Intro";

// import {readBrewData, readStatistics} from "@/lib/brew_data";
import Link from "next/link";
import {processMyBCFile} from "@/lib/brew_statistics";
import TextSection from "@/components/TextSection";
import Statistics from "@/app/coffee/components/Statistics";

export default function Coffee() {
    // const brews = readBrewData(10);
    const statistics = processMyBCFile();

    return (
        <>
            <Header />
            <Container>
                <Intro title={"My coffee stats"} description={""}/>
                <TextSection heading={"So, what is this?"}>
                    <p>
                        I keep track of most of my coffee brews in an app called Beanconqueror.
                        I wrote a script to parse the JSON exports from this app, which I sync and deploy to
                        this website using an iOS shortcut.
                    </p>
                    <p>
                        <Link className={
                            "decoration-2 decoration-blue-500 underline hover:text-blue-500"
                        } href={"/coffee/upload"}>Click here</Link> if you want to upload and visualize your own data.
                    </p>
                </TextSection>
                <Statistics {...statistics} uploaded={false}/>
            </Container>
        </>
    )
}
