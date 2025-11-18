export type Pagination<T> = {
  page: number;
  pageSize: number;
  total: number;
  items: T[];
};

export type DeleteResponse = {
  id: string;
};
