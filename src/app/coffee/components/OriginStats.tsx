import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Globe from "@/components/globe/globe-client";
import {getMarkers} from "@/components/globe/data";

export interface OriginStatsProps {
    countries: [string, number][]
}

const OriginStats = (props: OriginStatsProps) => {
    const markers = getMarkers(props.countries);

    console.log(markers);

    return (
        <Card className={""}>
            <CardHeader>
                <CardTitle>Origins</CardTitle>
                <CardDescription>Interactive visualisation of coffee origins</CardDescription>
            </CardHeader>
            <CardContent>
                <div className={"grid grid-cols-2"}>
                    <Globe markers={markers} />
                    <span>Foo</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default OriginStats;