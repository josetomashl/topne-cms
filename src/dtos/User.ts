export interface UserKV {
  id: string;
  full_name: string;
}

export interface UserList extends UserKV {
  email: string;
  updatedAt: string;
}

export interface UserItem extends UserList {
  avatar: string | null;
  name: string;
  surname: string;
  isActive: boolean;
  createdAt: string;
}
