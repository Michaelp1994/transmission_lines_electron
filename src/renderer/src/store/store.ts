/// <reference types="redux-thunk" />
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import TransmissionLinesSlice from "./TransmissionLinesSlice";
import SourcesSlice from "./SourcesSlice";
import { projectApi } from "@/services/api";

export const store = configureStore({
    reducer: {
        sources: SourcesSlice,
        transmissionLines: TransmissionLinesSlice,
        [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectApi.middleware),
});

// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
