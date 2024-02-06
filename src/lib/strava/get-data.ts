import {Activity, SummaryActivity, TokenResponseData} from "@/lib/strava/types";
import {stravaActivityToActivity} from "@/lib/strava/utils";


/**
 * Build URLSearchParams from environment variables
 */
function getTokenParameters(): URLSearchParams {
  const params = new URLSearchParams();
  params.append('client_id', process.env.STRAVA_CLIENT_ID!)
  params.append('client_secret', process.env.STRAVA_CLIENT_SECRET!)
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', process.env.STRAVA_REFRESH_TOKEN!)
  return params;
}

/**
 * Retrieve token from Strava's oauth endpoint
 */
async function getToken(): Promise<string> {
  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    body: getTokenParameters(),
  });

  const data: TokenResponseData = await response.json();
  return data.access_token;
}

/**
 * Get Strava summary activities from the API
 */
async function getStravaActivities(): Promise<SummaryActivity[]> {
  const token = await getToken();
  const response = await fetch("https://www.strava.com/api/v3/athlete/activities", {
    headers: {Authorization: `Bearer ${token}`},
    next: { revalidate: 3600 },
  });

  console.log(`received strava response: ${response.statusText}`);

  const data = await response.json();

  return (data as SummaryActivity[]);
}

/**
 * Get Strava activities, mapped to an array of presentable Activity data object
 */
export async function getActivities(): Promise<Activity[]> {
  if (process.env.STRAVA_USE_DEV_DATA === "1") {
    const { DEV_DATA} = require("@/lib/strava/data/dev-data");
    return new Promise<Activity[]>((resolve, _) => {
      resolve(DEV_DATA);
    });
  }
  console.log("retrieving strava activities");
  const stravaActivities = await getStravaActivities();
  console.log(`retrieved ${stravaActivities.length} activities`);
  return Array.from(stravaActivities).map(sa => stravaActivityToActivity(sa))
}