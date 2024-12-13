import { createWebHashHistory, createRouter } from "vue-router";

import Home from "./views/Home.vue";
import Recipe from "src/views/Recipe.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipe/:id",
    name: "Recipe",
    component: Recipe,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes, //si key & value se llaman igual, se pueden omitir
});

export default router;
