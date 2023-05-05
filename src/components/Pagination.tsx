import {useCallback, MouseEvent} from "react";
import Button from "@/components/Button";

interface Props {
    total: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({total, pageSize, currentPage, onPageChange}: Props) {
    const numberOfPages = Math.ceil(total / pageSize);
    const onClickPrevious = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (currentPage - 1 > 0) onPageChange(currentPage - 1);
    }, [currentPage, onPageChange]);
    const onClickNext = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (currentPage + 1 <= numberOfPages) onPageChange(currentPage + 1);
    }, [currentPage, numberOfPages, onPageChange]);

    if (numberOfPages === 1) {
        return null;
    }

    return (
        <div className={"flex w-full justify-between items-center m-2"}>
            <div className={"flex items-baseline gap-2 md:gap-0"}>
                <button
                    type={"button"}
                    disabled={currentPage - 1 <= 0}
                    className={"text-slate-900 dark:text-slate-100 disabled:text-gray-500 disabled:pointer-events-none p-2 rounded-l-lg bg-gradient-to-tr from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-150 dark:from-slate-900 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-800 border border-slate-600/25 dark:border-slate-100/25"}
                    onClick={onClickPrevious}
                >
                    Previous page
                </button>
                <p className={"md:hidden"}>{`Page ${currentPage} of ${numberOfPages}`}</p>


                <button
                    type={"button"}
                    disabled={currentPage + 1 > numberOfPages}
                    onClick={onClickNext}
                    className={"text-slate-900 dark:text-slate-100 disabled:text-gray-500 disabled:pointer-events-none p-2 rounded-r-lg bg-gradient-to-tr from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 dark:from-slate-900 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-800 border border-slate-600/25 dark:border-slate-100/25"}
                >
                    Next page
                </button>


            </div>
            <p className={"hidden md:block"}>{`Page ${currentPage} of ${numberOfPages}`}</p>
        </div>
    )
}

export function paginate<T>(items: T[], pageNumber: number, pageSize: number): T[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
}