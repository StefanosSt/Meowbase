import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
};

const favoritesCounterSlice = createSlice({
    name: 'favoritesCounter',
    initialState,
    reducers: {
        totalCount: (state, action) => {
            state.count = action.payload;
        },
    },
});

export const { totalCount } = favoritesCounterSlice.actions;
export default favoritesCounterSlice.reducer;