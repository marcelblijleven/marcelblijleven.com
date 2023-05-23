"use client"

import ProgressBar from "@/components/ProgressBar";
import {useState} from "react";
import ClickableText from "@/components/ClickableText";
import {Preparation, Mill} from "@/types/coffee/bc";

interface Mapping<T> {
    [key: string]: T
}

interface Props {
    label: string;
    countable: [string, number][];
    mapping?: Mapping<Preparation | Mill>;
}

export default function CountableStats(props: Props) {
    const [slice, setSlice] = useState<boolean>(true);
    const slicedLength = 10;
    const totalEntries = Object.keys(props.countable).length;

    const entries = slice ? props.countable.slice(0, slicedLength) : props.countable;
    const total = entries.reduce((prev, [_, value]) => prev + (value as number), 0);
    const items = entries.map(([key, value]) => {
        const name = props.mapping?.[key].name || key;

        return (
            <div key={key} className={"flex gap-2 items-center mb-1 hover:bg-slate-200 dark:hover:bg-slate-800"}>
                <div
                    className={"flex w-1/2 gap-2 justify-between text-sm font-semibold text-gray-900 dark:text-gray-100"}>
                    <p className={"truncate capitalize"}>{name}</p>
                    <p>{value}</p>
                </div>
                <div className={"w-1/2"}>
                    <ProgressBar total={total} progress={(value as number)}/>
                </div>
            </div>
        )
    });

    const showAll = totalEntries > slicedLength;

    return (
        <div>
            <h2 className={"text-2xl font-semibold mb-2"}>{props.label}</h2>
            {items}
            {showAll && (
                <div className={"flex justify-end"}>
                    <ClickableText text={slice ? "Show all" : "Collapse"} onClick={() => setSlice(!slice)}/>
                </div>
            )}
        </div>
    )
}
