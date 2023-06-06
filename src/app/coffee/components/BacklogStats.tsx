import {Bean} from "@/types/coffee/bc";
import {sortFnAsc} from "@/utils/sort";
import {stringToDate} from "@/utils/dates";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BacklogTable from "@/app/coffee/components/BacklogTable";
import {Geolocation} from "@/lib/geodata";
import Globe from "@/components/globe/globe-client";

interface BacklogStatsProps {
    label: string;
    beans: Mapping<Bean>;
    usage: Mapping<number>;
    // countries: Mapping<Geolocation>;
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
            <CardHeader>
                <CardTitle>{props.label}</CardTitle>
            </CardHeader>
            <CardContent>
                <BacklogTable beans={beans} usage={props.usage} />
            </CardContent>
        </Card>
    )
}