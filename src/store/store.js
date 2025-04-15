import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import themeSlice from './themeSlice'
import jobSlice from './jobSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    job: jobSlice,
  },
})