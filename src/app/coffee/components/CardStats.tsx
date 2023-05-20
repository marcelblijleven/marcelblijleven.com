import Card from "@/components/Card";
import {getNaturalDate} from "@/utils/dates";
import {Bean} from "@/types/coffee/bc";

interface Props {
    averageWeight: number;
    averageBrewsPerDay: number;
    totalBrews: number;
    totalGroundBeans: number;
    lastBrew: Date;
    usagePerBeans: Mapping<number>;
    beanMapping: Mapping<Bean>;
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

function getRemainingWeight(mapping: Mapping<Bean>, usage: Mapping<number>): number {
    let remainingWeight: number = 0;

    for (const bean of Object.values(mapping)) {
        if (bean.finished || !bean.weight) {
            continue;
        }

        const beanUsage = usage[bean.config.uuid] || 0;
        const totalWeight = bean.weight;

        remainingWeight += (totalWeight - beanUsage);
    }

    return remainingWeight;
}

export default function CardStats(props: Props) {
    const averageWeight = props.averageWeight;
    const averageBrewsPerDay = props.averageBrewsPerDay;
    const totalBrews = props.totalBrews ? props.totalBrews.toString() : null;

    let totalGroundBeansText = "-";

    if (props.totalGroundBeans) {
        totalGroundBeansText = props.totalGroundBeans > 1000 ? `${(props.totalGroundBeans / 1000).toFixed(2)} kg` : `${props.totalGroundBeans} gr`
    }

    const timeSinceLastCoffee = getNaturalDate(props.lastBrew);
    const remainingWeight = getRemainingWeight(props.beanMapping, props.usagePerBeans);
    const showRemainingWeight = remainingWeight && averageBrewsPerDay && averageWeight;

    const estimatedRemainingWeight = showRemainingWeight ? remainingWeight / (averageBrewsPerDay * averageWeight) : null;

    return (
        <div className={"flex flex-row flex-wrap items-center justify-center gap-2 mb-4"}>
            {averageWeight && <Stats label={"Avg. grind weight"} value={`${averageWeight.toFixed(2)} gr`} />}
            {averageBrewsPerDay && <Stats label={"Avg. brews per day"} value={averageBrewsPerDay.toFixed(2)} />}
            {totalBrews && <Stats label={"Total brews"} value={totalBrews} />}
            {props.totalGroundBeans && <Stats label={"Total ground beans"} value={totalGroundBeansText} />}
            {remainingWeight && <Stats label={"Remaining bean weight"} value={`${remainingWeight.toFixed(2)} gr`} />}
            {estimatedRemainingWeight && <Stats label={"Estimated remaining days"} value={`${estimatedRemainingWeight.toFixed(1)} days`} />}
            {props.lastBrew && <Stats label={"Last brew"} value={timeSinceLastCoffee} />}
        </div>
    )
}