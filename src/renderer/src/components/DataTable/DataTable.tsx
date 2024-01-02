import styled from "styled-components";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface Props<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
}

const DataTable = <T,>({ data, columns }: Props<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <Wrapper>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </TableBody>
                <TableFooter>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </TableFooter>
            </Table>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
const Table = styled.table`
    width: 100%;
`;
const TableHead = styled.thead`
    text-align: left;
    & tr th {
        padding: 16px;
    }
    & tr th:last-child {
        text-align: right;
    }
`;
const TableBody = styled.tbody`
    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    & tr td {
        padding: 8px;
    }
    & tr td:last-child {
        text-align: right;
    }
`;

const TableFooter = styled.tfoot``;
export default DataTable;
