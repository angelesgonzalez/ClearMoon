<template>
  <div
    class="container flex flex-col items-start p-6 rounded-[18px] cursor-pointer h-full"
    @click="goToRecipe">
    <div class="p-4">
      <h3 class="text-sm font-semibold opacity-60">Today's recipe</h3>
      <h2
        v-if="recipe && recipe.title"
        class="text-sm font-semibold capitalize">
        {{ capitalizedTitle }}
      </h2>
    </div>

    <div
      class="flex w-full items-center rounded-[18px] overflow-hidden relative group">
      <div v-if="isLoading" class="text-center">Cargando receta...</div>
      <div v-else-if="error" class="">{{ error }}</div>

      <!-- Recipe Image -->
      <img
        v-else-if="recipe && recipe.image"
        :src="recipe.image"
        :alt="recipe.title || 'Recipe image'"
        class="w-full h-[219px] object-cover rounded-[18px] transition-opacity duration-300" />

      <!-- Default Image -->
      <img
        v-else
        src="src/assets/dummy-recipe.png"
        alt="Default recipe image"
        class="w-full h-[219px] object-cover rounded-[18px]" />

      <!-- Overlay with Text -->
      <div
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View Recipe
      </div>
    </div>
  </div>
</template>

<script>
import { searchRecipes, getRecipeDetails } from "/services/api.js";
import { useSearchStore } from "src/stores/useSearchStore.js";
import { useRecipeStore } from "../stores/useRecipeStore";

export default {
  name: "CardRecipe",
  data() {
    return {
      recipe: null, // Info de la receta
      isLoading: true,
      error: null,
    };
  },
  computed: {
    spoonacularLabels() {
      const searchStore = useSearchStore();
      return searchStore.spoonacularLabels || [];
    },

    capitalizedTitle() {
      if (this.recipe && this.recipe.title) {
        return (
          this.recipe.title.charAt(0).toUpperCase() +
          this.recipe.title.slice(1).toLowerCase()
        );
      }
      return "No Title Available";
    },
  },
  methods: {
    goToRecipe() {
      if (this.recipe && this.recipe.id) {
        const recipeStore = useRecipeStore();
        recipeStore.setCurrentRecipe(this.recipe);
        this.$router.push(`/recipe/${this.recipe.id}`);
      } else {
        console.error("Invalid recipe.");
      }
    },
  },
  async mounted() {
    const searchStore = useSearchStore();

    try {
      await searchStore.fetchModelResponse();
      await searchStore.setDefaultLabels(["Oats"]);

      const labelToSearch = this.spoonacularLabels[0] || "Oats";
      // Log para verificar qué etiqueta se usa para buscar
      console.log("LABEL (RECIPE) ", labelToSearch);

      // Searching for a recipe, it only ask for one.
      const results = await searchRecipes(labelToSearch, { number: 1 });

      if (results.length > 0) {
        this.recipe = await getRecipeDetails(results[0].id);

        // Fallback
        const defaultRecipe = {
          title: "Today's Smoothie",
          image: "src/assets/dummy-recipe.png",
        };

        this.recipe = { ...defaultRecipe, ...this.recipe };

        // console.log("Detalles de la receta seleccionada:", this.recipe);
      } else {
        this.error = "Recipe no found";
      }
    } catch (error) {
      console.error("Request Error:", error);
      this.error = "Troubles loading the recipe";
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style></style>
