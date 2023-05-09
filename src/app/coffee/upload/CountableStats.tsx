import ProgressBar from "@/components/ProgressBar";

interface Props {
    label: string;
    countable: Mapping<number>;
}

export default function CountableStats(props: Props) {
    let total = 0;
    const entries = Object.entries<number>(props.countable).map(([key, value]) => {
        total += value;
        return [key, value]
    }).slice(0, 10);

    const items = entries.map(([key, value]) => {
        return (
            <div key={key} className={"flex gap-2 items-center mb-1"}>
                <div className={"flex w-3/12 gap-2 justify-between text-sm font-semibold text-gray-900 dark:text-gray-100"}>
                    <p className={"truncate"}>{key}</p>
                    <p className={""}>{value}</p>
                </div>
                <ProgressBar total={total} progress={(value as number)} />
            </div>
        )
    })

    return (
        <div className={"mb-4"}>
            <h2 className={"text-2xl font-semibold mb-2"}>{props.label}</h2>
            {items}
        </div>
    )
}
