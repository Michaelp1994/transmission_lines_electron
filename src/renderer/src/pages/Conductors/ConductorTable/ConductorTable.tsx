import styled from "styled-components";
import React, { useEffect, useState } from "react";
// import conductors from "@shared/conductorTypes.json";
import BaseTable from "@/components/BaseTable";
interface Props {}

const ConductorTable: React.FC<Props> = (props) => {
  const [conductorTypes, setConductorTypes] = useState([]);

  useEffect(() => {
    async function getConductors() {
      const conductors = await window.api.getConductors();
      console.log(conductors);
      setConductorTypes(conductors);
    }
    getConductors();
  }, []);
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
      <BaseTable data={conductorTypes} columns={columns} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default ConductorTable;
