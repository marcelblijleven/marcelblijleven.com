import {BrewStatistics} from "@/lib/brew_statistics";
import CountableStats from "@/app/coffee/components/CountableStats";
import BacklogStats from "@/app/coffee/components/BacklogStats";
import CardStats from "@/app/coffee/components/CardStats";

interface Props extends BrewStatistics {
    uploaded: boolean;
}

export default function Statistics(props: Props) {
    return (
        <div className={"w-full"}>
            <CardStats
                averageWeight={props.averageGrindWeight}
                averageBrewsPerDay={props.averageBrewsPerDay}
                totalBrews={props.totalBrews}
                lastBrew={props.lastBrew}
                totalGroundBeans={props.totalGroundBeans}
            />
            <BacklogStats label={props.uploaded ? "Your backlog" : "My backlog"} beans={props.beanMapping} usage={props.beanUsage}/>
            <CountableStats label={"Favourite origins"} countable={props.countryCount} />
            <CountableStats label={"Favourite roasters (bags)"} countable={props.roasterCount} />
            <CountableStats label={"Favourite roasters (grams)"} countable={props.roasterCountWeight} />
            <CountableStats label={"Favourite grinder"} countable={props.grinderCount} />
            <CountableStats label={"Favourite preparation method"} countable={props.preparationCount} />
            <CountableStats label={"Favourite variety"} countable={props.varietyCount} />
            <CountableStats label={"Favourite processing"} countable={props.processingCount} />
        </div>

    )
}