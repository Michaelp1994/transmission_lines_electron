import styled from "styled-components";
import { ConductorTypeTable } from "@/features/conductorTypes";
import BaseButton from "@/components/BaseButton";
import Routes from "@/router/routes";

interface Props {}

const Conductors: React.FC<Props> = () => (
    <Wrapper>
        <BaseButton to={Routes.ADD_CONDUCTOR.path}>Add Conductor</BaseButton>
        <ConductorTypeTable />
    </Wrapper>
);

const Wrapper = styled.div``;
export default Conductors;
