import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Mill, Preparation} from "@/types/beanconqueror";
import {Mapping} from "@/types";

const getWidth = (value: number, total: number) => `${(value / (total || 0)) * 100}%`

export interface TopNComponentProps {
    label: string;
    description: string;
    items: any[];
    mapping?: Mapping<Preparation | Mill>;
}

export default function TopNComponent (props: TopNComponentProps) {
    const total = props.items.reduce((prev, [_, value]) => prev + (value as number), 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.label}</CardTitle>
                <CardDescription className={"h-8"}>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {props.items.slice(0, 10).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between gap-2">
                        <div className="relative flex items-center w-full">
                            <span className="flex items-center h-10 px-2 z-10 text-sm capitalize">{props.mapping?.[key].name || key}</span>
                            <div
                                className="absolute origin-left h-8 bg-blue-300 dark:bg-blue-700"
                                style={{width: getWidth(value, total)}}
                            />
                        </div>
                        <p className="text-sm">{value}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}