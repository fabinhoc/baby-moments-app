import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth.store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const { isLoggedIn, isEmailVerified, isSubscribed } = useAuthStore();
      if (!isLoggedIn) {
        return next({ name: 'login' });
      }

      if (
        from.name !== 'email-verification' &&
        to.name !== 'email-verification' &&
        !isEmailVerified
      ) {
        return next({ name: 'email-verification' });
      }

      const whiteListPagesTo: Array<string> = [
        'email-verification',
        'checkout',
        'received-payment',
      ];
      const whiteListPagesFrom: Array<string> = ['email-verification', 'received-payment'];

      const fromName = from.name ?? '';
      const toName = to.name ?? '';
      console.log('from:', fromName, 'to:', toName, 'isSubscribed:', isSubscribed);
      if (
        !whiteListPagesFrom.includes(fromName as string) &&
        !whiteListPagesTo.includes(toName as string) &&
        !isSubscribed
      ) {
        console.log('tinha que redirecionar para checkout ', isSubscribed);
        return next({ name: 'checkout' });
      }

      next();
    } else {
      next();
    }
  });

  return Router;
});
