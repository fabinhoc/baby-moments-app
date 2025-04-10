import useApi from 'src/composables/useApi';
import type { PlanType } from 'src/types/Plan.type';

export default function usePlanService() {
  const { get, post, put, all, remove, findById } = useApi('plans');

  const subscribe = (plan: PlanType) => {
    return post<PlanType>(`plans/subscribe/${plan.id}`);
  };

  return {
    all,
    get,
    post,
    put,
    remove,
    findById,
    subscribe,
  };
}
