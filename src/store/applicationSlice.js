import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    appliedJobs: null
};

export const applicationSlice = createSlice({
    name: 'appliation',
    initialState,
    reducers: {
        setLoading(state, action) { 
            state.loading = action.payload;
        },
        setAppliedJobs(state, action) { 
            state.appliedJobs = action.payload;
        },
    },
});

export const { setLoading, setAppliedJobs } = applicationSlice.actions;

export default applicationSlice.reducer;
