import FormSelect from "@/components/FormSelect";
import { useAppSelector } from "@/store";

interface Props {
    label: string;
    name: string;
    id: string;
    required?: boolean;
}

const SourceSelect: React.FC<Props> = ({ label, name, required }) => {
    const sources = useAppSelector((state) => state.sources);

    return (
        <FormSelect label={label} name={name} required={required}>
            <option value="">Select a source</option>
            {sources.map(({ id, name: sourceName }) => (
                <option key={id} value={id}>
                    {sourceName}
                </option>
            ))}
        </FormSelect>
    );
};

export default SourceSelect;
