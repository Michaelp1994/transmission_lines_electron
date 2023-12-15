import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { Link } from "react-router-dom";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const GenerateResults: React.FC<Props> = (props) => {
    const sources = useAppSelector((state) => state.sources.sources);
    const transmissionLines = useAppSelector(
        (state) => state.transmissionLines.transmissionLines
    );
    const [results, setResults] = useState([]);
    useEffect(() => {
        async function generateResults() {
            const results = await window.api.solveCircuit(
                sources,
                transmissionLines
            );
            setResults(results);
        }
        generateResults();
    }, []);

    return (
        <Wrapper>
            <Link to={Routes.HOME.path}>Go Back</Link>
            <Table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Amps (A)</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((row) => {
                        return (
                            <tr key={row[0]}>
                                <td>{row[0]}</td>
                                <td>{parseInt(row[1])}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
const Table = styled.table`
    width: 100%;
    font-size: 20px;
    border-collapse: collapse;
    & th {
        border: 1px solid #ddd;
        padding: 8px;
    }
    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    & tr:hover {
        background-color: #ddd;
    }
    & th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04aa6d;
        color: white;
    }
`;
export default GenerateResults;
