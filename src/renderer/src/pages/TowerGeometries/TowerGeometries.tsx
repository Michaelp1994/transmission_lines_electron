import styled from "styled-components";
import { TowerGeometriesTable } from "@/features/towerGeometries";
import Routes from "@/router/routes";
import BaseButton from "@/components/BaseButton";

interface Props {}

const TowerGeometries: React.FC<Props> = () => (
    <Wrapper>
        <BaseButton to={Routes.ADD_TOWER_GEOMETRY.path}>
            Add Tower Geometry
        </BaseButton>
        <TowerGeometriesTable />
    </Wrapper>
);

const Wrapper = styled.div``;
export default TowerGeometries;
