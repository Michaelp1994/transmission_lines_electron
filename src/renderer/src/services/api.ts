import { createApi } from "@reduxjs/toolkit/query/react";
import ApiEvent from "@shared/ApiEvent";

import baseQuery from "./baseQuery";

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery,
    tagTypes: ["ConductorType", "TowerGeometry"],
    endpoints: (builder) => ({
        allConductorTypes: builder.query<ConductorType[], void>({
            query: () => ApiEvent.GetConductors,
            providesTags: ["ConductorType"],
        }),
        allTowerGeometries: builder.query<TowerGeometry[], void>({
            query: () => ApiEvent.GetGeometries,
            providesTags: ["TowerGeometry"],
        }),
        towerGeometry: builder.query<TowerGeometry, number>({
            query: (id) => ({
                url: ApiEvent.SingleTowerGeometry,
                body: id,
            }),
            providesTags: ["TowerGeometry"],
        }),
        conductorType: builder.query<ConductorType, number>({
            query: (id) => ({
                url: ApiEvent.SingleConductorType,
                body: id,
            }),
            providesTags: ["ConductorType"],
        }),
        addTowerGeometry: builder.mutation<TowerGeometry, TowerGeometryInput>({
            query: (towerGeometry) => ({
                url: ApiEvent.AddTowerGeometry,
                body: towerGeometry,
            }),
            invalidatesTags: ["TowerGeometry"],
        }),
        addConductorType: builder.mutation<ConductorType, ConductorTypeInput>({
            query: (conductorType) => ({
                url: ApiEvent.AddConductorType,
                body: conductorType,
            }),
            invalidatesTags: ["ConductorType"],
        }),
        editTowerGeometry: builder.mutation<
            TowerGeometry,
            EditTowerGeometryInput
        >({
            query: (towerGeometry) => ({
                url: ApiEvent.EditTowerGeometry,
                body: towerGeometry,
            }),
            invalidatesTags: ["TowerGeometry"],
        }),
        editConductorType: builder.mutation<
            ConductorType,
            EditConductorTypeInput
        >({
            query: (conductorType) => ({
                url: ApiEvent.EditConductorType,
                body: conductorType,
            }),
            invalidatesTags: ["ConductorType"],
        }),
        solveCircuit: builder.query<string[][], Project>({
            query: ({ sources, transmissionLines }) => ({
                url: ApiEvent.SolveCircuit,
                body: { sources, transmissionLines },
            }),
        }),
    }),
});

export const {
    useAllConductorTypesQuery,
    useAllTowerGeometriesQuery,
    useAddConductorTypeMutation,
    useAddTowerGeometryMutation,
    useConductorTypeQuery,
    useTowerGeometryQuery,
    useEditConductorTypeMutation,
    useEditTowerGeometryMutation,
    useSolveCircuitQuery,
} = projectApi;
