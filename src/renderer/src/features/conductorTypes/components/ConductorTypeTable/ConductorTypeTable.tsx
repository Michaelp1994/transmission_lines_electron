import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createColumnHelper } from "@tanstack/react-table";
import BaseTable from "@/components/BaseTable";
import BaseButton from "@/components/BaseButton";
import ROUTES from "@/router/RoutePathsEnum";

interface Props {}
const columnHelper = createColumnHelper<ConductorType>();

const ConductorTable: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [conductorTypes, setConductorTypes] = useState<ConductorType[]>([]);
    function handleClick(id: number) {
        navigate(ROUTES.EDIT_CONDUCTOR_TYPE.buildPath({ id }));
    }
    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: (info) => <div>{info.renderValue()}</div>,
        }),
        columnHelper.accessor("coreDiameter", {
            header: "Core Diameter (mm)",
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("acResistance75", {
            header: "AC Resistance (75°C)",
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("gmr", {
            header: "Geometric Mean Radius (mm)",
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("id", {
            header: "Actions",
            cell: (props) => (
                <BaseButton onClick={() => handleClick(props.getValue())}>
                    EDIT
                </BaseButton>
            ),
        }),
    ];

    useEffect(() => {
        async function getConductors() {
            const conductors = await window.api.getConductorTypes();
            setConductorTypes(conductors);
        }
        getConductors();
    }, []);

    return (
        <Wrapper>
            <BaseTable data={conductorTypes} columns={columns} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default ConductorTable;
