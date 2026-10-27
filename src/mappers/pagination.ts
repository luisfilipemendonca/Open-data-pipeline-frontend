export const mapPaginationResponse = (pagination: PaginationResponse): Pagination => {
  return {
    page: pagination.page,
    pageSize: pagination.page_size,
    totalPages: pagination.total_pages,
    total: pagination.total,
    hasNextPage: pagination.has_next_page,
  };
};
