import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    allJobs: null,
    jobsByRecruiter: null,
    savedJobs: null
};

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setLoading(state, action) { 
            state.loading = action.payload;
        },
        setJobsByRecruiter(state, action) {
            state.jobsByRecruiter = action.payload;
        },
        setAllJobs(state, action) {
            state.allJobs = action.payload;
        },
        setSavedJobs(state, action) {
            state.savedJobs = action.payload;
        },
    },
});

export const { setLoading, setJobsByRecruiter, setAllJobs, setSavedJobs } = jobSlice.actions;

export default jobSlice.reducer;
