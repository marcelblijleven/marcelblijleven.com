export interface MenuBarProps {
    title: string;
    onClose?: () => void;
    onMinimise?: () => void;
    onZoom?: () => void;
}

export default function MenuBar(props: MenuBarProps) {
    return (
        <div className={"flex p-2 justify-between items-center h-[30px] w-full bg-slate-200 dark:bg-slate-600 text-slate-600"}>
            <div className={"flex gap-2 group"}>
            <button disabled={!props.onClose} onClick={props.onClose} className={"flex items-center justify-center rounded-full bg-[#FF605C] h-[12px] w-[12px] disabled:bg-gray-500 disabled:text-gray-500"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="hidden group-hover:block disabled:hidden w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <button disabled={!props.onMinimise} onClick={props.onMinimise} className={"flex items-center justify-center rounded-full bg-[#FFBD44] h-[12px] w-[12px] disabled:bg-gray-500 disabled:text-gray-500"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="hidden group-hover:block disabled:hidden w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"/>
                </svg>
            </button>
            <button disabled={!props.onZoom} onClick={props.onZoom} className={"flex items-center justify-center rounded-full bg-[#00CA4E] h-[12px] w-[12px] disabled:bg-gray-500 disabled:text-gray-500"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="hidden group-hover:block disabled:hidden w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </button>
            </div>
            <span className={"text-slate-500 dark:text-slate-300"}>{props.title}</span>
            <div className={"w-[52px]"} />
        </div>
    )
}