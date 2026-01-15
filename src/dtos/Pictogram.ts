import type { TagKV } from './Tag';
import type { UserItem } from './User';

export interface PictogramKV {
  id: string;
  title: string;
}

export interface PictogramList extends PictogramKV {
  description: string;
  isPublished: boolean;
  tags?: TagKV[];
  author: UserItem;
  updatedAt: string;
}

export interface PictogramItem extends PictogramList {
  url: string;
  createdAt: string;
}

export interface CreatePictogramDto {
  title: string;
  description: string;
  isPublished: boolean;
}
export interface UpdatePictogramDto {
  title: string;
  description: string;
  isPublished: boolean;
}

export interface AddTagsDto {
  tagsId: string[];
}
