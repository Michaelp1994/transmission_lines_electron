import { createBrowserRouter , RouteObject } from "react-router-dom";
import Routes from "./RoutePathsEnum";

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

const routes: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: Routes.HOME.path,
                element: <Home />,
            },
            {
                path: Routes.WELCOME.path,
                element: <WelcomePage />,
            },
            {
                path: Routes.ADD_TOWER_GEOMETRY.path,
                element: <AddTowerGeometry />,
            },
            {
                path: Routes.ADD_TRANSMISSION_LINE.path,
                element: <AddTransmissionLine />,
            },
            {
                path: Routes.ADD_SOURCE.path,
                element: <AddSource />,
            },
            {
                path: Routes.ADD_CONDUCTOR.path,
                element: <AddConductorType />,
            },
            {
                path: Routes.GENERATE_RESULTS.path,
                element: <GeneratePage />,
            },
            {
                path: Routes.EDIT_TRANSMISSION_LINE.path,
                element: <EditTransmissionLine />,
            },
            {
                path: Routes.EDIT_TOWER_GEOMETRY.path,
                element: <EditTowerGeometry />,
            },
            {
                path: Routes.EDIT_SOURCE.path,
                element: <EditSource />,
            },
            {
                path: Routes.EDIT_CONDUCTOR_TYPE.path,
                element: <EditConductorType />,
            },
            {
                path: Routes.TOWER_GEOMETRIES.path,
                element: <TowerGeometries />,
            },
            {
                path: Routes.CONDUCTORS.path,
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
    createBrowserRouter(routes);

export default router;
