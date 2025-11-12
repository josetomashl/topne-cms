import type { PictogramKV } from './Pictogram';
import type { ReviewKV } from './Review';

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
  pictograms: PictogramKV[];
  reviews: ReviewKV[];
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
