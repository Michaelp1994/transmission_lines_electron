import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TransmissionLineState {
  transmissionLines: TransmissionLine[];
}

interface updateTransmissionLineAction {
  id: number;
  transmissionLine: TransmissionLine;
}

const TransmissionLinesSlice = createSlice({
  name: "transmissionLines",
  initialState: {
    transmissionLines: [],
  } as TransmissionLineState,
  reducers: {
    addTransmissionLine: (
      state,
      { payload }: PayloadAction<TransmissionLine>
    ) => {
      state.transmissionLines.push(payload);
    },
    updateTransmissionLine: (
      state,
      { payload }: PayloadAction<updateTransmissionLineAction>
    ) => {
      Object.assign(
        state.transmissionLines[payload.id],
        payload.transmissionLine
      );
    },
    removeTransmissionLine: (state, { payload }: PayloadAction<number>) => {
      state.transmissionLines.splice(payload, 1);
    },
  },
});

export const {
  addTransmissionLine,
  removeTransmissionLine,
  updateTransmissionLine,
} = TransmissionLinesSlice.actions;

export default TransmissionLinesSlice.reducer;
