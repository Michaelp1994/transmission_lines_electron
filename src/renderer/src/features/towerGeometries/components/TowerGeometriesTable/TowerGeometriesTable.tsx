import styled from "styled-components";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import BaseTable from "@/components/BaseTable";
import BaseButton from "@/components/BaseButton";
import ROUTES from "@/router/routes";
import { useAllTowerGeometriesQuery } from "@/services/api";

interface Props {}

const columnHelper = createColumnHelper<TowerGeometry>();

interface EditButtonProps {
    id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(ROUTES.EDIT_TOWER_GEOMETRY.buildPath({ id }));
    }
    return <BaseButton onClick={handleClick}>EDIT</BaseButton>;
};

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("id", {
        header: "Actions",
        cell: (props) => <EditButton id={props.getValue()} />,
    }),
];

const GeometriesTable: React.FC<Props> = () => {
    const { data = [], error, isLoading } = useAllTowerGeometriesQuery();
    if (error) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <div>loading</div>;
    }
    return (
        <Wrapper>
            <BaseTable data={data} columns={columns} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default GeometriesTable;
