import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalService from './goalService';



const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
      requestIdleCallback: (state) => initialState, // Renamed the reducer action
    }
});

// Export the renamed action
export const { reset } = goalSlice.actions;
export default goalSlice.reducer;

