import styled from "styled-components";
import { useEffect, useState } from "react";
import type { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import BaseTable from "@/components/BaseTable";
import BaseButton from "@/components/BaseButton";
import ROUTES from "@/router/RoutePathsEnum";

interface Props {}

const columnHelper = createColumnHelper<TowerGeometry>();

const GeometriesTable: FC<Props> = () => {
    const navigate = useNavigate();
    const [towerGeometries, setTowerGeometries] = useState([]);
    function handleClick(id: number) {
        navigate(ROUTES.EDIT_TOWER_GEOMETRY.buildPath({ id }));
    }
    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
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
        async function getGeometries() {
            const geometries = await window.api.getGeometries();
            setTowerGeometries(geometries);
        }
        getGeometries();
    }, []);
    return (
        <Wrapper>
            <BaseTable data={towerGeometries} columns={columns} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default GeometriesTable;
