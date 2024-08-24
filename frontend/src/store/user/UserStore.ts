import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../service/user/UserService";
import { User } from "../../types/User";

export class UserStore {
  private readonly userService = new UserService();

  register = createAsyncThunk(
    "auth/register",
    async (user: User.Add, thunkAPI) => {
      try {
        await this.userService.register(user);
      } catch (error: any) {
        const message =
          (error.response && error.response.data) ||
          error.toString() ||
          error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  login = createAsyncThunk("auth/login", async (user: User.Login, thunkAPI) => {
    try {
      return await this.userService.login(user);
    } catch (error: any) {
      const message =
        (error.response && error.response.data) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  });

  logout = createAsyncThunk("auth/logout", async () => {
    await this.userService.logout();
  });

  edit = createAsyncThunk("auth/edit", async (user: User.Entity, thunkAPI) => {
    try {
      return await this.userService.updateUser(user);
    } catch (error: any) {
      const message =
        (error.response && error.response.data) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  });

  getUser = createAsyncThunk("auth/user", async (_, thunkAPI) => {
    try {
      return await this.userService.user();
    } catch (error: any) {
      const message =
        (error.response && error.response.data) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  });
}

export const userStore = new UserStore();
