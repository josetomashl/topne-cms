import type { ReviewKV } from './Review';

export interface CategoryKV {
  id: string;
  name: string;
}

export interface CategoryList extends CategoryKV {
  description: string;
}

export interface CategoryItem extends CategoryList {
  reviews: ReviewKV[];
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}
export interface UpdateCategoryDto {
  name: string;
  description?: string;
}
