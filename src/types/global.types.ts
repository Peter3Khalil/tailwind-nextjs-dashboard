export type PaginationResult = {
  currentPage: number;
  limit: number;
  numberOfPages: number;
};
export type GetAllQueryParams = {
  page: number;
  limit: number;
  keyword?: string;
};
