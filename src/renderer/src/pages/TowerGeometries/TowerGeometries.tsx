import styled from "styled-components";
import GeometriesTable from "@/features/towerGeometries/components/GeometriesTable";
import Routes from "@/router/RoutePathsEnum";
import BaseButton from "@/components/BaseButton";

interface Props {}

const TowerGeometries: React.FC<Props> = () => (
        <Wrapper>
            <BaseButton to={Routes.ADD_TOWER_GEOMETRY.path}>
                Add Tower Geometry
            </BaseButton>
            <GeometriesTable />
        </Wrapper>
    );

const Wrapper = styled.div``;
export default TowerGeometries;
