import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import TransmissionLinesSlice from "./TransmissionLinesSlice";
import SourcesSlice from "./SourcesSlice";
// import { projectApi } from "@/services/api";
const persistConfig = {
    key: "root",
    storage,
};

const persistedSources = persistReducer(persistConfig, SourcesSlice);
const persistedTransmissionLines = persistReducer(
    persistConfig,
    TransmissionLinesSlice
);

export const store = configureStore({
    reducer: {
        sources: persistedSources,
        transmissionLines: persistedTransmissionLines,
        // [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    // .concat(projectApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
