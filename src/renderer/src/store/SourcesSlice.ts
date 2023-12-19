/// <reference types="redux" />
/// <reference types="reselect" />

import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// interface SourcesState {
//     sources: Source[];
// }

type SourcesState = Source[];

interface UpdateSourceAction {
    id: string;
    source: SourceInput;
}

const SourcesSlice = createSlice({
    name: "sources",
    initialState: [] as SourcesState,
    selectors: {
        selectSourceById: createSelector(
            (state: SourcesState) => state,
            (_state: SourcesState, id: string) => id,
            (sources: SourcesState, id: string) =>
                sources.find((source) => source.id === id)
        ),
    },
    reducers: {
        importSources: (state, { payload }: PayloadAction<Source[]>) => {
            state.splice(0, Infinity);
            payload.forEach((source) => state.push(source));
            // state = payload;
        },
        addSource: (state, { payload }: PayloadAction<SourceInput>) => {
            const newSource = {
                ...payload,
                id: uuidv4(),
            };
            state.push(newSource);
        },
        removeSource: (state, { payload }: PayloadAction<string>) => {
            const index = state.findIndex((source) => source.id === payload);
            if (index === -1) {
                throw Error("can't find source");
            }
            state.splice(index, 1);
        },
        updateSource: (
            state,
            { payload }: PayloadAction<UpdateSourceAction>
        ) => {
            const sourceOrUndefined = state.find(
                (source) => source.id === payload.id
            );
            if (!sourceOrUndefined) {
                throw Error("can't find source");
            }
            Object.assign(sourceOrUndefined, payload.source);
        },
    },
});

export const { addSource, removeSource, updateSource, importSources } =
    SourcesSlice.actions;
export const { selectSourceById } = SourcesSlice.selectors;
export default SourcesSlice.reducer;
