import { useEffect, useState } from "react";
import FormSelect from "../../../../components/FormSelect";

interface Props {
    label?: string;
    name: string;
}

const TowerGeometrySelect: React.FC<Props> = ({ label, name }) => {
    const [towerGeometries, setTowerGeometries] = useState<TowerGeometry[]>([]);
    useEffect(() => {
        async function getGeometries() {
            const geometries = await window.api.getGeometries();
            setTowerGeometries(geometries);
        }
        getGeometries();
    }, []);
    return (
        <FormSelect label={label} name={name}>
            {towerGeometries.map((geometry, index) => (
                <option key={index} value={geometry.id}>
                    {geometry.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default TowerGeometrySelect;
