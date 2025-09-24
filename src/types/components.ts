import type { ReactNode, ElementType } from 'react';
import type { BaseImage, BreedData, Weight } from './api';

// Header types
export interface NavigationItem {
  href: string;
  title: string;
}

// Card component types
export interface CatCardProps {
  id: string;
  imageUrl: string;
  alt?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
  className?: string;
  openModal?: () => void;
}

// Favorite button types
export interface FavoriteBtnProps {
    imageId: string;
    className?: string;
    title?: string;
    disabled?: boolean;
}

// Grid layout types
export interface GridProps {
  children: ReactNode;
  columns?: number;
  gap?: string;
  className?: string;
  as?: ElementType;
};

// Breed card types
export interface BreedCardProps {
  id: string;
  name: string;
  description?: string;
  temperament?: string;
  origin?: string;
  lifeSpan?: string;
  image?: BaseImage;
  onClick?: () => void;
}

// Filters types
export interface FiltersProps {
    hasBreeds: number;
    onChange: (value: number) => void;
}

// Grid skeleton types
export interface GridSkeletonProps {
  type?: 'cat' | 'breed';
  count?: number;
  columns?: number;
  gap?: string;
  className?: string;
}

// Favorite button types
export interface FavoriteBtnProps {
    imageId: string;
    className?: string;
    title?: string;
    disabled?: boolean;
}

// Modal component types
export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  orientation?: string;
  catId?: string | number;
}

// Modal content interface that can handle Cat, Breed, or custom modal data
export interface ModalDetails {
  id: string;
  url?: string;
  width?: number;
  height?: number;
  breeds?: BreedData[];
  name?: string;
  description?: string;
  temperament?: string;
  origin?: string;
  life_span?: string;
  weight?: Weight;
  image?: BaseImage;
  country_code?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  indoor?: number;
  lap?: number;
  hypoallergenic?: number;
  hairless?: number;
  rex?: number;
  natural?: number;
  rare?: number;
  experimental?: number;
  suppressed_tail?: number;
  short_legs?: number;
}

export interface ModalContentProps {
  content: ModalDetails;
  currentBreedCats?: string[];
  hasBreedDetails?: boolean;
}