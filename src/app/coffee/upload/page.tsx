"use client"


import Header from "@/components/Header";
import Container from "@/components/Container";
import Intro from "@/app/Intro";
import {BrewStatistics} from "@/lib/brew_statistics";
import {useState} from "react";
import Button from "@/components/Button";
import Statistics from "@/app/coffee/upload/Statistics";
import UploadSection from "@/app/coffee/upload/UploadSection";





export default function UploadPage() {
    const [data, setData] = useState<BrewStatistics>(null);

    const retrieveData = (data: BrewStatistics) => {
        setData(data)
    }

    return (
        <>
            <Header />
            <Container>
                <Intro title={"Your stats"} description={"Process a JSON export from the Beanconqueror app to view your stats"} />
                <div className={"flex flex-col gap-2"}>
                    {!data ? (
                        <UploadSection callback={retrieveData} />
                    )  :  (
                        <div className={"flex flex-col gap-4"}>
                            <div className={"max-w-md"}>
                                <Button onClick={() => setData(null)} label={"Back"} />
                            </div>
                            <Statistics {...data} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}

