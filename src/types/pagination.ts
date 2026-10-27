export type PaginationResponse = {
  page: number;
  page_size: number;
  total_pages: number;
  total: number;
  has_next_page: boolean;
};

export type Pagination = {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  hasNextPage: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationResponse;
};

export type Paginated<T> = {
  data: T[];
  pagination: Pagination;
};
