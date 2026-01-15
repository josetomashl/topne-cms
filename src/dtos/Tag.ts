import type { PictogramItem } from './Pictogram';

export interface TagKV {
  id: string;
  name: string;
}

export interface TagList extends TagKV {
  description: string;
}

export interface TagItem extends TagList {
  pictograms: PictogramItem[];
}

export interface CreateTagDto {
  name: string;
  description?: string;
}
export interface UpdateTagDto {
  name: string;
  description?: string;
}
