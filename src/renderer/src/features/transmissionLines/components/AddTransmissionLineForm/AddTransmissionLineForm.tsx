import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store";
import { addTransmissionLine } from "@/store/TransmissionLinesSlice";
import Routes from "@/router/routes";
import BaseTransmissionLineForm from "../BaseTransmissionLineForm";

interface Props {}

const AddTransmissionLineForm: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues: TransmissionLineInput = {
        name: "",
        fromSource: "",
        toSource: "",
        conductors: [
            {
                name: "",
                fromPhase: 1,
                toPhase: 1,
                bundleNumber: 1,
                bundleSpacing: 0,
                type: 1,
            },
        ],
        towers: [
            {
                name: "",
                resistance: 15,
                distance: 1,
                geometry: 1,
            },
        ],
    };

    function handleSubmit(values: TransmissionLineInput) {
        dispatch(addTransmissionLine(values));
        navigate(Routes.PROJECT.path);
    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <BaseTransmissionLineForm />
        </Formik>
    );
};

export default AddTransmissionLineForm;
