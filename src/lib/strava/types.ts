export enum SportType {
  // AlpineSki,
  // BackcountrySki,
  // Badminton,
  // Canoeing,
  // Crossfit,
  // EBikeRide,
  // Elliptical,
  // EMountainBikeRide,
  // Golf,
  // GravelRide,
  // Handcycle,
  // HighIntensityIntervalTraining,
  Hike,
  // IceSkate,
  // InlineSkate,
  // Kayaking,
  // Kitesurf,
  // MountainBikeRide,
  // NordicSki,
  // Pickleball,
  // Pilates,
  // Racquetball,
  Ride,
  RockClimbing,
  // RollerSki,
  // Rowing,
  Run,
  // Sail,
  Skateboard,
  // Snowboard,
  // Snowshoe,
  // Soccer,
  // Squash,
  // StairStepper,
  // StandUpPaddling,
  // Surfing,
  Swim,
  // TableTennis,
  // Tennis,
  // TrailRun,
  // Velomobile,
  VirtualRide,
  // VirtualRow,
  // VirtualRun,
  Walk,
  WeightTraining,
  // Wheelchair,
  // Windsurf,
  Workout,
  // Yoga
}

export interface Stream {
  original_size: number;
  resolution: "low" | "medium" | "high";
  series_type: "distance" | "time";
}

export type TokenResponseData = {
  token_type: string;
  access_token: string;
  expires_at: string;
  expires_in: string;
  refresh_token: string;
}

export type PolylineMap = {
  id: string;
  polyline: string;
  summary_polyline: string;
}

export type SummaryActivity = {
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

export type Activity = {
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