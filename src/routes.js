import { createWebHashHistory, createRouter } from "vue-router";
import { useCycleStore } from "./stores/useCycleStore"; // Import cycle store

import Home from "./views/Home.vue";
import Recipe from "src/views/Recipe.vue";
import Onboarding from "src/views/Onboarding.vue";

const routes = [
  {
    path: "/onboarding",
    name: "Onboarding",
    component: Onboarding,
  },
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
  routes,
});

// Navigation Guard to check onboarding completion
router.beforeEach((to, from, next) => {
  const cycleStore = useCycleStore();

  // If onboarding is not complete, redirect to onboarding unless already on the onboarding route
  if (!cycleStore.isOnboardingComplete && to.name !== "Onboarding") {
    next({ name: "Onboarding" });
  } else {
    next(); // Allow navigation
  }
});

export default router;
