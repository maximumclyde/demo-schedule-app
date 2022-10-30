import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_LECTURE_INFORMATION } from "./dummy-events";

const lectureSlice = createSlice({
    name: 'lecture',
    initialState: DUMMY_LECTURE_INFORMATION,
    reducers: {
        addLecture(state, action) {
            state.push(action.payload);
        },
        removeLecture(state, action) {
            return state.filter(event => event.id !== action.payload);
        }

    }
});

export const lectureActions = lectureSlice.actions;

export default lectureSlice;