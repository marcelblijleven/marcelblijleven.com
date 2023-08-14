export default function BottomBar(props: { file: string }) {
    return (
        <div
            className={"flex justify-between items-center pl-2 h-[30px] w-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm"}>
            <div>NORMAL</div>
            <div className={"rounded-l-full pl-4 pr-2 gap-1 flex items-center bg-sky-200 dark:bg-sky-900 h-full"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-[18px] h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                {props.file}
            </div>
        </div>
    )
}