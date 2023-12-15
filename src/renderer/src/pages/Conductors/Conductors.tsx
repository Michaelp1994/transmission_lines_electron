import styled from "styled-components";
import ConductorTable from "./ConductorTable";
import BaseButton from "@/components/BaseButton";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const Conductors: React.FC<Props> = () => {
    return (
        <Wrapper>
            <BaseButton to={Routes.ADD_CONDUCTOR.path}>
                Add Conductor
            </BaseButton>
            <ConductorTable />
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default Conductors;
