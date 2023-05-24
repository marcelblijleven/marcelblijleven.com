import Card from "@/components/Card";
import {getNaturalDate} from "@/utils/dates";
import {Bean} from "@/types/coffee/bc";
import { Text, Value } from "@/components/text";
import ProgressBar from "@/components/ProgressBar";

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
    progress?: number | null;
}

function Stats(props: StatsProps) {
    return (
        <Card className={"max-w-xs"}>
        <Text>{props.label}</Text>
        <Value>{props.value}</Value>
        {props.progress && (
            <>
                <div className="flex justify-between mt-4">
                    <Text>{`${props.progress.toFixed(2)} remaining days`}</Text>
                </div>
                <ProgressBar total={100} progress={props.progress} />
            </>
        )}
    </Card>)
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
        <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"}>
            {averageWeight && <Stats label={"Avg. grind weight"} value={`${averageWeight.toFixed(2)} gr`} />}
            {averageBrewsPerDay && <Stats label={"Avg. brews per day"} value={averageBrewsPerDay.toFixed(2)} />}
            {totalBrews && <Stats label={"Total brews"} value={totalBrews} />}
            {props.totalGroundBeans && <Stats label={"Total ground beans"} value={totalGroundBeansText} />}
            {remainingWeight && <Stats label={"Remaining bean weight"} value={`${remainingWeight.toFixed(2)} gr`} progress={estimatedRemainingWeight} />}
            {props.lastBrew && <Stats label={"Last brew"} value={timeSinceLastCoffee} />}
        </div>
    )
}