import styled from "styled-components";

interface Column {
    title: string;
    key: string;
}

interface Props<T> {
    data: T[];
    columns: Column[];
}

export function BaseTable<T>({ data, columns }: Props<T>): JSX.Element {
    return (
        <Wrapper>
            <Table>
                <TableHead>
                    <TableHeadRow>
                        {columns.map((column, index) => {
                            return <td key={index}>{column.title}</td>;
                        })}
                    </TableHeadRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                {columns.map((column, index) => {
                                    return (
                                        <td key={index}>{row[column.key]}</td>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                    <tr></tr>
                </TableBody>
            </Table>
        </Wrapper>
    );
}

const Wrapper = styled.div``;
const Table = styled.table`
    width: 100%;
`;
const TableHead = styled.thead``;
const TableHeadRow = styled.tr`
    & td {
        padding: 8px;
    }
`;
const TableBody = styled.tbody`
    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }
`;
const TableRow = styled.tr`
    & td {
        padding: 8px;
    }
`;
export default BaseTable;
