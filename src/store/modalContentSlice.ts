import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModalContentState, BreedContent, CatContent } from '@types';

const initialState: ModalContentState = {
    breedContent: null,
    catContent: null,
    currentView: 'breed',
};

const modalContentSlice = createSlice({
    name: 'modalContent',
    initialState,
    reducers: {
        setBreedContent: (state, action: PayloadAction<BreedContent>) => {
            state.breedContent = action.payload;
            state.currentView = 'breed';
        },
        setCatContent: (state, action: PayloadAction<CatContent>) => {
            state.catContent = action.payload;
            state.currentView = 'cat';
        },
        switchToBreedView: (state) => {
            state.currentView = 'breed';
        },
        switchToCatView: (state) => {
            state.currentView = 'cat';
        },
        clearModalContent: () => {
            return initialState;
        },
    },
});

export const { 
    setBreedContent, 
    setCatContent, 
    switchToBreedView, 
    switchToCatView, 
    clearModalContent 
} = modalContentSlice.actions;

export default modalContentSlice.reducer;