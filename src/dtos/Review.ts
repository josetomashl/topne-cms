import type { CategoryKV } from './Category';
import type { UserItem } from './User';

export interface ReviewKV {
  id: string;
  title: string;
}

export interface ReviewList extends ReviewKV {
  content: string;
  isPublished: boolean;
  author: UserItem;
  categories: CategoryKV[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  title: string;
  content: string;
  isPublished: boolean;
}
export interface UpdateReviewDto {
  title: string;
  content: string;
  isPublished: boolean;
}
