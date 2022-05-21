import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Product List",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/add-product",
      name: "Product Add",
      component: () => import("../views/AddView.vue"),
    },
  ],
});

export default router;
