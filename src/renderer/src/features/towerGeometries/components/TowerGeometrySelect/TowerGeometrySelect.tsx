import FormSelect from "@/components/FormSelect";
import { useAllTowerGeometriesQuery } from "@/services/api";

interface Props {
    label?: string;
    name: string;
}

const TowerGeometrySelect: React.FC<Props> = ({ label, name }) => {
    const { data = [], error, isLoading } = useAllTowerGeometriesQuery();
    if (error) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <div>loading</div>;
    }
    return (
        <FormSelect label={label} name={name}>
            <option value="">Select a source</option>
            {data.map((geometry) => (
                <option key={geometry.id} value={geometry.id}>
                    {geometry.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default TowerGeometrySelect;
