import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  error: false,
  isSuccess: false,
  loading: false,
  message: '',
}

// Register new  user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAP) => {
    console.log(user)
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAP) => {
  console.log(user)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default authSlice.reducer
