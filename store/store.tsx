'use client'
import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './features/task/dialogSlice';

const store = configureStore({
  reducer: {
    dialog: dialogReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;

export default store;