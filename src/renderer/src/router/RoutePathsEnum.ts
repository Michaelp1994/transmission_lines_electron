import { route, number } from "react-router-typesafe-routes/dom";

const ROUTES = {
    HOME: route(""),
    WELCOME: route("welcome"),
    TOWER_GEOMETRIES: route("tower-geometries"),
    CONDUCTORS: route("conductors"),
    ADD_TRANSMISSION_LINE: route("lines/new"),
    ADD_SOURCE: route("sources/new"),
    ADD_CONDUCTOR: route("conductors/new"),
    ADD_TOWER_GEOMETRY: route("tower-geometries/new"),
    GENERATE_RESULTS: route("generate-results"),
    EDIT_TRANSMISSION_LINE: route("lines/:id/edit", {
        params: { id: number() },
    }),
    EDIT_SOURCE: route("sources/:id/edit", {
        params: { id: number() },
    }),
    EDIT_CONDUCTOR_TYPE: route("conductors/:id/edit", {
        params: { id: number() },
    }),
    EDIT_TOWER_GEOMETRY: route("tower-geometries/:id/edit", {
        params: { id: number() },
    }),
} as const;

export default ROUTES;
