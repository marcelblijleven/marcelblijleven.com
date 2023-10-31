import * as path from "path";
import BacklogTable from "@/components/coffee/backlog-table";

import {Mapping} from "@/types";
import {Bean} from "@/types/beanconqueror";

import {processBCFile} from "@/lib/beanconqueror/statistics";
import {readZipFile} from "@/lib/beanconqueror/utils";
import {stringToDate} from "@/lib/dates";
import {sortFnAsc} from "@/lib/sort";
import BrewsTable from "@/components/coffee/brews-table";
import TopNComponent from "@/components/coffee/top-n-component";
import {Metadata} from "next";
import {BackHome} from "@/components/back-home";

const metadata: Metadata = {
    title: "My coffee",
}

function getCoffeeData() {
    const zip = path.join(process.cwd(), "/Beanconqueror.zip");
    const zipContents = readZipFile(zip);
    return processBCFile(zipContents);
}

function backlogBeans(beans: Mapping<Bean>) {
    return (
        Object.entries<Bean>(beans)
            .map(([_, bean]) => bean)
            .filter(bean => !bean.finished)
            .sort((a, b) => {
                return sortFnAsc(stringToDate(a.roastingDate), stringToDate(b.roastingDate))
            })
    );
}

export default function CoffeePage() {
    const coffeeData = getCoffeeData();

    return (
        <div className={"flex flex-col space-y-2"}>
            <section className={"w-full px-4"}>
                <div className={"mt-5 md:mt-28"}>
                    <BackHome/>
                    <h1 className={"text-xl md:text-2xl"}>
                        <span className={"text-md font-medium"}>Coffee stats</span>
                        <p className={"text-lg max-w-lg my-2"}>
                            Automatically parsed data from the Beanconqueror app. If you&apos;d like to see your own data,
                            visit <a className={"link"} rel={"noopener noreferrer"} href={"https://www.beanstats.com"}>www.beanstats.com</a>
                        </p>
                    </h1>
                </div>
            </section>
            <section className={"w-full px-4 space-y-2 md:space-y-3"}>
                <legend className={"font-semibold text-lg"}>Last brews</legend>
                <BrewsTable
                    brews={coffeeData.brews}
                    beanMapping={coffeeData.beanMapping}
                    preperationMapping={coffeeData.preparationMapping}
                    grinderMapping={coffeeData.grinderMapping}
                />
            </section>
            <section className={"w-full px-4 space-y-2 md:space-y-3"}>
                <legend className={"font-semibold text-lg"}>Backlog</legend>
                <BacklogTable
                    beans={backlogBeans(coffeeData.beanMapping)}
                    usage={coffeeData.usagePerBean}
                />
            </section>
            <section className={"w-full px-4 space-y-2 md:space-y-3"}>
                <legend className={"font-semibold text-lg"}>Favourites</legend>
                <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3 lg:gap-4"}>
                    <TopNComponent
                        label={"Origins"}
                        description={"Country of origin"}
                        items={coffeeData.countryCount}
                    />
                    <TopNComponent
                        label={"Roasters"}
                        description={"By bags bought"}
                        items={coffeeData.roasterCount}
                    />
                    <TopNComponent
                        label={"Roasters"}
                        description={"By grams bought"}
                        items={coffeeData.roasterCountWeight}
                    />
                    <TopNComponent
                        label={"Varieties"}
                        description={"Coffee bean variety"}
                        items={coffeeData.varietyCount}
                    />
                    <TopNComponent
                        label={"Processing methods"}
                        description={"How the coffee bean was processed"}
                        items={coffeeData.processingCount}
                    />
                    <TopNComponent
                        label={"Preparation methods"}
                        description={"Brewing devices used"}
                        items={coffeeData.brewsPerPreparationMethod}
                        mapping={coffeeData.preparationMapping}
                    />
                </div>
            </section>
        </div>
    )
}