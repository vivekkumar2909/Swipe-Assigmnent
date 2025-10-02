import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
    name: "candidates",
    initialState: {
        list: [], // all candidates
        current: null, // current interviewee
    },
    reducers: {
        setCurrentCandidate: (state, action) => {
            state.current = action.payload;
        },
        updateCurrentChat: (state, action) => {
            if (state.current) {
                state.current.chat.push(action.payload);
            }
        },
        finishInterview: (state, action) => {
            if (state.current) {
                state.list.push(state.current);
                state.current = null;
            }
        },
    },
});

export const {
    setCurrentCandidate,
    updateCurrentChat,
    finishInterview,
} = candidateSlice.actions;

export default candidateSlice.reducer;
