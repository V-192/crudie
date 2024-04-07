import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios.js"

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/api/auth/login', params)
  return data;
})

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/api/auth/getMe')
  return data;
})

const initialState = {
  status: 'loading',
  data: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    }),
    builder.addCase(fetchUserData.fulfilled,(state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    }),
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    }),
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    }),
    builder.addCase(fetchAuthMe.fulfilled,(state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    }),
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    })
  }
});

export const isAuthSelector = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;