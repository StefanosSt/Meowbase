import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SharedUrlState {
  currentUrl: string;
}

const initialState: SharedUrlState = {
  currentUrl: '',
};

const sharedUrlSlice = createSlice({
  name: 'sharedUrl',
  initialState,
  reducers: {
    setSharedUrl: (state, action: PayloadAction<string>) => {
      state.currentUrl = action.payload;
    },
    clearSharedUrl: (state) => {
      state.currentUrl = '';
    },
  },
});

export const { setSharedUrl, clearSharedUrl } = sharedUrlSlice.actions;
export default sharedUrlSlice.reducer;
