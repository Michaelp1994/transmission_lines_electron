import { useEffect, useState } from "react";
import FormSelect from "../FormSelect";

interface Props {
    label?: string;
    name: string;
}

const TowerSelect: React.FC<Props> = (props) => {
    const [towerGeometries, setTowerGeometries] = useState<TowerGeometry[]>([]);
    useEffect(() => {
        async function getGeometries() {
            const geometries = await window.api.getGeometries();
            setTowerGeometries(geometries);
        }
        getGeometries();
    }, []);
    return (
        <FormSelect label={props.label} name={props.name}>
            {towerGeometries.map((geometry, index) => (
                <option key={index} value={geometry.id}>
                    {geometry.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default TowerSelect;
