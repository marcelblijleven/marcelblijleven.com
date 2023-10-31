import Image from "next/image"

import {Activity, getActivities as getStravaActivities} from "@/lib/strava/get-data";
import ActivityCard from "@/components/activities/activity-card";
import {format} from "date-fns";
import {BackHome} from "@/components/back-home";

async function getActivities(limit: number): Promise<Activity[]> {
    return (await getStravaActivities()).sort((a, b) => {
        return new Date(b.localDate).getTime() - new Date(a.localDate).getTime();
    }).slice(0, limit);
}

function getUpdated(): string {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss O")
}

export default async function ActivitiesPage() {
    const limit = 15;
    const activities = await getActivities(limit);
    const updatedAt = getUpdated();

    return (
        <div className={"flex flex-col"}>
            <section className={"w-full px-4"}>
                <div className={"mt-5 md:mt-28"}>
                    <BackHome/>
                    <h1 className={"text-xl md:text-2xl"}>
                        <span className={"text-md font-medium"}>Activities</span>
                        <p className={"text-lg max-w-lg my-2"}>
                            I love to exercise, it clears my mind and improves my health. During the spring and summer
                            I&apos;ll
                            take my road bike out for rides, in the colder months I usually ride indoors using Zwift.
                        </p>
                    </h1>
                    <p className={"text-xs md:text-sm text-muted-foreground"}>{`Last ${limit} activities on Strava, updated at ${updatedAt}`}</p>
                </div>
            </section>
            <div className={"p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3"}>
                {activities.map(activity => (
                    <ActivityCard key={activity.key} activity={activity}/>
                ))}
            </div>
            <a className={"mx-auto"} href={"https://www.strava.com"}>
                <Image
                    src={"/powered_by_strava.svg"}
                    height={43}
                    width={100}
                    alt={"Powered by Strava"}
                />
            </a>
        </div>
    )
}