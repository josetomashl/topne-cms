import type { PictogramItem } from './Pictogram';
import type { ReviewList } from './Review';

export interface UserKV {
  id: string;
  name: string;
}

export interface UserList extends UserKV {
  surname: string;
  email: string;
  avatar: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserItem extends UserList {
  pictograms: PictogramItem[];
  reviews: ReviewList[];
}

export interface CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}
export interface UpdateUserDto {
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
}
export interface UpdateUserPasswordDto {
  password: string;
}
