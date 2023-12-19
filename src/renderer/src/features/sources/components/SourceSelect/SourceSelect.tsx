import FormSelect from "@/components/FormSelect";
import { useAppSelector } from "@/store";

interface Props {
    label: string;
    name: string;
    id: string;
}

const SourceSelect: React.FC<Props> = ({ label, name }) => {
    const sources = useAppSelector((state) => state.sources);

    return (
        <FormSelect label={label} name={name}>
            {sources.map(({ id, name: sourceName }) => (
                <option key={id} value={id}>
                    {sourceName}
                </option>
            ))}
        </FormSelect>
    );
};

export default SourceSelect;
