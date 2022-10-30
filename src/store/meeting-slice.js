import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_MEETING_INFORMATION } from "./dummy-events";

const meetingSlice = createSlice({
    name: 'meeting',
    initialState: DUMMY_MEETING_INFORMATION,
    reducers: {
        addMeeting(state, action) {
            state.push(action.payload);
        },
        removeMeeting(state, action) {
            return state.filter(event => event.id !== action.payload);
        }

    }
});

export const meetingsActions = meetingSlice.actions;

export default meetingSlice;