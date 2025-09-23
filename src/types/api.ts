// Core API response types for The Cat API

// Base Image type
export interface BaseImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

// Weight type
export interface Weight {
  imperial: string;
  metric: string;
}

// Cat
export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: [];
}

// Breed
export interface Breed {
  id: string;
  name: string;
  description?: string;
  temperament?: string;
  origin?: string;
  life_span?: string;
  weight?: Weight;
  image?: BaseImage;
}

// Favorite Item
export interface FavoriteItem {
  id: number;
  image_id: string;
  sub_id?: string;
  created_at: string;
  image?: BaseImage;
}