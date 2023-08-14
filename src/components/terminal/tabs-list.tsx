import * as Tabs from "@radix-ui/react-tabs";

export interface TabsListProps {
    tabs: Array<string>;
}

export default function TabsList(props: TabsListProps) {
    return (
        <Tabs.TabsList className={"flex items-end h-[28px] px-2 bg-orange-200/50 dark:bg-slate-700/50 border-b border-orange-300/50 dark:border-slate-800"}>
            {props.tabs.map(tab => (
                <Tabs.Trigger
                    key={tab}
                    className={'px-2 h-[24px] data-[state="active"]:rounded-t-lg data-[state="active"]:border-x data-[state="active"]:border-t data-[state="active"]:border-orange-300/50 data-[state="active"]:dark:border-slate-800/50  data-[state="active"]:bg-orange-200 data-[state="active"]:dark:bg-slate-700'}
                    value={tab}>{tab}</Tabs.Trigger>
            ))}
        </Tabs.TabsList>
    )
}