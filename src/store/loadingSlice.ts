import { createSlice } from '@reduxjs/toolkit';
import type { LoadingState } from '@types';

const initialState: LoadingState = {
    isLoading: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;