import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_PROFESSORS } from "./dummy-events";

const professorSlice = createSlice({
    name: 'professor',
    initialState: DUMMY_PROFESSORS,
    reducers: {
        addMeeting(state, action) {
            state.push(action.payload);
        },
        removeMeeting(state, action) {
            return state.filter(event => event.id !== action.payload);
        }

    }
});

export const professorActions = professorSlice.actions;

export default professorSlice;