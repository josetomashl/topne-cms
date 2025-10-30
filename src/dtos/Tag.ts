import type { PictogramKV } from './Pictogram';

export interface TagKV {
  id: string;
  name: string;
}

export interface TagList extends TagKV {
  description: string;
}

export interface TagItem extends TagList {
  pictograms: PictogramKV[];
}

export interface CreateTagDto {
  name: string;
  description?: string;
}
export interface UpdateTagDto {
  name: string;
  description?: string;
}
