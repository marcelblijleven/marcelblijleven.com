import {format} from "date-fns";

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {sortFnDesc} from "@/lib/sort";
import {Mapping} from "@/types";
import {Bean, Brew, Mill, Preparation} from "@/types/beanconqueror";
import {ReactNode} from "react";
import Rating from "@/components/coffee/rating";

export interface BrewsTableProps {
    brews: Brew[];
    beanMapping: Mapping<Bean>;
    grinderMapping: Mapping<Mill>;
    preperationMapping: Mapping<Preparation>;
    limit?: number;
}

function getCaption(limit: number): string {
    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss O")
    return `My last ${limit} brews, updated at ${now}`
}

function getTime(duration: number): string {
    if (!duration) {
        return "-";
    }

    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function getRating(rating: number): string | ReactNode {
    if (!rating) {
        return "-";
    }

    return (
        <Rating rating={rating} />
    )
}

export default function BrewsTable(props: BrewsTableProps) {
    const brews = props.brews.sort((a, b) => (
        sortFnDesc(a.config.unix_timestamp, b.config.unix_timestamp)
    )).slice(0, 10);

    return (
        <Table className={"whitespace-nowrap"}>
            <TableCaption>{getCaption(props.limit || 10)}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Coffee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Preparation method</TableHead>
                    <TableHead>Grinder</TableHead>
                    <TableHead>Grind size</TableHead>
                    <TableHead>Grams in</TableHead>
                    <TableHead>Grams out</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Bloom time</TableHead>
                    <TableHead>Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {brews.map(brew => {
                    const name = props.beanMapping[brew.bean].name;
                    const time = format(new Date(brew.config.unix_timestamp * 1000), "yyyy-MM-dd HH:mm:ss O")
                    const preparationMethod = props.preperationMapping[brew.method_of_preparation].name;
                    const grinder = props.grinderMapping[brew.mill].name;

                    return (
                        <TableRow key={brew.config.uuid}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{time}</TableCell>
                            <TableCell>{preparationMethod}</TableCell>
                            <TableCell>{grinder}</TableCell>
                            <TableCell>{brew.grind_size}</TableCell>
                            <TableCell>{brew.grind_weight}</TableCell>
                            <TableCell>{brew.brew_quantity}</TableCell>
                            <TableCell>{getTime(brew.brew_time)}</TableCell>
                            <TableCell>{getTime(brew.coffee_blooming_time)}</TableCell>
                            <TableCell>{getRating(brew.rating)}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}