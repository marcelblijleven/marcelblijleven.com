import {Brew} from "@/types/coffee/brews";

function getDateString(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("nl-NL", {
        timeZone: "UTC",
        minute: "2-digit",
        hour: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function getDuration(duration: number): string {
    if (duration === 0) {
        return "-"
    }
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

type TableProps = {
    brews: Brew[];

}

export default function Table({ brews }:TableProps) {
    const tdClass = "px-2 py-2 whitespace-nowrap"
    return (
        <div className={"overflow-x-auto"}>
            <table className={"w-full text-sm text-left text-gray-900 dark:text-gray-100"}>
                <thead className={"text-xs text-gray-900 dark:text-gray-100 uppercase bg-gray-50 dark:bg-slate-900"}>
                    <tr>
                        <th scope={"col"} className={"px-2 py-3 w-80"}>Name</th>
                        <th scope={"col"} className={"px-2 py-3"}>Date</th>
                        <th scope={"col"} className={"px-2 py-3"}>Method</th>
                        <th scope={"col"} className={"px-2 py-3"}>Grinder</th>
                        <th scope={"col"} className={"px-2 py-3"}>Grind setting</th>
                        <th scope={"col"} className={"px-2 py-3"}>In/Out (ratio)</th>
                        <th scope={"col"} className={"px-2 py-3"}>Brew duration</th>
                    </tr>
                </thead>

                <tbody>
                {brews.map(brew => (
                        <tr key={brew.uuid} className={"border-b border-slate-100 dark:border-gray-500"}>
                            <td className="px-2 py-2 font-medium whitespace-nowrap">
                                {brew.name}
                            </td>
                            <td className={tdClass}>
                                {getDateString(brew.timestamp)}
                            </td>
                            <td className={tdClass}>
                                {brew.preparationMethod}
                            </td>
                            <td className={tdClass}>
                                {brew.grinder}
                            </td>
                            <td className={tdClass}>
                                {brew.grindSetting}
                            </td>
                            <td className={tdClass}>
                                {brew.ratioString}
                            </td>
                            <td className={tdClass}>
                                {getDuration(brew.duration || 0)}
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    )
}