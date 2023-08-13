import Image from "next/image"

import PageShell from "@/components/layout/page-shell";

import {Activity, getActivities as getStravaActivities} from "@/lib/strava/get-data";
import ActivityCard from "@/components/activities/activity-card";
import {format} from "date-fns";
import Link from "next/link";
import {Metadata} from "next";

const metadata: Metadata = {
    title: "My activities",
}

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
        <PageShell>
            <h1>Activities</h1>
            <section className={"w-full space-y-2 md:space-y-3"}>
                <legend>{`Last ${limit} activities on Strava, updated at ${updatedAt}`}</legend>
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3"}>
                    {activities.map(activity => (
                        <ActivityCard key={activity.key} activity={activity} />
                    ))}
                </div>
            </section>
                <Link className={"mx-auto"} href={"https://www.strava.com"}>
                    <Image
                        src={"/powered_by_strava.svg"}
                        height={43}
                        width={100}
                        alt={"Powered by Strava"}
                    />
                </Link>
        </PageShell>
    )
}