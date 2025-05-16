import useApi from 'src/composables/useApi';
import { type MomentType } from 'src/types/Moment.type';

export default function useMomentService() {
  const { get, all, remove, findById } = useApi('moments');
  const { api } = useApi('moments');

  const post = (payload: any) => {
    return api.post<MomentType>('moments', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const put = async (id: number, payload: any) => {
    return api.post<MomentType>(`moments/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    all,
    get,
    post,
    put,
    remove,
    findById,
  };
}
