"use client"

import ProgressBar from "@/components/progress-bar";
import {useState} from "react";
import ClickableText from "@/components/clickable-text";
import {Preparation, Mill} from "@/types/coffee/bc";
import {Text, Title} from "@/components/text";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

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
            <>
                <div
                    className={"flex gap-2 justify-between items-center"}>
                    <Text className={"truncate capitalize"}>{name}</Text>
                    <Text>{value}</Text>
                </div>
                <div className={"my-auto"}>
                    <ProgressBar total={total} progress={(value as number)}/>
                </div>

            </>
        )
    });

    const showAll = totalEntries > slicedLength;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {props.label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className={"grid grid-cols-2 gap-x-2 gap-y-1"}>
                    {items}
                </div>
                {showAll && (
                    <div className={"flex justify-end"}>
                        <ClickableText text={slice ? "Show all" : "Collapse"} onClick={() => setSlice(!slice)}/>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
