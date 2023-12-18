import React from "react";
import { Formik, FormikHelpers } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import BaseSourceForm from "../BaseSourceForm";
import { updateSource } from "@/store/SourcesSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const EditSourceForm: React.FC<Props> = () => {
    const { id } = useParams();
    if (!id) return null;
    const sourceId = parseInt(id);
    const source = useAppSelector((state) => state.sources.sources[sourceId]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleSubmit(
        values: SourceInput,
        actions: FormikHelpers<SourceInput>
    ) {
        dispatch(
            updateSource({
                id: sourceId,
                source: values,
            })
        );
        navigate(Routes.HOME.path);
    }

    return (
        <Formik initialValues={source} onSubmit={handleSubmit}>
            <BaseSourceForm />
        </Formik>
    );
};

export default EditSourceForm;
