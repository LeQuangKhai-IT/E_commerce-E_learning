import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  msg: string | null;
  statusCode: number | null;
  _id: string | null;
  email: string | null;
  fname: string | null;
  lname: string | null;
  avatar: string | null;
  headline: string | null;
  role: "admin" | "author" | "number";
  website: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  msg: null,
  refreshToken: null,
  statusCode: null,
  _id: null,
  email: null,
  fname: null,
  lname: null,
  avatar: null,
  headline: null,
  role: "number",
  website: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  `${process.env.CLIENT_URL}/sign-in`,
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/auth/login`,
        credentials
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  `${process.env.CLIENT_URL}/sign-up`,
  async (
    informations: {
      email: string;
      password: string;
      fname: string;
      lname: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/auth/register`,
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
        `${process.env.SERVER_URL}/auth/refresh-token`,
        { token: refreshToken }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  `${process.env.CLIENT_URL}/forgot-assword`,
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/auth/password-reset`,
        { email: email }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  `${process.env.CLIENT_URL}/reset-pssword`,
  async (
    informations: { code: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/auth/password-reset/${informations.code}`,
        { password: informations.password }
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
        state.accessToken = action.payload.accessToken
          ? action.payload.accessToken
          : null;
        state.refreshToken = action.payload.refreshToken
          ? action.payload.refreshToken
          : null;
        state.statusCode = action.payload.status ? action.payload.status : null;
        state._id = action.payload.account ? action.payload.account._id : null;
        state.email = action.payload.account
          ? action.payload.account.email
          : null;
        state.fname = action.payload.account
          ? action.payload.account.fname
          : null;
        state.lname = action.payload.account
          ? action.payload.account.lname
          : null;
        state.headline = action.payload.account
          ? action.payload.account.headline
          : null;
        state.avatar = action.payload.account
          ? action.payload.account.avatar
          : null;
        state.website = action.payload.account
          ? action.payload.account.website
          : null;
        state.role = action.payload.account
          ? action.payload.account.role
          : null;
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
        state.statusCode = action.payload.status ? action.payload.status : null;
        state._id = action.payload.account ? action.payload.account._id : null;
        state.email = action.payload.account
          ? action.payload.account.email
          : null;
        state.fname = action.payload.account
          ? action.payload.account.fname
          : null;
        state.lname = action.payload.account
          ? action.payload.account.lname
          : null;
        state.headline = action.payload.account
          ? action.payload.account.headline
          : null;
        state.avatar = action.payload.account
          ? action.payload.account.avatar
          : null;
        state.website = action.payload.account
          ? action.payload.account.website
          : null;
        state.role = action.payload.account
          ? action.payload.account.role
          : null;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statusCode = action.payload.status ? action.payload.status : null;
        state.msg = action.payload.msg;
      })
      .addCase(forgotPassword.rejected, (state, action: any) => {
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
