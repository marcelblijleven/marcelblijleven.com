import {Activity, SportType} from "@/lib/strava/get-data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {format} from "date-fns";
import ActivityPolyline from "@/components/activities/activity-polyline";
import {Bike, Dumbbell, Footprints, Mountain} from "lucide-react";

export interface ActivityCardProps {
    activity: Activity;
}

function getTime(duration: number): string {
    if (!duration) {
        return "-";
    }

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60)
    const seconds = Math.floor(duration - hours * 3600 - minutes * 60);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function DetailsColumn(props: { label: string, value: string }) {
    return (
        <div className={"flex flex-col gap-0.5"}>
            <span className={"text-xs"}>{props.label}</span>
            <span>{props.value}</span>
        </div>
    )
}

function ActivityDetailsRide(props: ActivityCardProps) {
    return (
        <div className={"grid grid-cols-2"}>
            <DetailsColumn label={"Duration"} value={getTime(props.activity.movingTime)}/>
            <DetailsColumn label={"Average speed"} value={props.activity.averageSpeed}/>
            <DetailsColumn label={"Max speed"} value={props.activity.maxSpeed}/>
            <DetailsColumn label={"Normalised power"} value={
                props.activity.weightedAverageWatts ? props.activity.weightedAverageWatts + " watts" : "-"
            }/>
        </div>
    )
}

function ActivityDetails(props: ActivityCardProps) {
    const sportType = props.activity.sportType.toString();

    switch (sportType) {
        case "Ride":
        case "VirtualRide":
            return <ActivityDetailsRide {...props} />
    }

    return (
        <div className={"grid grid-cols-2 w-full"}>
            <DetailsColumn label={"Duration"} value={getTime(props.activity.movingTime)}/>
        </div>
    );
}

function SportIcon(props: {sportType: SportType}) {
    const properties = {
        height: 100,
        width: 100,
        className: "mx-auto my-auto h-30 w-30",
        strokeWidth: 1,
        color: "#0ea5e9",
    }

    switch (props.sportType.toString()) {
        case "Hike":
        case "Walk":
        case "Run":
            return <Footprints {...properties} />
        case "RockClimbing":
            return <Mountain {...properties}/>
        case "Ride":
        case "VirtualRide":
            return <Bike {...properties} />
        case "Workout":
        case "WeightTraining":
        default:
            return <Dumbbell {...properties} />

    }
}

export default function ActivityCard(props: ActivityCardProps) {
    const date = format(new Date(props.activity.localDate), "yyyy-MM-dd HH:mm:ss O")

    return (
        <Card className={"h-96"}>
            <CardHeader>
                <CardTitle>{props.activity.sportType.toString()}</CardTitle>
                <CardDescription>{date}</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col items-start"}>
                {props.activity.polyline && (
                    <ActivityPolyline
                        id={props.activity.name}
                        width={"auto"}
                        height={150}
                        margin={{top: 20, bottom: 20, left: 0, right: 20}}
                        polyline={props.activity.polyline}
                    />
                )}
                {!props.activity.polyline && (
                    <div className={"flex items-center justify-center h-[150px] w-full"}>
                        <SportIcon sportType={props.activity.sportType} />
                    </div>
                )}
                <ActivityDetails {...props}/>
            </CardContent>
        </Card>
    )
}