import { storeToRefs } from 'pinia';
import useApi from 'src/composables/useApi';
import { useAuthStore } from 'src/stores/auth.store';
import type { ForgotPasswordDto } from 'src/types/dto/ForgotPassword.dto';
import type { LoginDto } from 'src/types/dto/Login.dto';
import type { RegisterDto } from 'src/types/dto/Register.dto';
import type { UpdatePasswordDto } from 'src/types/dto/UpdatedPassword.dto';
import type { UserDto } from 'src/types/dto/User.dto';
import type { UserType } from 'src/types/User.type';

export default function useAuthService() {
  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);

  const login = async (payload: LoginDto): Promise<boolean> => {
    if (isLoggedIn.value) return true;

    const { post } = useApi('/login');
    const { data } = await post<{ data: { user: UserType; token: string } }>(payload);
    authStore.authenticate(data.user, data.token);

    return true;
  };

  const me = async (token: string): Promise<void> => {
    const { api } = useApi('user');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await api.get('user').then((res) => res.data);
    authStore.authenticate(data.user, data.token);
  };

  const logout = async (): Promise<void> => {
    const { post } = useApi('logout');
    await post<void>('');
    authStore.logout();
  };

  const verifyEmail = async (url: string) => {
    url = url.replace(process.env.API_URL as string, '');
    const { get } = useApi(url);
    return await get();
  };

  const register = async (payload: RegisterDto) => {
    const { post } = useApi('/register');
    const { data } = await post<{ data: { user: UserType; token: string } }>(payload);
    authStore.authenticate(data.user, data.token);
  };

  const resendVerification = () => {
    const { post } = useApi('email/verification-notification');
    return post('');
  };

  const forgotPassword = (payload: ForgotPasswordDto) => {
    const { post } = useApi('forgot-password');
    return post(payload);
  };

  const updateUser = (uuid: string, payload: UserDto) => {
    const { put } = useApi('users');
    return put<UserType>(uuid, payload);
  };

  const updatePassword = (uuid: string, payload: UpdatePasswordDto) => {
    const { api } = useApi('users');
    return api.put<UserType>(`users/${uuid}/password`, payload);
  };

  const remove = (uuid: string) => {
    const { remove } = useApi('users');
    return remove<any>(uuid);
  };

  return {
    login,
    logout,
    me,
    verifyEmail,
    register,
    resendVerification,
    forgotPassword,
    updateUser,
    updatePassword,
    remove,
  };
}
