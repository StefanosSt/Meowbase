import type { BreedData } from './api';
import type { ModalDetails } from './components';

// Header state types
export interface HeaderState {
  title: string;
  description?: string;
}

// Loading state types
export interface LoadingState {
  isLoading: boolean;
}

// Modal content state types
export interface BreedContent {
  currentBreedCats: string[];
  breedData?: BreedData;
}

export interface CatContent {
  catDetails: ModalDetails;
}

export interface ModalContentState {
  breedContent: BreedContent | null;
  catContent: CatContent | null;
  currentView: 'breed' | 'cat' | null;
}