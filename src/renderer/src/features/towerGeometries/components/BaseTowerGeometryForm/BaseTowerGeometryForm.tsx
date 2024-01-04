import styled from "styled-components";
import { Button } from "component-library";
import { Form } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "@/components/FormInput";
import ConductorLocationTable from "@/features/towerGeometries/components/ConductorLocationTable";
import TowerGeometryDiagram from "@/features/towerGeometries/components/TowerGeometryDiagram";

interface Props {}

const BaseTowerGeometryForm: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <StyledForm>
            <LeftSide>
                <FormInput label={t("name")} name="name" required />
                <ConductorLocationTable />
                <Button type="submit">{t("submit")}</Button>
            </LeftSide>
            <RightSide>
                <TowerGeometryDiagram />
            </RightSide>
        </StyledForm>
    );
};

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
