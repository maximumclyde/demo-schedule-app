import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_WORKERS } from "./dummy-events";

const workerSlice = createSlice({
    name: 'lecture',
    initialState: DUMMY_WORKERS,
    reducers: {
        addMeeting(state, action) {
            state.push(action.payload);
        },
        removeMeeting(state, action) {
            return state.filter(event => event.id !== action.payload);
        }

    }
});

export const workerAction = workerSlice.actions;

export default workerSlice;