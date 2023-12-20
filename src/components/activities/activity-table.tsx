import {Activity} from "@/lib/strava/types";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface Props {
  activities: Activity[];
}

export default function ActivityTable(props: Props) {
  return (
    <Table className={"whitespace-nowrap"}>
      <TableCaption>My activities are automatically synced and summaries can be found on the activities page</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Activity type</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Average speed</TableHead>
          <TableHead>Max speed</TableHead>
          <TableHead>Normalised power</TableHead>
          <TableHead>Max power</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.activities.map(activity => (
          <TableRow key={activity.key}>
            <TableCell>{activity.name}</TableCell>
            <TableCell>{activity.sportType}</TableCell>
            <TableCell>{activity.elapsedTime}</TableCell>
            <TableCell>{activity.averageSpeed}</TableCell>
            <TableCell>{activity.maxSpeed || "-"}</TableCell>
            <TableCell>{activity.weightedAverageWatts}</TableCell>
            <TableCell>{activity.maxWatts || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}