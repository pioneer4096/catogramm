import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'

const routes = [
  {
    path: "/auth",
    component: () => import("../layouts/LoginLayout.vue"),
    children: [
      {
        path: "register",
        component: () => import("../views/RegisterPage.vue"),
      },
      { path: "login", component: () => import("../views/LoginPage.vue") },
    ],
  },
  {
    path: "/",
    name: "home",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/IndexPage.vue"),
        meta: {
          authRequired: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.meta.authRequired;
  const loggedIn = store.getters.isLoggedIn

  if (authRequired && !loggedIn) {
    console.log("authRequired but not authorized and to = ", to);
    return next("/auth/login");
  }

  next();
});

export default router;
