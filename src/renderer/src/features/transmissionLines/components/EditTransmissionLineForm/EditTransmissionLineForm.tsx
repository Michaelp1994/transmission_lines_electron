import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/store";
import { updateTransmissionLine } from "@/store/TransmissionLinesSlice";
import Routes from "@/router/routes";
import BaseTransmissionLineForm from "../BaseTransmissionLineForm";

interface Props {
    id: string;
}

const EditTransmissionLineForm: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation("translation");

    const transmissionLine = useAppSelector((state) =>
        state.transmissionLines.find((line) => line.id === id)
    );
    if (!transmissionLine) {
        return <div>{t("errorMessage")}</div>;
    }
    function onSubmit(values: TransmissionLine) {
        dispatch(updateTransmissionLine({ id, transmissionLine: values }));
        navigate(Routes.PROJECT.path);
    }
    return (
        <Formik initialValues={transmissionLine} onSubmit={onSubmit}>
            <BaseTransmissionLineForm />
        </Formik>
    );
};

export default EditTransmissionLineForm;
