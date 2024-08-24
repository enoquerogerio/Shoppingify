import { createSlice } from "@reduxjs/toolkit";
import { UserStore } from "./UserStore";

const userStore = new UserStore();
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //User Register
    builder.addCase(userStore.register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userStore.register.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(userStore.register.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //User Login
    builder.addCase(userStore.login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userStore.login.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(userStore.login.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });


    //User Edit
    builder.addCase(userStore.edit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userStore.edit.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(userStore.edit.rejected, (state, action: any) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });

    //User Logout
    builder.addCase(userStore.logout.fulfilled, (state) => {
      state.user = null;
    });

  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
