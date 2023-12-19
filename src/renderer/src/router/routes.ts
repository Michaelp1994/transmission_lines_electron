import { route, number, string } from "react-router-typesafe-routes/dom";

const ROUTES = {
    HOME: route(""),
    WELCOME: route("welcome"),
    PROJECT: route("project"),
    TOWER_GEOMETRIES: route("tower-geometries"),
    CONDUCTORS: route("conductors"),
    GENERATE_RESULTS: route("generate-results"),
    ADD_TRANSMISSION_LINE: route("lines/new"),
    ADD_SOURCE: route("sources/new"),
    ADD_CONDUCTOR: route("conductors/new"),
    ADD_TOWER_GEOMETRY: route("tower-geometries/new"),
    EDIT_TRANSMISSION_LINE: route("lines/:id/edit", {
        params: { id: string().defined() },
    }),
    EDIT_SOURCE: route("sources/:id/edit", {
        params: { id: string().defined() },
    }),
    EDIT_CONDUCTOR_TYPE: route("conductors/:id/edit", {
        params: { id: number().defined() },
    }),
    EDIT_TOWER_GEOMETRY: route("tower-geometries/:id/edit", {
        params: { id: number().defined() },
    }),
} as const;

export default ROUTES;
