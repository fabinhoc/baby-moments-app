import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      {
        path: '/timelines',
        name: 'list-timeline',
        component: () => import('pages/timeline/IndexPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'social/callback/:token',
        name: 'social-callback',
        component: () => import('pages/auth/SocialCallbackPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'email-verification',
        name: 'email-verification',
        component: () => import('pages/auth/EmailVerificationPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'verify',
        name: 'verify',
        component: () => import('pages/auth/VerifyPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('pages/auth/ForgotPasswordPage.vue'),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
];

export default routes;
