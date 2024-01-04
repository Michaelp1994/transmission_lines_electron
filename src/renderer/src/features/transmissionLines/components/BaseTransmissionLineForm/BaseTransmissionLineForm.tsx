import styled from "styled-components";
import { Button } from "component-library";
import { useTranslation } from "react-i18next";
import { Form } from "formik";

import ConductorConfigurationTable from "../ConductorConfigurationTable";
import TowerConfigurationTable from "../TowerConfigurationTable";

import FormInput from "@/components/FormInput";
import { SourceSelect } from "@/features/sources";

interface Props {}

const BaseTransmissionLineForm: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <StyledForm>
            <FormInput
                label={t("name")}
                name="name"
                type="text"
                placeholder="Example"
                required
            />
            <SourceSelect
                label={t("from")}
                name="fromSource"
                id="from"
                required
            />
            <SourceSelect label={t("to")} name="toSource" id="to" required />
            <ConductorConfigurationTable />
            <TowerConfigurationTable />
            <Button type="submit">{t("addTransmissionLine")}</Button>
        </StyledForm>
    );
};

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export default BaseTransmissionLineForm;
