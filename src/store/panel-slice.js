import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_EVENTS } from "./dummy-events";

const panelSlice = createSlice({
    name: 'panel',
    initialState: {
        eventsToShow: [],
        clickedDate: null,
        clickedMonth: null,
        clickedId: null
    },
    reducers: {
        setDayAcitivies(state, action) {
            let tmp = [];
            const cb = (param)=>{
                return DUMMY_EVENTS.filter(element => element.id === param);
            };

            action.payload.forEach(element => {
                tmp.push(cb(element));
            })

            state.eventsToShow=tmp;
        },
        setClickedDate(state, action) {
            state.clickedDate = action.payload[0];
            state.clickedMonth = action.payload[1];
        },
        setClickedId(state, action) {
            state.clickedId = action.payload;
        },
        removeEvent(state, action) {
            state.eventsToShow = state.eventsToShow.filter(el => el[0].id !== action.payload);
        }
    }
});

export const panelActions = panelSlice.actions;

export default panelSlice;