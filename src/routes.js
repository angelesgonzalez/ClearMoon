import { createWebHashHistory, createRouter } from "vue-router";

import Home from "./views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes, //si key & value se llaman igual, se pueden omitir
});

export default router;
