import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
    name: 'date',
    initialState: {
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    },
    reducers: {
        increaseDate(state) {
            if(state.month === 11) {
                ++state.year;
                state.month = 0;
                return;
            }
            ++state.month;
        },
        decreaseDate(state) {
            if(state.month === 0) {
                --state.year;
                state.month = 11;
                return;
            }
            --state.month;
        },
        setToday(state) {
            let tmp = new Date();
            state.month = tmp.getMonth();
            state.year = tmp.getFullYear();
        }
    }
});

export const dateActions = dateSlice.actions; 

export default dateSlice;