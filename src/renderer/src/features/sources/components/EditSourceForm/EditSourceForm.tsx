import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import BaseSourceForm from "../BaseSourceForm";
import { updateSource, selectSourceById } from "@/store/SourcesSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Routes from "@/router/routes";

interface Props {
    id: string;
}

const EditSourceForm: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const source = useAppSelector((state) => selectSourceById(state, id));
    function handleSubmit(
        values: SourceInput
        // actions: FormikHelpers<SourceInput>
    ) {
        dispatch(
            updateSource({
                id,
                source: values,
            })
        );
        navigate(Routes.PROJECT.path);
    }
    if (!source) return <div>Error, cannot find the source</div>;

    return (
        <Formik initialValues={source} onSubmit={handleSubmit}>
            <BaseSourceForm />
        </Formik>
    );
};

export default EditSourceForm;
