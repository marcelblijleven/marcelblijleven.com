import {forwardRef, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes} from "react";

const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
    (props, ref) => {
        return (
            <div className={"overflow-auto"}>
                <table
                    ref={ref}
                    className={"w-full tabular-nums text-sm font-light text-gray-900 dark:text-gray-100"}
                >
                    {props.children}
                </table>
            </div>
        )
    }
)

const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((props, ref) => {
    return (
        <thead
            ref={ref}
            className={"text-left font-semibold"}>
        {props.children}
        </thead>
    );
});


const TableHeadCell = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>((props, ref) => {
    return (
        <th
            ref={ref}
            className={"sticky whitespace-nowrap font-semibold text-left top-0 p-4"}
        >
            {props.children}
        </th>
    )
});

const TableBody = forwardRef<HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>>((props, ref) => {
    return (

        <tbody
            ref={ref}
            className={"align-top overflow-x-auto divide-y"}
        >
        {props.children}
        </tbody>

    )
});

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>
>((props, ref) => {
   return (
        <tr
            ref={ref}
        >
            {props.children}
        </tr>
   );
});

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>((props, ref) => {
    return (
        <>
            <td
                ref={ref}
                className={"align-middle whitespace-nowrap tabular-nums text-left p-4"}
            >
                {props.children}
            </td>
        </>
    )
})

Table.displayName = "Table";
TableHead.displayName = "TableHead";
TableHeadCell.displayName = "TableHeadCell";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableCell.displayName = "TableCell";

export {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableRow,
    TableCell
}