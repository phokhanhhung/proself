"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskProps } from '../../../types/interfaces/calendar.interface';

interface DialogStatus {
  task?: TaskProps;
  isDialogOpened?: boolean;
  date?: string;
}

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    task: {} as TaskProps,
    date: new Date().toISOString(),
    isDialogOpened: false,
  },
  reducers: {
    setDialogState: (state: DialogStatus, action: PayloadAction<DialogStatus>) => {
      state.task = action.payload.task;
      state.isDialogOpened = action.payload.isDialogOpened;
      state.date = action.payload.date;
    },
  }
})

export const { setDialogState } = dialogSlice.actions;
export default dialogSlice.reducer;