import Header from "@/components/Header";
import Container from "@/components/Container";
import Intro from "@/app/Intro";
import Statistics from "@/components/Statistics";
import Table from "@/app/coffee/brews/Table";
import {readBrewData, readStatistics} from "@/lib/brew_data";
import Link from "next/link";

export default function Coffee() {
    const brews = readBrewData(10);
    const statistics = readStatistics();
    return (
        <>
            <Header />
            <Container>
                <Intro title={"Coffee"} description={"Some coffee statistics"}/>
                <p className={"text-gray-500 dark:text-gray-400 mb-4"}>
                    This data is coming from the Beanconqueror app.
                    <Link className={'block text-sky-700 hover:underline'} href={"/coffee/upload"}>Click here to check your own stats</Link>
                </p>
                <Statistics brews={statistics.brews} roasters={statistics.roasters} countries={statistics.countries} />
                <h2 className={"text-2xl font-semibold"}>Most recent brews</h2>
                <Table brews={brews} />
                <div className={"flex flex-row-reverse text-sm mt-2 mb-2"}>
                    <Link className={'text-sky-700 hover:underline'} href={"/coffee/brews"}>See all brews</Link>
                </div>
            </Container>
        </>
    )
}
