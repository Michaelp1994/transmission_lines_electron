import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";

import { useAppDispatch } from "@/store";
import { addSource } from "@/store/SourcesSlice";
import Routes from "@/router/routes";
import BaseSourceForm from "@/features/sources/components/BaseSourceForm";

interface Props {}

const AddSourceForm: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        phases: 3,
        voltage: 138,
        x1r1: 4,
        Isc1: 4000,
        Isc3: 3000,
        x0r0: 3,
        resistance: 15,
        frequency: 60,
    };
    function handleSubmit(
        values: SourceInput,
        actions: FormikHelpers<SourceInput>
    ) {
        dispatch(addSource(values));
        actions.resetForm();
        navigate(Routes.PROJECT.path);
    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <BaseSourceForm />
        </Formik>
    );
};

export default AddSourceForm;
