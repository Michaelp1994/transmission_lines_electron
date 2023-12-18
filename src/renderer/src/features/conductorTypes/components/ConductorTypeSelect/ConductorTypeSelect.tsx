import { useEffect, useState } from "react";
import FormSelect from "@/components/FormSelect";

interface Props {
    label?: string;
    name: string;
}

const ConductorTypeSelect: React.FC<Props> = ({ label, name }) => {
    const [conductorTypes, setConductorTypes] = useState<ConductorType[]>([]);

    useEffect(() => {
        async function getConductorTypes() {
            const conductorsTypes = await window.api.getConductorTypes();
            setConductorTypes(conductorsTypes);
        }
        getConductorTypes();
    }, []);

    return (
        <FormSelect label={label} name={name}>
            {conductorTypes.map((conductor, index) => (
                <option key={index} value={conductor.id}>
                    {conductor.name}
                </option>
            ))}
        </FormSelect>
    );
};

export default ConductorTypeSelect;
