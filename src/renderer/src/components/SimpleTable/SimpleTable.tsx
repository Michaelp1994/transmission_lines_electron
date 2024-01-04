import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
`;
export const TableHead = styled.thead`
    text-align: left;
    & tr th {
        padding: 16px;
    }
    & tr th {
        text-align: center;
    }
    & tr th:last-child {
        text-align: right;
    }
`;
export const TableBody = styled.tbody`
    & tr td {
        padding: 8px;
    }
    & tr td:first-child {
        text-align: center;
    }
    & tr td:last-child {
        text-align: right;
    }
`;

export const TableFooter = styled.tfoot``;
