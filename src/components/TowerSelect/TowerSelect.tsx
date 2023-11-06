import FormSelect from "../FormSelect";
import geometriesList from "@/assets/geometries.json";

interface Props {
  label: string;
  name: string;
}

const TowerSelect: React.FC<Props> = (props) => {
  return (
    <FormSelect label={props.label} name={props.name}>
      {geometriesList.map((geometry, index) => (
        <option key={index} value={geometry.id}>
          {geometry.name}
        </option>
      ))}
    </FormSelect>
  );
};

export default TowerSelect;
