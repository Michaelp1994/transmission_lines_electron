/// <reference types="redux" />

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// interface TransmissionLineState {
//     transmissionLines: TransmissionLine[];
// }

type TransmissionLineState = TransmissionLine[];

interface UpdateTransmissionLineAction {
    id: string;
    transmissionLine: TransmissionLineInput;
}

const TransmissionLinesSlice = createSlice({
    name: "transmissionLines",
    initialState: [] as TransmissionLineState,
    reducers: {
        importTransmissionLines: (
            state,
            { payload }: PayloadAction<TransmissionLine[]>
        ) => {
            state.splice(0, Infinity);
            payload.forEach((transmissionLine) => state.push(transmissionLine));
        },
        addTransmissionLine: (
            state,
            { payload }: PayloadAction<TransmissionLineInput>
        ) => {
            const newTransmissionLine = {
                ...payload,
                id: uuidv4(),
            };
            state.push(newTransmissionLine);
        },
        updateTransmissionLine: (
            state,
            { payload }: PayloadAction<UpdateTransmissionLineAction>
        ) => {
            const transmissionLineOrUndefined = state.find(
                (transmissionLine) => transmissionLine.id === payload.id
            );
            if (!transmissionLineOrUndefined) {
                throw Error("can't find source");
            }
            Object.assign(
                transmissionLineOrUndefined,
                payload.transmissionLine
            );
        },
        removeTransmissionLine: (state, { payload }: PayloadAction<string>) => {
            const index = state.findIndex(
                (transmissionLine) => transmissionLine.id === payload
            );
            if (index === -1) {
                throw Error("can't find source");
            }
            state.splice(index, 1);
        },
    },
});

export const {
    addTransmissionLine,
    importTransmissionLines,
    removeTransmissionLine,
    updateTransmissionLine,
} = TransmissionLinesSlice.actions;

export default TransmissionLinesSlice.reducer;
