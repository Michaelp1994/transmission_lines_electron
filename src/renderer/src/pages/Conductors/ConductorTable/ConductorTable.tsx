import styled from "styled-components";
import React, { useEffect, useState } from "react";
import BaseTable from "@/components/BaseTable";
interface Props {}

const ConductorTable: React.FC<Props> = (props) => {
    const [conductorTypes, setConductorTypes] = useState([]);
    useEffect(() => {
        async function getConductors() {
            const conductors = await window.api.getConductors();
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
            key: "coreDiameter",
        },
        {
            title: "AC Resistance",
            key: "acResistance75",
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
