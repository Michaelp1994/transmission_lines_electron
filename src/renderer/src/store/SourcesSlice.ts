import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface SourcesState {
  sources: SourceInput[];
}

interface updateSourceAction {
  id: number;
  source: SourceInput;
}

const SourcesSlice = createSlice({
  name: "sources",
  initialState: {
    sources: [],
  } as SourcesState,
  reducers: {
    addSource: (state, { payload }: PayloadAction<SourceInput>) => {
      state.sources.push(payload);
    },
    removeSource: (state, { payload }: PayloadAction<number>) => {
      state.sources.splice(payload, 1);
    },
    updateSource: (state, { payload }: PayloadAction<updateSourceAction>) => {
      Object.assign(state.sources[payload.id], payload.source);
    },
  },
});

export const { addSource, removeSource, updateSource } = SourcesSlice.actions;

export default SourcesSlice.reducer;
