import styled from "styled-components";
import { useEffect, useState } from "react";
import type { FC } from "react";
import BaseTable from "@/components/BaseTable";
interface Props {}

const GeometriesTable: FC<Props> = (props) => {
    const [towerGeometries, setTowerGeometries] = useState([]);
    useEffect(() => {
        async function getGeometries() {
            const geometries = await window.api.getGeometries();
            setTowerGeometries(geometries);
        }
        getGeometries();
    }, []);
    const columns = [
        {
            title: "Name",
            key: "name",
        },
    ];
    return (
        <Wrapper>
            <BaseTable data={towerGeometries} columns={columns} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default GeometriesTable;
