import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store";
import Routes from "@/router/routes";
import { useSolveCircuitQuery } from "@/services/api";

interface Props {}

const GenerateResults: React.FC<Props> = () => {
    const sources = useAppSelector((state) => state.sources);
    const transmissionLines = useAppSelector(
        (state) => state.transmissionLines
    );
    const { data, error, isLoading } = useSolveCircuitQuery({
        sources,
        transmissionLines,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error || !data) {
        console.log(error);
        return <div>Theres an error!</div>;
    }

    return (
        <Wrapper>
            <Link to={Routes.PROJECT.path}>Go Back</Link>
            <Table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Amps (A)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row[0]}>
                            <td>{row[0]}</td>
                            <td>{parseInt(row[1], 10)}</td>
                        </tr>
                    ))}
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
