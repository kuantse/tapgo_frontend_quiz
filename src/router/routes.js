const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("layouts/BasicLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
