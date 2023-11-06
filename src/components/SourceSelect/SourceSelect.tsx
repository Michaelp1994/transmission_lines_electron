import FormSelect from "@/components/FormSelect";
import { useAppSelector } from "@/store";

interface Props {
  label: string;
  name: string;
  id: string;
}

const SourceSelect: React.FC<Props> = (props) => {
  const sources = useAppSelector((state) => state.sources.sources);

  return (
    <FormSelect label={props.label} name={props.name}>
      {sources.map((source, index) => (
        <option key={index} value={index}>
          {source.name}
        </option>
      ))}
    </FormSelect>
  );
};

export default SourceSelect;
