import styled from "styled-components";
import React from "react";
import conductors from "@/assets/conductorTypes.json";
import BaseTable from "@/components/BaseTable";
interface Props {}

const ConductorTable: React.FC<Props> = (props) => {
  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Diameter (mm)",
      key: "diameter_conductor",
    },
    {
      title: "AC Resistance",
      key: "ac_resistance_75",
    },
    {
      title: "GMR (mm)",
      key: "gmr",
    },
  ];
  return (
    <Wrapper>
      <BaseTable data={conductors} columns={columns} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default ConductorTable;
