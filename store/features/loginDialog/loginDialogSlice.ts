"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskProps } from '../../../types/interfaces/calendar.interface';

interface LoginDialogStatus {
  isDialogOpened?: boolean;
}

export const loginDialogSlice = createSlice({
  name: "loginDialog",
  initialState: {
    isDialogOpened: false,
  },
  reducers: {
    setDialogState: (state: LoginDialogStatus, action: PayloadAction<LoginDialogStatus>) => {
      state.isDialogOpened = action.payload.isDialogOpened;
    },
  }
})

export const { setDialogState } = loginDialogSlice.actions;
export default loginDialogSlice.reducer;