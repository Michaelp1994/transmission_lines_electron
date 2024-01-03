import styled from "styled-components";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import Routes from "@/router/routes";
import BaseConductorTypeForm from "../BaseConductorTypeForm";
// import { useAddConductorTypeMutation } from "@/services/api";

interface Props {}
interface IConductorType {
    name: string;
    innerMaterial: string;
    innerStrands: number;
    innerStrandRadius: number;
    outerMaterial: string;
    outerStrands: number;
    outerStrandRadius: number;
}

const AddConductorTypeForm: React.FC<Props> = () => {
    const navigate = useNavigate();
    // const [addConductorMutation, result] = useAddConductorTypeMutation();
    const initialValues: IConductorType = {
        name: "Linnet",
        innerMaterial: "Steel",
        innerStrands: 7,
        innerStrandRadius: 2.25,
        outerMaterial: "Aluminium",
        outerStrands: 26,
        outerStrandRadius: 2.89,

        // surfaceArea: 0,
        // stranding: "",
        // outerDiameter: 0,
        // coreDiameter: 0,
        // layers: 0,
        // currentCapacity: 0,
        // dcResistance25: 0,
        // acResistance25: 0,
        // acResistance50: 0,
        // acResistance75: 0,
        // gmr: 0,
    };
    async function handleSubmit(
        values: IConductorType,
        actions: FormikHelpers<IConductorType>
    ) {
        console.log(values);
        const u0 = 4 * Math.PI * 1e-7;
        const e0 = 8.854187817e-12;
        const freq = 60;
        const w = 2 * Math.PI * freq;
        let ur = 0;
        let er = 0;
        let permitivity = 0;
        if (values.innerMaterial === "Steel") {
            ur = 100;
            er = 6.99e6;
            permitivity = 0;
        }
        if (values.innerMaterial === "Aluminium") {
            ur = 1.000022;
            er = 3.77e7;
            permitivity = 0;
        }
        if (values.innerMaterial === "Copper") {
            ur = 0.999994;
            er = 5.96e7;
            permitivity = 0;
        }

        const strandGMR = values.innerStrandRadius * Math.exp(-ur / 4);
        const rq = 0;
        const n = values.innerStrands;
        const strandsLayersMap = {
            1: 1,
            7: 2,
            19: 3,
            37: 4,
            61: 5,
        };

        const strandLayer = rq * (n * (strandGMR / n)) ** (1 / n);

        // await addConductorMutation(values);
        console.log(values);
        // if (result.error) {
        //     console.log(result.error);
        //     return;
        // }

        actions.resetForm();
        // navigate(Routes.CONDUCTORS.path);
    }
    return (
        <Wrapper>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <BaseConductorTypeForm />
            </Formik>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default AddConductorTypeForm;
