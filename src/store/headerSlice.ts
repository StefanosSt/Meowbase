import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { HeaderState } from '@types';

const initialState: HeaderState = {
  title: 'Meowbase',
  description: undefined
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderData: (_state, action: PayloadAction<HeaderState>) => {
      return { ...action.payload };
    },
    resetHeader: () => {
      return initialState;
    },
  },
});

export const { setHeaderData, resetHeader } = headerSlice.actions;
export default headerSlice.reducer;
