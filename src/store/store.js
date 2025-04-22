import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import jobSlice from './jobSlice'
import applicationSlice from './applicationSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    application: applicationSlice,
  },
})