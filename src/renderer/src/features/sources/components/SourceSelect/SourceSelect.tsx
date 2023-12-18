import FormSelect from "@/components/FormSelect";
import { useAppSelector } from "@/store";

interface Props {
    label: string;
    name: string;
    id: string;
}

const SourceSelect: React.FC<Props> = ({ label, name }) => {
    const sources = useAppSelector((state) => state.sources.sources);

    return (
        <FormSelect label={label} name={name}>
            {sources.map((source, index) => (
                <option key={index} value={index}>
                    {source.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default SourceSelect;
