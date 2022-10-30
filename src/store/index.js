import { configureStore } from "@reduxjs/toolkit";

import eventSlice from "./event-slice";
import meetingSlice from "./meeting-slice";
import professorSlice from "./professor-slice";
import lectureSlice from "./lectures-slice";
import workerSlice from "./workers-slice";
import panelSlice from "./panel-slice";
import dateSlice from "./date-slice";

const store = configureStore({
    reducer: {
        event: eventSlice.reducer,
        meeting: meetingSlice.reducer,
        professor: professorSlice.reducer,
        lecture: lectureSlice.reducer,
        worker: workerSlice.reducer,
        panel: panelSlice.reducer,
        date: dateSlice.reducer
    }
});

export default store;