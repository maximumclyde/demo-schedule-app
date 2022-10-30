import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_EVENTS } from "./dummy-events";

const eventSlice = createSlice({
    name: 'event',
    initialState: DUMMY_EVENTS,
    reducers: {
        addEvent(state, action) {
            state.push(action.payload);
        },
        removeEvent(state, action) {
            return state.filter(event => event.id !== action.payload);
        }
    }
});

export const eventActions = eventSlice.actions;

export default eventSlice;
