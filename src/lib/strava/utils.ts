import {type Activity, type SummaryActivity} from "@/lib/strava/types";
import {getActivities as getStravaActivities} from "@/lib/strava/get-data";

/**
 * Map a SummaryActivity to an Activity that can be displayed on the website
 * @param activity the activity as provided by the Strava API
 */
export function stravaActivityToActivity(activity: SummaryActivity): Activity {
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

/**
 * Retrieve activities and slice the returning array to meet the provided limit
 * @param limit
 */
export async function getActivities(limit: number): Promise<Activity[]> {
  return (await getStravaActivities()).sort((a, b) => {
    return new Date(b.localDate).getTime() - new Date(a.localDate).getTime();
  }).slice(0, limit);
}