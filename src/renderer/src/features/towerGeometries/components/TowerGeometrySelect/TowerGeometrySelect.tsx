import { useTranslation } from "react-i18next";
import FormSelect from "@/components/FormSelect";
import { useAllTowerGeometriesQuery } from "@/services/api";

interface Props {
    label?: string;
    name: string;
}

const TowerGeometrySelect: React.FC<Props> = ({ label, name }) => {
    const { t } = useTranslation("translation");
    const { data = [], error, isLoading } = useAllTowerGeometriesQuery();
    if (error) {
        return <div>{t("errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("loading")}</div>;
    }
    return (
        <FormSelect label={label} name={name}>
            <option value="">{t("selectSource")}</option>
            {data.map((geometry) => (
                <option key={geometry.id} value={geometry.id}>
                    {geometry.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default TowerGeometrySelect;
