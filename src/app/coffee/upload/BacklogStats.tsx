import {Bean} from "@/types/coffee/bc";
import {sortFnAsc} from "@/utils/sort";

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
    const diff = now - date;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} days`;
}

function getDateString(date: Date) {
    return date.toLocaleDateString("nl-NL", {
        timeZone: "UTC",
        minute: "2-digit",
        hour: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
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
        <div className={"mb-4"}>
            <h2 className={"text-2xl font-semibold mb-2"}>{props.label}</h2>
            <div className={"overflow-x-auto mb-4 whitespace-nowrap"}>
                <table className={"w-full text-sm text-left text-gray-900 dark:text-gray-100"}>
                    <thead className={"text-xs text-gray-900 dark:text-gray-100 uppercase bg-gray-50 dark:bg-slate-900"}>
                    <tr>
                        <th scope={"col"} className={"px-2 py-3 w-80"}>Name</th>
                        <th scope={"col"} className={"font-bold px-2"}>Roaster</th>
                        <th scope={"col"} className={"font-bold px-2"}>Roasting date</th>
                        <th scope={"col"} className={"font-bold px-2"}>Age</th>
                        <th scope={"col"} className={"font-bold px-2"}>Weight</th>
                        <th scope={"col"} className={"font-bold px-2"}>Consumed</th>
                    </tr>
                    </thead>

                    <tbody>
                    {beans.map(bean => (
                            <tr key={bean.config.uuid} className={"border-b border-slate-100 dark:border-gray-500"}>
                                <td className="px-2 py-2 font-medium whitespace-nowrap">
                                    {bean.name}
                                </td>
                                <td className={"p-2"}>
                                    {bean.roaster}
                                </td>
                                <td className={"p-2"}>
                                    {getDateString(new Date(bean.roastingDate))}
                                </td>
                                <td className={"p-2"}>
                                    {getAge(bean.roastingDate)}
                                </td>
                                <td className={"p-2"}>
                                    {`${bean.weight || "-"} gr`}
                                </td>
                                <td className={"p-2"}>
                                    {`${props.usage[bean.name] || "-"} gr`}
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}