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
  url: string;
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

// Breed Data
export interface BreedData {
  weight: Weight;
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  hypoallergenic: number;
}