import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    candidates: [],
    currentCandidate: null,
};

const interviewSlice = createSlice({
    name: "interview",
    initialState,
    reducers: {
        addCandidate: (state, action) => {
            state.candidates.push(action.payload);
            state.currentCandidate = action.payload;
        },
        updateCandidate: (state, action) => {
            const index = state.candidates.findIndex(c => c.id === action.payload.id);
            if (index !== -1) state.candidates[index] = action.payload;
            if (state.currentCandidate?.id === action.payload.id) state.currentCandidate = action.payload;
        },
        setCurrentCandidate: (state, action) => {
            state.currentCandidate = action.payload;
        }
    },
});

export const { addCandidate, updateCandidate, setCurrentCandidate } = interviewSlice.actions;
export default interviewSlice.reducer;
