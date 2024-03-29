import {format} from "date-fns";

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {getAge, getDateString} from "@/lib/dates";
import {Bean} from "beanconqueror";

export interface BacklogTableProps {
    beans: Bean[];
    usage: Record<string, number>;
}

function getCaption(): string {
    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss O");
    return `My backlog, updated at ${now}`
}

const BacklogTable = (props: BacklogTableProps) => {
  if (props.beans.length === 0) {
    return (
      <div className="w-full p-2 text-center text-muted-foreground">
        Oops, I ran out of coffee 😅
      </div>
    )
  }
  return (
    <Table className={"whitespace-nowrap"}>
      <TableCaption>{getCaption()}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Roaster</TableHead>
          <TableHead>Roasting date</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Consumed</TableHead>
          <TableHead>Available</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.beans.map(bean => {
          const usage = props.usage[bean.config.uuid] || 0;
          const remaining = !!bean.weight ? (bean.weight - usage).toFixed(2) : "-";

          return (
            <TableRow key={bean.config.uuid}>
              <TableCell>{bean.name}</TableCell>
              <TableCell>{bean.roaster}</TableCell>
              <TableCell>{getDateString(bean.roastingDate ? new Date(bean.roastingDate): null, false)}</TableCell>
              <TableCell>{getAge(bean.roastingDate)}</TableCell>
              <TableCell>{bean.weight ? `${bean.weight.toFixed(2)} gr`: "-"}</TableCell>
              <TableCell>{props.usage[bean.config.uuid] ? `${props.usage[bean.config.uuid].toFixed(2)} gr`: "-"}</TableCell>
              <TableCell>{bean.weight ? `${remaining} gr` : "-"}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default BacklogTable
