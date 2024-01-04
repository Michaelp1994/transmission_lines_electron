import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Form } from "formik";
import { Button } from "component-library";
import FormInput from "@/components/FormInput";

interface Props {}

const BaseConductorTypeForm: React.FC<Props> = () => {
    const { t } = useTranslation("translation");
    return (
        <StyledForm>
            <FormInput label={t("name")} name="name" required />
            <FormInput
                label={t("surfaceArea")}
                type="number"
                name="surfaceArea"
            />
            <FormInput
                label={t("outerDiameter")}
                type="number"
                name="outerDiameter"
                required
            />
            <FormInput
                label={t("coreDiameter")}
                type="number"
                name="coreDiameter"
            />
            <FormInput label={t("layers")} type="number" name="layers" />
            <FormInput
                label={t("currentCapacity")}
                name="currentCapacity"
                type="number"
            />
            <FormInput
                label={t("dcResistance25")}
                type="number"
                name="dcResistance25"
            />
            <FormInput
                label={t("acResistance25")}
                type="number"
                name="acResistance25"
            />
            <FormInput
                label={t("acResistance50")}
                type="number"
                name="acResistance50"
            />
            <FormInput
                label={t("acResistance75")}
                type="number"
                name="acResistance75"
                required
            />
            <FormInput
                label={t("geometricMeanRadius")}
                type="number"
                name="gmr"
            />
            <Button type="submit">{t("submit")}</Button>
        </StyledForm>
    );
};

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export default BaseConductorTypeForm;
