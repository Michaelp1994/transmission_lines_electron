import { useTranslation } from "react-i18next";
import FormSelect from "@/components/FormSelect";

import { useAllConductorTypesQuery } from "@/services/api";

interface Props {
    label?: string;
    name: string;
}

const ConductorTypeSelect: React.FC<Props> = ({ label, name }) => {
    const { t } = useTranslation("translation");
    const { data, error, isLoading } = useAllConductorTypesQuery();
    if (isLoading) {
        return <div>{t("loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("errorMessage")}</div>;
    }
    return (
        <FormSelect label={label} name={name}>
            <option value="">{t("selectSource")}</option>
            {data.map((conductorType) => (
                <option key={conductorType.id} value={conductorType.id}>
                    {conductorType.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default ConductorTypeSelect;
