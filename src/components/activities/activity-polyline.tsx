import polyline from "@mapbox/polyline";

export interface ActivityPolylineProps {
    id: string;
    width: number | string;
    height: number;
    margin: {top: number; right: number; bottom: number; left: number;}
    polyline: string;
}

export default function ActivityPolyline(props: ActivityPolylineProps) {
    if (!props.polyline) {
        return <div className={"h-[150px] min-h-[150px]"}/>;
    }

    const decoded = polyline.decode(props.polyline)

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    for (const [i, tuple] of Array.from(decoded.entries())) {
        if (i === 0) {
            minX = tuple[1]
            maxX = tuple[1]
            minY = tuple[0]
            maxY = tuple[0]
        } else {
            minX = Math.min(tuple[1], minX)
            minY = Math.min(tuple[0], minY)
            maxX = Math.max(tuple[1], maxX)
            maxY = Math.max(tuple[0], maxY)
        }
    }

    const mapWidth = maxX - minX + 0.02
    const mapHeight = maxY - minY + 0.02
    const midX = (maxX + minX) / 2
    const midY = (maxY + minY) / 2
    const size = props.height
    const scale = Math.min(size / mapWidth, size / mapHeight)

    const map = (point: [number, number]) => [
        (point[1] - midX) * scale + size / 2,
        (midY - point[0]) * scale + size / 2,
    ];

    return (
        <svg viewBox={[0, 0, 150, 150].join(" ")} width={props.width} height={props.height}>
            <rect x={0} y={0} width={150} height={150} fill={"transparent"} rx={14} ry={14}/>
            <path
                strokeWidth={1} fill={"none"} stroke={"#64748b"}
                d={'M' + decoded.flatMap(map).join(' ')}
            />
        </svg>
    )
}
