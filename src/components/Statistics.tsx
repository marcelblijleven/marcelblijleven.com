"use client"

import Image from 'next/image';
import {MouseEvent, useCallback, useEffect, useState} from "react";
import Card from "@/components/Card";


interface Props {
    brews: number;
    countries: number;
    roasters: number;
}

interface StatsProps {
    title: string;
    count: number;
    onClick: (event: MouseEvent<HTMLElement>) => void;
}

function Stats(props: StatsProps) {
    return (
        <Card onClick={props.onClick}>
            <div className={"flex flex-col items-center pointer-events-none select-none"}>
                <p className={""}>{props.title}</p>
                <p className={"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"}>{props.count}</p>
            </div>
        </Card>

    )
}

export default function Statistics(props: Props) {
    const [sequence, setSequence] = useState<number[]>([]);
    const [showWowee, setShowWowee] = useState<boolean>(false);

    const updateSequence = useCallback((n: number) => {
        const expectedSequence = [0, 2, 1];
        const newSequence = [...sequence, n];
        const index = newSequence.length - 1;

        if (expectedSequence[index] !== newSequence[index]) {
            setSequence([]);
            return;
        }

        if (expectedSequence.length === newSequence.length) {
            if (newSequence.every((value, idx) => value === expectedSequence[idx])) {
                setSequence([]);
                setShowWowee(true);
                return;
            }
        }

        setSequence(newSequence);
    }, [sequence]);

    const onLeftClick = useCallback((event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        updateSequence(0);
    }, [updateSequence]);
    const onMiddleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        updateSequence(1);
    }, [updateSequence]);
    const onRightClick = useCallback((event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        updateSequence(2);
    }, [updateSequence]);

    if (showWowee) {
        return (
            <div
                className={"gradient-radial from-slate-100 via-slate-500 to-slate-100 grid grid-cols-1 place-items-center mb-6"}
                onClick={() => setShowWowee(false)}
            >
                <div className={"relative"}>
                    <div className={"absolute inset-4 bg-sky-500 rounded-4xl h-3/4 blur-3xl"}/>
                    <Image className={"relative left-2 md:left-3"} src={"/wowee.svg"} alt={"wowee"} width={300} height={300}/>

                </div>
            </div>
        )
    }

    return (
        <div className={"grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 px-0 md:px-8 mb-8"}>
            <Stats onClick={onLeftClick} title={"Brews"} count={props.brews}/>
            <Stats onClick={onMiddleClick} title={"Roasters"} count={props.countries}/>
            <Stats onClick={onRightClick} title={"Countries"} count={props.countries}/>
        </div>
    );
}
