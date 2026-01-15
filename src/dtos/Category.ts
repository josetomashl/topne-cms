import { ReviewList } from './Review';

export interface CategoryKV {
  id: string;
  name: string;
}

export interface CategoryList extends CategoryKV {
  description: string;
}

export interface CategoryItem extends CategoryList {
  reviews: ReviewList[];
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}
export interface UpdateCategoryDto {
  name: string;
  description?: string;
}
