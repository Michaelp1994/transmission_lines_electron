import styled from "styled-components";
import React from "react";
import ConductorTable from "@/components/ConductorTable";

interface Props {}

const Conductors: React.FC<Props> = () => {
  return (
    <Wrapper>
      <ConductorTable />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default Conductors;
