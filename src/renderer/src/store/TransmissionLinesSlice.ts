import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TransmissionLineState {
  transmissionLines: TransmissionLineInput[];
}

interface updateTransmissionLineAction {
  id: number;
  transmissionLine: TransmissionLineInput;
}

const TransmissionLinesSlice = createSlice({
  name: "transmissionLines",
  initialState: {
    transmissionLines: [],
  } as TransmissionLineState,
  reducers: {
    addTransmissionLine: (
      state,
      { payload }: PayloadAction<TransmissionLineInput>
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
