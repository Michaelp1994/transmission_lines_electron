import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";

// function baseQuery(call: string, ...args: any[]) {
//     return window.electron.ipcRenderer.invoke(call, ...args);
// }

const baseQuery: BaseQueryFn<string, unknown, { reason: string }, {}, {}> = (
    args,
    api,
    extraOptions
) => window.electron.ipcRenderer.invoke(args, extraOptions);
export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery,
    endpoints: (builder) => ({
        allConductors: builder.query({
            query: () => "get-conductors",
        }),
        allGeometries: builder.query({
            query: () => "get-geometries",
        }),
        // addTowerGeometry: builder.mutation({
        //     query: (towerGeometry) => ({
        //         query: "add-tower-geometry",
        //         body: towerGeometry,
        //     }),
        // }),
        // addConductorType: builder.mutation({
        //     query: (conductorType) => ({
        //         query: "add-conductor-type",
        //         body: conductorType,
        //     }),
        // }),
        // solveCircuit: builder.query({
        //     query: (sources, transmissionLines) => ({
        //         query: "solve-circuit",
        //         body: { sources, transmissionLines },
        //     }),
        // }),
        // })
    }),
});

export const { useAllConductorsQuery } = projectApi;
