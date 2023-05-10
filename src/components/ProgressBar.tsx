"use client"

import * as Progress from "@radix-ui/react-progress";
import {useEffect, useState} from "react";

interface Props {
    progress: number;
    total: number;
}

export default function ProgressBar(props: Props) {
    const progressPercentage = (props.progress / props.total) * 100;
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            setProgress(progressPercentage)
        }, 300);
    }, [progressPercentage]);


    return (
        <Progress.Root
            className={"relative overflow-hidden bg-slate-300 dark:bg-slate-700 border dark:border-slate-900 rounded-full w-full h-5 translate-z-0"}
            value={progress}
        >
            <Progress.Indicator
                className={"bg-sky-800 hover:bg-gradient-to-r hover:from-sky-800 w-full h-full transition duration-400 ease-in"}
                style={{transform: `translateX(-${100 - progress}%)`}}
            />
        </Progress.Root>
    )
}