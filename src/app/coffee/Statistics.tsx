interface Props {
    brews: number;
    countries: number;
    roasters: number;
}

interface CardProps {
    title: string;
    count: number;
}

function Card(props: CardProps) {
    return (
        <div className={"flex flex-col gap-2 items-center bg-gradient-to-tr from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-150 dark:from-slate-900 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-800 border border-slate-600/25 dark:border-slate-100/25 rounded-2xl px-6 py-8"}>
            <p className={""}>{props.title}</p>
            <p className={"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"}>{props.count}</p>
        </div>
    )
}

export default function Statistics(props: Props) {
    return (
        <div className={"grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 px-0 md:px-8 mb-8"}>
            <Card title={"Brews"} count={props.brews} />
            <Card title={"Roasters"} count={props.countries} />
            <Card title={"Countries"} count={props.countries} />
        </div>
    );
}