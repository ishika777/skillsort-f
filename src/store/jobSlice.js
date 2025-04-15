import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    jobs: null,
    job: null,

};

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setLoading(state, action) { 
            state.loading = action.payload;
        },
        setJobs(state, action) {
            state.jobs = action.payload;
        },
        setJob(state, action) {
            state.job = action.payload;
        },
    },
});

export const { setLoading, setJobs, setJob } = jobSlice.actions;

export default jobSlice.reducer;
