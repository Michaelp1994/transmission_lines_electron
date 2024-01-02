import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import Routes from "@/router/routes";
import BaseTowerGeometryForm from "../BaseTowerGeometryForm";
import { useAddTowerGeometryMutation } from "@/services/api";

interface Props {}

const AddTowerGeometryForm: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [addTowerGeometry, result] = useAddTowerGeometryMutation();
    const initialValues: TowerGeometryInput = {
        name: "",
        conductors: [{ x: 0, y: 0 }],
    };
    async function handleSubmit(
        values: TowerGeometryInput,
        actions: FormikHelpers<TowerGeometryInput>
    ) {
        await addTowerGeometry(values);
        if (result.error) {
            console.log(result.error);
            return;
        }
        actions.resetForm();
        navigate(Routes.TOWER_GEOMETRIES.path);
    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <BaseTowerGeometryForm />
        </Formik>
    );
};

export default AddTowerGeometryForm;
