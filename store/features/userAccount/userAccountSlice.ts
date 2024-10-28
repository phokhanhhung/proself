"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAccountStatus {
  isLoggedIn?: boolean;
}

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    getLoggedInStatus: (state: UserAccountStatus, action: PayloadAction<UserAccountStatus>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  }
})

export const { getLoggedInStatus } = userAccountSlice.actions;
export default userAccountSlice.reducer;