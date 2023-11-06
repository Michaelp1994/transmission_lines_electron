import styled from "styled-components";
import React from "react";
import geometries from "@/assets/geometries.json";
interface Props {}

const GeometriesTable: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {geometries.map((geometry) => {
            return (
              <tr key={geometry.id}>
                <td>{geometry.id}</td>
                <td>{geometry.name}</td>
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
export default GeometriesTable;
