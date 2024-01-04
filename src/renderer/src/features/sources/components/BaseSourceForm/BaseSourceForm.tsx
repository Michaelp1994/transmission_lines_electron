import styled from "styled-components";
import { Form } from "formik";
import { useTranslation } from "react-i18next";

import { Button } from "component-library";
import FormInput from "@/components/FormInput";

interface Props {}

const BaseSourceForm: React.FC<Props> = () => {
    const { t } = useTranslation("translation");

    return (
        <StyledForm>
            <FormInput
                label={t("name")}
                name="name"
                autoComplete="off"
                type="text"
                placeholder="Example"
                required
            />
            <FormInput
                label={t("phases")}
                name="phases"
                type="number"
                placeholder="3"
                required
            />
            <FormInput
                label={`${t("voltage")} (kV)`}
                name="voltage"
                type="number"
                placeholder="138"
            />
            <FormInput
                label={t("x1r1")}
                name="x1r1"
                type="number"
                placeholder="4"
            />
            <FormInput
                label={t("x0r0")}
                name="x0r0"
                type="number"
                placeholder="3"
            />
            <FormInput
                label={t("shortCircuitCurrent3Phase")}
                name="Isc3"
                type="number"
                placeholder="4000"
            />
            <FormInput
                label={t("shortCircuitCurrent1Phase")}
                name="Isc1"
                type="number"
                placeholder="3000"
            />
            <FormInput
                label={t("resistance")}
                name="resistance"
                type="number"
                placeholder="15"
            />
            <ButtonsWrapper>
                <Button type="reset">{t("cancel")}</Button>
                <Button type="submit">{t("save")}</Button>
            </ButtonsWrapper>
        </StyledForm>
    );
};

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 12px;
    justify-content: end;
`;
export default BaseSourceForm;
