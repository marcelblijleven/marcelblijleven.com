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
        <div className={"flex w-full justify-between items-center my-2"}>
            <div className={"flex justify-between w-full md:w-auto items-baseline gap-2 md:gap-0"}>
                <Button
                    disabled={currentPage - 1 <= 0}
                    onClick={onClickPrevious}
                    label={"Previous page"}
                    variant={"primary"}
                />
                <p className={"md:hidden"}>{`Page ${currentPage} of ${numberOfPages}`}</p>
                <Button
                    disabled={currentPage + 1 > numberOfPages}
                    onClick={onClickNext}
                    label={"Next page"}
                    variant={"primary"}
                />


            </div>
            <p className={"hidden md:block"}>{`Page ${currentPage} of ${numberOfPages}`}</p>
        </div>
    )
}

export function paginate<T>(items: T[], pageNumber: number, pageSize: number): T[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
}