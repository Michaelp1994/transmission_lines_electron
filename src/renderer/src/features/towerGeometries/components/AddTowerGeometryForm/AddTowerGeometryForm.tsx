import React from "react";
import { Formik, FormikHelpers } from "formik";

import { useNavigate } from "react-router-dom";
import Routes from "@/router/RoutePathsEnum";
import BaseTowerGeometryForm from "../BaseTowerGeometryForm";

interface Props {}

const AddTowerGeometryForm: React.FC<Props> = () => {
    const navigate = useNavigate();
    const initialValues: TowerGeometryInput = {
        name: "",
        conductors: [{ x: 0, y: 0 }],
    };
    function handleSubmit(
        values: TowerGeometryInput,
        actions: FormikHelpers<TowerGeometryInput>
    ) {
        window.api.addTowerGeometry(values);
        actions.resetForm();
        navigate(Routes.HOME.path);
    }
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <BaseTowerGeometryForm />
        </Formik>
    );
};

export default AddTowerGeometryForm;
