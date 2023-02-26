import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path -> component
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      components: () => import("../views/home/home.vue"),
    },
    {
      path: "/favor",
      components: () => import("../views/favor/favor.vue"),
    },
    {
      path: "/order",
      components: () => import("../views/order/order.vue"),
    },
    {
      path: "/message",
      components: () => import("../views/message/message.vue"),
    },
  ],
});

export default router;
