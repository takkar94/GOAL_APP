import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

//register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
      try {
        return await authService.register(user)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      // Using the Immer library to create a new state object
      return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder 
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;