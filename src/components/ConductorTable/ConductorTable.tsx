import styled from "styled-components";
import React from "react";
import conductors from "@/assets/conductors.json";
interface Props {}

const ConductorTable: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Diameter (mm)</td>
            <td>AC Resistance</td>
            <td>GMR (mm)</td>
          </tr>
        </thead>
        <tbody>
          {conductors.map((conductor) => {
            return (
              <tr key={conductor.id}>
                <td>{conductor.id}</td>
                <td>{conductor.name}</td>
                <td>{conductor.diameter_conductor}</td>
                <td>{conductor.ac_resistance_75}</td>
                <td>{conductor.gmr}</td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Table = styled.table`
  width: 100%;
`;
export default ConductorTable;
