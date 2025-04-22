import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    appliedJobs: null,
    allApplications: null,

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
        setAllApplications(state, action) { 
            state.allApplications = action.payload;
        },
    },
});

export const { setLoading, setAppliedJobs, setAllApplications } = applicationSlice.actions;

export default applicationSlice.reducer;
