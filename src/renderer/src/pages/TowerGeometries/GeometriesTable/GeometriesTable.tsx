import styled from "styled-components";
import React from "react";
import geometries from "@shared/geometries.json";
import BaseTable from "@/components/BaseTable";
interface Props {}

const GeometriesTable: React.FC<Props> = (props) => {
  const columns = [
    {
      title: "Name",
      key: "name",
    },
  ];
  return (
    <Wrapper>
      <BaseTable data={geometries} columns={columns} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default GeometriesTable;
