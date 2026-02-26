export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export function paginate<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
) {
  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
