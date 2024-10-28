"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskProps } from '../../../types/interfaces/calendar.interface';

interface TaskDetailDialogStatus {
  task?: TaskProps;
  isDialogOpened?: boolean;
  date?: string;
}

export const taskDetailDialogSlice = createSlice({
  name: "taskDetailDialog",
  initialState: {
    task: {} as TaskProps,
    date: new Date().toISOString(),
    isDialogOpened: false,
  },
  reducers: {
    setDialogState: (state: TaskDetailDialogStatus, action: PayloadAction<TaskDetailDialogStatus>) => {
      state.task = action.payload.task;
      state.isDialogOpened = action.payload.isDialogOpened;
      state.date = action.payload.date;
    },
  }
})

export const { setDialogState } = taskDetailDialogSlice.actions;
export default taskDetailDialogSlice.reducer;