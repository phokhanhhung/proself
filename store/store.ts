'use client'
import { configureStore } from '@reduxjs/toolkit';
import taskDetailDialogReducer from './features/taskDetailDialog/taskDetailDialogSlice';
import loginDialogReducer from './features/loginDialog/loginDialogSlice';
import userAccountReducer from './features/userAccount/userAccountSlice';

const store = configureStore({
  reducer: {
    taskDetailDialog: taskDetailDialogReducer,
    loginDialog: loginDialogReducer,
    userAccount: userAccountReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;

export default store;