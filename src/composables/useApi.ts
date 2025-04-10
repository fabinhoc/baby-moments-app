import { api } from 'boot/axios';
import type { QTableProps } from 'quasar';

export default function useApi(baseUrl: string) {
  const all = <T = unknown>(): Promise<T> =>
    api.get<{ data: T }>(baseUrl).then((res) => res.data.data);

  const get = <T = unknown>(): Promise<T> => api.get<T>(baseUrl).then((res) => res.data);

  const findById = <T = unknown>(id: number | string): Promise<T> =>
    api.get<T>(`${baseUrl}/${id}`).then((res) => res.data);

  const post = <T = unknown>(payload: unknown): Promise<T> =>
    api.post<T>(baseUrl, payload).then((res) => res.data);

  const put = <T = unknown>(id: number | string, payload: unknown): Promise<T> =>
    api.put<T>(`${baseUrl}/${id}`, payload).then((res) => res.data);

  const remove = <T = unknown>(id: number | string): Promise<T> =>
    api.delete<T>(`${baseUrl}/${id}`).then((res) => res.data);

  const paginate = <T = unknown>(
    pagination: QTableProps['pagination'],
    filters?: Record<string, any>,
  ): Promise<T> => {
    const queryUrl: Record<string, any> = {
      sortBy: pagination?.sortBy ?? 'name',
      sortDesc: pagination?.descending ?? false,
      page: pagination?.page?.toString() ?? '1',
      per_page: pagination?.rowsPerPage?.toString() ?? '5',
    };

    if (filters) {
      for (const key in filters) {
        if (filters[key] !== null && filters[key] !== '') {
          queryUrl[key] = filters[key];
        }
      }
    }

    const queryString = new URLSearchParams(queryUrl).toString();
    const fullUrl = `${baseUrl}?${queryString}`;

    return api.get<T>(fullUrl).then((res) => res.data);
  };

  return {
    all,
    get,
    post,
    put,
    remove,
    paginate,
    findById,
    api,
  };
}
