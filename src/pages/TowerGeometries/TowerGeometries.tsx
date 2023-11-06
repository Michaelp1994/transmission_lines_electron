import styled from "styled-components";
import React from "react";
import GeometriesTable from "@/components/GeometriesTable";

interface Props {}

const TowerGeometries: React.FC<Props> = () => {
  return (
    <Wrapper>
      <GeometriesTable />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default TowerGeometries;
