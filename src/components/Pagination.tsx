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
            <div className={"flex"}>
                <Button
                    text={"Previous page"}
                    rounded={"left"}
                    disabled={currentPage - 1 <= 0}
                    onClick={onClickPrevious}
                />
                <Button
                    text={"Next page"}
                    rounded={"right"}
                    disabled={currentPage + 1 > numberOfPages}
                    onClick={onClickNext}
                />
            </div>
            <p>{`Page ${currentPage} of ${numberOfPages}`}</p>
        </div>
    )
}

export function paginate<T>(items: T[], pageNumber: number, pageSize: number): T[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
}