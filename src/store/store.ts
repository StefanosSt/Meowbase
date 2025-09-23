import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerSlice';
import loadingReducer from './loadingSlice';

export const store = configureStore({
  reducer: {
   header: headerReducer,
   loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;