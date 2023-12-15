import styled from "styled-components";

export const Card = styled.div`
    border-radius: 16px;
    border: 1px black solid;
`;

export const CardHeader = styled.div`
    background-color: blue;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    color: white;
    padding: 10px;
    padding-inline: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const CardTitle = styled.div``;
export const CardHeaderActions = styled.div`
    display: flex;
    gap: 8px;
`;
export const CardContent = styled.div`
    padding: 10px;
`;
