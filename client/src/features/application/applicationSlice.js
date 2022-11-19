import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUp: false,
  signIn: false,
  error: null,
  token: localStorage.getItem("token"),
};

export const createUser = createAsyncThunk(
  "users/create",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();
      console.log(json);
      return json;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      localStorage.setItem("token", json);
      return json;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const applicationSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        return { ...state, signUp: true, error: null };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        return { ...state, signUp: false };
      })
      .addCase(createUser.rejected, (state, action) => {
        return { ...state, signUp: false, error: action.payload };
      })
      .addCase(loginUser.pending, (state, action) => {
        return { ...state, signIn: true, error: null };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          signIn: false,
          token: action.payload,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return { ...state, signIn: false, error: action.payload };
      });
  },
});

export default applicationSlice.reducer;
