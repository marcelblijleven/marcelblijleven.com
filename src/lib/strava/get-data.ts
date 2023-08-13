export enum SportType {
    AlpineSki,
    BackcountrySki,
    Badminton,
    Canoeing,
    Crossfit,
    EBikeRide,
    Elliptical,
    EMountainBikeRide,
    Golf,
    GravelRide,
    Handcycle,
    HighIntensityIntervalTraining,
    Hike,
    IceSkate,
    InlineSkate,
    Kayaking,
    Kitesurf,
    MountainBikeRide,
    NordicSki,
    Pickleball,
    Pilates,
    Racquetball,
    Ride,
    RockClimbing,
    RollerSki,
    Rowing,
    Run,
    Sail,
    Skateboard,
    Snowboard,
    Snowshoe,
    Soccer,
    Squash,
    StairStepper,
    StandUpPaddling,
    Surfing,
    Swim,
    TableTennis,
    Tennis,
    TrailRun,
    Velomobile,
    VirtualRide,
    VirtualRow,
    VirtualRun,
    Walk,
    WeightTraining,
    Wheelchair,
    Windsurf,
    Workout,
    Yoga
}

interface Stream {
    original_size: number;
    resolution: "low" | "medium" | "high";
    series_type: "distance" | "time";
}

interface PowerStream extends Stream {
    data: number[];
}


interface TokenResponseData {
    token_type: string;
    access_token: string;
    expires_at: string;
    expires_in: string;
    refresh_token: string;
}

interface PolylineMap {
    id: string;
    polyline: string;
    summary_polyline: string;
}

interface SummaryActivity {
    id: number;
    name: string;
    start_date_local: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    sport_type: SportType;
    workout_type: number | null;
    map: PolylineMap;
    average_speed: number;
    max_speed: number;
    average_watts: number;
    device_watts: boolean;
    max_watts: number;
    weighted_average_watts: number | null;
}

export interface Activity {
    key: string;
    name: string;
    localDate: string;
    distance: string;
    movingTime: number;
    elapsedTime: number;
    sportType: SportType;
    polyline: string;
    averageSpeed: string;
    maxSpeed: string;
    averageWatts: number | null;
    maxWatts: number | null;
    weightedAverageWatts: number | null;
}


function getTokenParameters() {
    const params = new URLSearchParams();
    params.append('client_id', process.env.STRAVA_CLIENT_ID!)
    params.append('client_secret', process.env.STRAVA_CLIENT_SECRET!)
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', process.env.STRAVA_REFRESH_TOKEN!)
    return params;
}


async function getToken(): Promise<string> {
    const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
        method: "POST",
        body: getTokenParameters(),
    });

    const data: TokenResponseData = await response.json();
    return data.access_token;
}

async function getStravaActivities(): Promise<SummaryActivity[]> {
    const token = await getToken();
    const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
        headers: {Authorization: `Bearer ${token}`}
    });
    const data = await response.json();
    return (data as SummaryActivity[]);
}

function stravaActivityToActivity(activity: SummaryActivity): Activity {
    const speedToKm = (speed: number) => speed * 3600 / 1000;

    return {
        key: `${activity.name}-${activity.start_date_local}`,
        name: activity.name,
        localDate: activity.start_date_local,
        movingTime: activity.moving_time,
        sportType: activity.sport_type,
        polyline: activity.map.summary_polyline,
        distance: `${speedToKm(activity.distance).toFixed(1)} km`,
        averageSpeed: `${speedToKm(activity.average_speed).toFixed(1)} km/h`,
        maxSpeed: `${speedToKm(activity.max_speed).toFixed(1)} km/h`,
        averageWatts: activity.device_watts ? activity.average_watts : null,
        weightedAverageWatts: activity.device_watts ? activity.weighted_average_watts : null,
        elapsedTime: activity.elapsed_time,
        maxWatts: activity.device_watts ? activity.max_watts : null,
    }
}

export async function getActivities(): Promise<Activity[]> {
    if (process.env.STRAVA_USE_DEV_DATA === "1") {
        const { DEV_DATA} = require("@/lib/strava/data/dev-data");
        return new Promise<Activity[]>((resolve, _) => {
            resolve(DEV_DATA);
        });
    }
    const stravaActivities = await getStravaActivities();
    console.log("------")

    console.log(JSON.stringify(stravaActivities))
    console.log("------")
    return Array.from(stravaActivities).map(sa => stravaActivityToActivity(sa))
}