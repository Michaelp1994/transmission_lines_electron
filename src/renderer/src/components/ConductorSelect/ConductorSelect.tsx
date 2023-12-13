import FormSelect from "../FormSelect";
import conductorsList from "@/assets/conductorTypes.json";

interface Props {
  label?: string;
  name: string;
}

const ConductorSelect: React.FC<Props> = (props) => {
  return (
    <FormSelect label={props.label} name={props.name}>
      {conductorsList.map((conductor, index) => (
        <option key={index} value={conductor.id}>
          {conductor.name}
        </option>
      ))}
    </FormSelect>
  );
};

export default ConductorSelect;
