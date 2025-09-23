import type { ReactNode, ElementType } from 'react';
import type { BaseImage } from './api';

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
  onClick?: () => void;
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