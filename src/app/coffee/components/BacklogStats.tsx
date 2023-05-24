import {Bean} from "@/types/coffee/bc";
import {sortFnAsc} from "@/utils/sort";
import {getDateString} from "@/utils/dates";
import { Title} from "@/components/text";
import {Table, TableBody, TableRow, TableCell, TableHead } from "@/components/Table"
import {TableHeadCell as TableHeaderCell} from "@/components/Table"
import Card from "@/components/Card";

interface BacklogStatsProps {
    label: string;
    beans: Mapping<Bean>;
    usage: Mapping<number>;
}

function getAge(dateStr: string | null): string {
    if (!dateStr) {
        return "-";
    }
    const now = Date.now();
    const date = new Date(dateStr);
    const diff = now - date.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} days`;
}



function stringToDate(value: string | undefined): Date | null {
    if (value === undefined || value === "") {
        return null;
    }

    return new Date(value);
}

export default function BacklogStats(props: BacklogStatsProps) {
    const beans = (
        Object.entries<Bean>(props.beans)
            .map(([_, bean]) => bean)
            .filter(bean => !bean.finished)
            .sort((a, b) => {
                return sortFnAsc(stringToDate(a.roastingDate), stringToDate(b.roastingDate))
            })
    );

    return (
        <Card>
            <Title>{props.label}</Title>
            <Table className={""}>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Roaster</TableHeaderCell>
                        <TableHeaderCell>Roasting date</TableHeaderCell>
                        <TableHeaderCell>Age</TableHeaderCell>
                        <TableHeaderCell>Weight</TableHeaderCell>
                        <TableHeaderCell>Consumed</TableHeaderCell>
                        <TableHeaderCell>Available</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {beans.map(bean => {
                        const usage = props.usage[bean.config.uuid] || 0;
                        const remaining = bean.weight - usage;
                        return (
                            <TableRow key={bean.config.uuid}>
                                <TableCell>{bean.name}</TableCell>
                                <TableCell>{bean.roaster}</TableCell>
                                <TableCell>{getDateString(bean.roastingDate ? new Date(bean.roastingDate): null, false)}</TableCell>
                                <TableCell>{getAge(bean.roastingDate)}</TableCell>
                                <TableCell>{bean.weight ? `${bean.weight} gr`: "-"}</TableCell>
                                <TableCell>{props.usage[bean.config.uuid] ? `${props.usage[bean.config.uuid]} gr`: "-"}</TableCell>
                                <TableCell>{bean.weight ? `${remaining} gr` : "-"}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Card>
            // <h2 className={"text-2xl font-semibold mb-2"}>{props.label}</h2>
            // <div className={"w-full overflow-x-auto mb-4 whitespace-nowrap"}>
            //     <table className={"text-sm text-left text-gray-900 dark:text-gray-100"}>
            //         <thead className={"text-xs text-gray-900 dark:text-gray-100 uppercase bg-gray-50 dark:bg-slate-900"}>
            //         <tr>
            //             <th scope={"col"} className={"px-2 py-3"}>Name</th>
            //             <th scope={"col"} className={"font-bold px-2"}>Roaster</th>
            //             <th scope={"col"} className={"font-bold px-2"}>Roasting date</th>
            //             <th scope={"col"} className={"font-bold px-2"}>Age</th>
            //             <th scope={"col"} className={"font-bold px-2"}>Weight</th>
            //             <th scope={"col"} className={"font-bold px-2"}>Consumed</th>
            //             <th scope={"col"} className={"font-bold px-2"}>Available</th>
            //         </tr>
            //         </thead>
            //
            //         <tbody>
            //         {beans.map(bean => {
            //             const usage = props.usage[bean.config.uuid] || 0;
            //             const remaining = bean.weight - usage;
            //
            //          return (
            //
            //                 <tr key={bean.config.uuid} className={"border-b border-slate-100 dark:border-gray-500"}>
            //                     <td className="px-2 py-2 font-medium">
            //                         {bean.name}
            //                     </td>
            //                     <td className={"p-2"}>
            //                         {bean.roaster}
            //                     </td>
            //                     <td className={"p-2"}>
            //                         {getDateString(bean.roastingDate ? new Date(bean.roastingDate): null, false)}
            //                     </td>
            //                     <td className={"p-2"}>
            //                         {getAge(bean.roastingDate)}
            //                     </td>
            //                     <td className={"p-2"}>
            //                         {bean.weight ? `${bean.weight} gr`: "-"}
            //                     </td>
            //                     <td className={"p-2"}>
            //                         {props.usage[bean.config.uuid] ? `${props.usage[bean.config.uuid]} gr`: "-"}
            //                     </td>
            //                     <td className={"p-2"}>
            //                         {bean.weight ? `${remaining} gr` : "-"}
            //                     </td>
            //                 </tr>
            //             )}
            //         )}
            //         </tbody>
            //     </table>
            // </div>
    )
}