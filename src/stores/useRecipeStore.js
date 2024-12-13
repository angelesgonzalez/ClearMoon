import { defineStore } from "pinia";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    currentRecipe: null,
  }),
  actions: {
    setCurrentRecipe(recipe) {
      this.currentRecipe = recipe;
    },
  },
});
