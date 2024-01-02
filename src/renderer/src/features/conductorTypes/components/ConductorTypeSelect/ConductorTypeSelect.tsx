import FormSelect from "@/components/FormSelect";
import { useAllConductorTypesQuery } from "@/services/api";

interface Props {
    label?: string;
    name: string;
}

const ConductorTypeSelect: React.FC<Props> = ({ label, name }) => {
    const { data, error, isLoading } = useAllConductorTypesQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error || !data) {
        return <div>Theres an error!</div>;
    }
    return (
        <FormSelect label={label} name={name}>
            <option value="">Select a source</option>
            {data.map((conductorType) => (
                <option key={conductorType.id} value={conductorType.id}>
                    {conductorType.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default ConductorTypeSelect;
