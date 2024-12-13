<template>
  <div class="container flex flex-col items-start p-6 rounded-[18px]">
    <div class="p-4">
      <h3 class="text-sm font-semibold opacity-60">Today's recipe</h3>
    </div>
    <div
      class="flex w-full h-[219px] items-center rounded-[18px] overflow-hidden">
      <img
        src="src/assets/dummy-recipe.png"
        alt="Delicious waffle with fruits"
        class="w-full h-auto object-cover" />
    </div>
  </div>
</template>

<script>
import { searchRecipes, getRecipeDetails } from "/services/api.js";
import { useSearchStore } from "src/stores/useSearchStore.js";

export default {
  name: "CardRecipe",
  data() {
    return {
      recipe: null, // Almacena la receta seleccionada
    };
  },
  computed: {
    spoonacularLabels() {
      const searchStore = useSearchStore();
      return searchStore.spoonacularLabels || [];
    },
  },
  async mounted() {
    // Buscar una receta
    try {
      console.log("Etiquetas de Spoonacular:", this.spoonacularLabels);

      const results = await searchRecipes(
        this.spoonacularLabels[0] || "Smoothie",
        { number: 1 }
      );
      if (results.length > 0) {
        this.recipe = await getRecipeDetails(results[0].id);
        console.log("Detalles de la receta seleccionada:", this.recipe);
      } else {
        console.error("No se encontraron recetas.");
      }
    } catch (error) {
      console.error("Error en la llamada:", error);
    }
  },
};
</script>

<style></style>
