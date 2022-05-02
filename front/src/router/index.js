import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/auth',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      { path: 'register', component: () => import('../views/RegisterPage.vue') },
      { path: 'login', component: () => import('../views/LoginPage.vue') },
    ]
  },
  {
    path: "/",
    name: "home",
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../views/IndexPage.vue') },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
