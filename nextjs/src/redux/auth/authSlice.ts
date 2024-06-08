import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  msg: string | null;
  statusCode: number | null;
  message: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  msg: null,
  refreshToken: null,
  statusCode: null,
  message: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "http://localhost:3000/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:6621/api/v1/auth/login",
        credentials
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "http://localhost:3000/register",
  async (
    informations: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:6621/api/v1/auth/register",
        informations
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:6621/api/v1/auth/refresh-token",
        { token: refreshToken }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.msg = action.payload.msg;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statusCode = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshAccessToken.rejected, (state, action: any) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
