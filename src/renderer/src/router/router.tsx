import { createBrowserRouter, RouteObject } from "react-router-dom";
import ROUTES from "./routes";

import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import AddTransmissionLine from "@/pages/AddTransmissionLine/AddTransmissionLine";
import GeneratePage from "@/pages/GenerateResults";
import TowerGeometries from "@/pages/TowerGeometries";
import Conductors from "@/pages/Conductors";
import EditTransmissionLine from "@/pages/EditTransmissionLine";
import EditSource from "@/pages/EditSource";
import PageNotFound from "@/pages/PageNotFound";
import AddSource from "@/pages/AddSource";
import WelcomePage from "@/pages/WelcomePage";
import AddConductorType from "@/pages/AddConductorType";
import AddTowerGeometry from "@/pages/AddTowerGeometry";
import EditConductorType from "@/pages/EditConductorType";
import EditTowerGeometry from "@/pages/EditTowerGeometry";
import ErrorPage from "@/pages/ErrorPage";
import ProjectPage from "@/pages/ProjectPage";

const routeObjects: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: ROUTES.HOME.path,
                element: <Home />,
            },
            {
                path: ROUTES.WELCOME.path,
                element: <WelcomePage />,
            },
            {
                path: ROUTES.PROJECT.path,
                element: <ProjectPage />,
            },
            {
                path: ROUTES.ADD_TOWER_GEOMETRY.path,
                element: <AddTowerGeometry />,
            },
            {
                path: ROUTES.ADD_TRANSMISSION_LINE.path,
                element: <AddTransmissionLine />,
            },
            {
                path: ROUTES.ADD_SOURCE.path,
                element: <AddSource />,
            },
            {
                path: ROUTES.ADD_CONDUCTOR.path,
                element: <AddConductorType />,
            },
            {
                path: ROUTES.GENERATE_RESULTS.path,
                element: <GeneratePage />,
            },
            {
                path: ROUTES.EDIT_TRANSMISSION_LINE.path,
                element: <EditTransmissionLine />,
            },
            {
                path: ROUTES.EDIT_TOWER_GEOMETRY.path,
                element: <EditTowerGeometry />,
            },
            {
                path: ROUTES.EDIT_SOURCE.path,
                element: <EditSource />,
            },
            {
                path: ROUTES.EDIT_CONDUCTOR_TYPE.path,
                element: <EditConductorType />,
            },
            {
                path: ROUTES.TOWER_GEOMETRIES.path,
                element: <TowerGeometries />,
            },
            {
                path: ROUTES.CONDUCTORS.path,
                element: <Conductors />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
];

const router: ReturnType<typeof createBrowserRouter> =
    createBrowserRouter(routeObjects);

export default router;
