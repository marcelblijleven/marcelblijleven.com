import Card from "@/components/Card";
import {getNaturalDate} from "@/utils/dates";

interface Props {
    averageWeight: number;
    averageBrewsPerDay: number;
    totalBrews: number;
    totalGroundBeans: number;
    lastBrew: Date;
}

interface StatsProps {
    label: string;
    value: string;
}

function Stats(props: StatsProps) {
    return (
        <div className={"min-w-full md:min-w-fit"}>
            <Card>
                <div className={"flex flex-col items-start md:items-center pointer-events-none select-none"}>
                    <p className={"text-xs md:text-md font-semibold whitespace-nowrap"}>{props.label}</p>
                    <p className={"text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-5xl md:leading-14"}>
                        {props.value}
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default function CardStats(props: Props) {
    const averageWeight = props.averageWeight ? props.averageWeight.toFixed(2) : null;
    const averageBrewsPerDay = props.averageBrewsPerDay ? props.averageBrewsPerDay.toFixed(2) : null;
    const totalBrews = props.totalBrews ? props.totalBrews.toString() : null;

    let totalGroundBeansText = "-";

    if (props.totalGroundBeans) {
        totalGroundBeansText = props.totalGroundBeans > 1000 ? `${(props.totalGroundBeans / 1000).toFixed(2)} kg` : `${props.totalGroundBeans} gr`
    }

    const timeSinceLastCoffee = getNaturalDate(props.lastBrew);

    return (
        <div className={"flex flex-row flex-wrap items-center justify-center gap-2 mb-4"}>
            {averageWeight && <Stats label={"Avg. grind weight"} value={`${averageWeight} gr`} />}
            {averageBrewsPerDay && <Stats label={"Avg. brews per day"} value={averageBrewsPerDay} />}
            {totalBrews && <Stats label={"Total brews"} value={totalBrews} />}
            {props.totalGroundBeans && <Stats label={"Total ground beans"} value={totalGroundBeansText} />}
            {props.lastBrew && <Stats label={"Last brew"} value={timeSinceLastCoffee} />}
        </div>
    )
}