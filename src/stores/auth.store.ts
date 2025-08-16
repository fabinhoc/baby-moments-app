import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import type { UserType } from 'src/types/User.type';
import { api } from 'src/boot/axios';

const userKey: string = '@baby-moments:user';
const tokenKey: string = '@baby-moments:token';

const getInitialUser = (): UserType => {
  const user = LocalStorage.getItem(userKey);
  return user as UserType;
};

const getInitialToken = (): string => LocalStorage.getItem(tokenKey) || '';

const initialToken = getInitialToken();
if (initialToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: getInitialUser(),
    token: initialToken,
  }),
  actions: {
    authenticate(user: UserType, token: string) {
      this.user = user;
      this.token = token;
      LocalStorage.setItem(userKey, user);
      LocalStorage.setItem(tokenKey, token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout() {
      LocalStorage.remove(userKey);
      LocalStorage.remove(tokenKey);
      this.user = {} as UserType;
      this.token = '';
      delete api.defaults.headers.common['Authorization'];
    },
    setUser(user: UserType) {
      this.user = user;
      LocalStorage.setItem(userKey, user);
    },
  },
  getters: {
    isLoggedIn: (state) => (state.token === '' ? false : true),
    isEmailVerified: (state) => !!state.user?.email_verified_at,
    isSubscribed: (state) => state.user?.subscription.stripe_status === 'active',
  },
});
