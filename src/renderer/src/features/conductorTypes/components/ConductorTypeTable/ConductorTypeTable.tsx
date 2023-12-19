import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { createColumnHelper } from "@tanstack/react-table";
import BaseTable from "@/components/BaseTable";
import BaseButton from "@/components/BaseButton";
import ROUTES from "@/router/routes";
import { useAllConductorTypesQuery } from "@/services/api";

const columnHelper = createColumnHelper<ConductorType>();

interface EditButtonProps {
    id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(ROUTES.EDIT_CONDUCTOR_TYPE.buildPath({ id }));
    }
    return <BaseButton onClick={() => handleClick()}>EDIT</BaseButton>;
};

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.renderValue(),
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
        cell: (props) => <EditButton id={props.getValue()} />,
    }),
];

interface Props {}

const ConductorTable: React.FC<Props> = () => {
    const { data, error, isLoading } = useAllConductorTypesQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error || !data) {
        return <div>Theres an error!</div>;
    }
    return (
        <Wrapper>
            <BaseTable data={data} columns={columns} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default ConductorTable;
