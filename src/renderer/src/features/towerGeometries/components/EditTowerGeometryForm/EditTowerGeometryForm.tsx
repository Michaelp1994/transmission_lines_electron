import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import BaseTowerGeometryForm from "../BaseTowerGeometryForm";
import Routes from "@/router/RoutePathsEnum";

interface Props {}

const EditTowerGeometryForm: React.FC<Props> = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const towerGeometryId = parseInt(id, 10);
    const [towerGeometry, setTowerGeometry] =
        useState<TowerGeometryInput | null>(null);
    useEffect(() => {
        async function getGeometry() {
            const geometry = await window.api.towerGeometry(towerGeometryId);
            setTowerGeometry(geometry);
        }
        getGeometry();
    }, [towerGeometryId]);

    // const initialValues: TowerGeometryInput = {
    //     name: "",
    //     locations: [{ x: 0, y: 0 }],
    // };
    function handleSubmit(
        values: TowerGeometryInput,
        actions: FormikHelpers<TowerGeometryInput>
    ) {
        window.api.editTowerGeometry(towerGeometryId, values);
        actions.resetForm();
        navigate(Routes.HOME.path);
    }
    return (
        <Formik initialValues={towerGeometry} onSubmit={handleSubmit}>
            <BaseTowerGeometryForm />
        </Formik>
    );
};

export default EditTowerGeometryForm;
