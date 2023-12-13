import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { Link } from "react-router-dom";

interface Props {}

const GenerateResults: React.FC<Props> = (props) => {
  const sources = useAppSelector((state) => state.sources.sources);
  const transmissionLines = useAppSelector(
    (state) => state.transmissionLines.transmissionLines
  );
  const [results, setResults] = useState([]);
  useEffect(() => {
    const channel = new MessageChannel();
    const port1 = channel.port1;
    const port2 = channel.port2;
    window.electron.ipcRenderer.postMessage("send-port", null, [port1]);
    port2.postMessage({ sources, transmissionLines });
    port2.onmessage = (event) => {
      setResults(event.data);
    };
    return () => {
      port2.close();
      port1.close();
    };
  }, []);

  return (
    <Wrapper>
      <Link to="/">Go Back</Link>
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
