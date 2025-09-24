import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerSlice';
import loadingReducer from './loadingSlice';
import modalContentReducer from './modalContentSlice';
import sharedUrlReducer from './sharedUrlSlice';


export const store = configureStore({
  reducer: {
   header: headerReducer,
   loading: loadingReducer,
   sharedUrl: sharedUrlReducer,
   modalContent: modalContentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;