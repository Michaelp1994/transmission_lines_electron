import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import { useAppDispatch, useAppSelector } from "@/store";
import { updateTransmissionLine } from "@/store/TransmissionLinesSlice";
import Routes from "@/router/RoutePathsEnum";
import BaseTransmissionLineForm from "../BaseTransmissionLineForm";

interface Props {}

const EditTransmissionLineForm: React.FC<Props> = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const sourceId = parseInt(id, 10);
    const transmissionLine = useAppSelector(
        (state) => state.transmissionLines.transmissionLines[sourceId]
    );
    function onSubmit(values: TransmissionLineInput) {
        dispatch(
            updateTransmissionLine({ id: sourceId, transmissionLine: values })
        );
        navigate(Routes.HOME.path);
    }
    return (
        <Formik initialValues={transmissionLine} onSubmit={onSubmit}>
            <BaseTransmissionLineForm />
        </Formik>
    );
};

export default EditTransmissionLineForm;
