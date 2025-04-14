import { storeToRefs } from 'pinia';
import useApi from 'src/composables/useApi';
import { useAuthStore } from 'src/stores/auth.store';
import type { LoginDto } from 'src/types/dto/Login.dto';
import type { UserType } from 'src/types/User.type';

export default function usePlanService() {
  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);

  const login = async (payload: LoginDto): Promise<boolean> => {
    if (isLoggedIn.value) return true;

    const { post } = useApi('/login');
    const { data } = await post<{ data: { user: UserType; token: string } }>(payload);
    authStore.authenticate(data.user, data.token);

    return true;
  };

  return {
    login,
  };
}
