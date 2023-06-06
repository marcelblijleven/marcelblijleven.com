"use client"

import Intro from "@/app/Intro";
import {Statistics as BrewStatistics, processBCFile} from "@/lib/brew_statistics";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import Statistics from "@/app/coffee/components/Statistics";
import TextSection from "@/components/text-section";
import FileUpload from "@/components/file-upload";

export default function UploadPage() {
    const [data, setData] = useState<BrewStatistics | null>(null);

    const retrieveData = (data: BrewStatistics) => {
        setData(data)
    }

    return (
        <>
            <Intro title={"Your coffee stats"}
                   description={"Process a JSON export from the Beanconqueror app to view your stats"}/>
            <div className={"flex flex-col gap-2"}>
                {!data ? (
                    <TextSection heading={"Select file to process"}>
                        <p>
                            Select a JSON export from the Beanconqueror app (usually named Beanconqueror.json) and
                            click the process button
                            to view your stats.
                        </p>
                        <p className={"mb-4"}>
                            The file isn&apos;t uploaded or stored anywhere, only processed in the browser.
                        </p>
                        <FileUpload callback={(contents) => processBCFile(contents, retrieveData)}/>
                    </TextSection>
                ) : (
                    <>
                        <TextSection heading={"Here's your data"}>
                            <p>Enjoy!</p>
                        </TextSection>

                        <div className={"flex flex-col gap-4"}>
                            <div className={"max-w-md"}>
                                <Button variant={"default"} size={"default"} onClick={() => setData(null)}
                                        label={"Process another file"}>
                                    Process another file
                                </Button>
                            </div>
                            <Statistics {...data} uploaded={true}/>
                        </div>
                    </>)}
            </div>
        </>
    )
}

