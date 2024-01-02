import styled from "styled-components";
import { Button } from "component-library";
import { Form } from "formik";
import FormInput from "@/components/FormInput";

import ConductorLocationTable from "@/features/towerGeometries/components/ConductorLocationTable";
import TowerGeometryDiagram from "@/features/towerGeometries/components/TowerGeometryDiagram";

interface Props {}

const BaseTowerGeometryForm: React.FC<Props> = () => (
    <StyledForm>
        <LeftSide>
            <FormInput label="Name" name="name" required />
            <ConductorLocationTable />
            <Button type="submit">Submit</Button>
        </LeftSide>
        <RightSide>
            <TowerGeometryDiagram />
        </RightSide>
    </StyledForm>
);

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
const RightSide = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`;
const StyledForm = styled(Form)`
    display: flex;
    gap: 12px;
`;
export default BaseTowerGeometryForm;
