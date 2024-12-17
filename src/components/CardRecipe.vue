<template>
  <div
    class="container flex flex-col items-start p-6 rounded-[18px] cursor-pointer h-full"
    @click="goToRecipe">
    <div class="p-4">
      <h3 class="text-sm font-semibold opacity-60">Today's recipe</h3>
      <h2
        v-if="recipe && recipe.title"
        class="text-sm font-semibold capitalize">
        {{ recipe.title }}
      </h2>
    </div>

    <div class="flex w-full items-center rounded-[18px] overflow-hidden">
      <div v-if="isLoading" class="text-center">Cargando receta...</div>
      <div v-else-if="error" class="">{{ error }}</div>

      <!-- Imagen de la receta -->
      <img
        v-else-if="recipe && recipe.image"
        :src="recipe.image"
        :alt="recipe.title || 'Recipe image'"
        class="w-full h-auto object-cover rounded-[18px]" />

      <!-- Imagen por defecto -->
      <img
        v-else
        src="src/assets/dummy-recipe.png"
        alt="Default recipe image"
        class="w-full h-[219px] object-cover rounded-[18px]" />
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
  },
  methods: {
    goToRecipe() {
      if (this.recipe && this.recipe.id) {
        const recipeStore = useRecipeStore();
        recipeStore.setCurrentRecipe(this.recipe);
        this.$router.push(`/recipe/${this.recipe.id}`);
      } else {
        console.error("No se puede navegar: receta inválida.");
      }
    },
  },
  async mounted() {
    const searchStore = useSearchStore();

    try {
      // Asegurarse de que las etiquetas estén disponibles
      if (!searchStore.spoonacularLabels.length) {
        searchStore.spoonacularLabels = ["Oats"]; // Etiqueta predeterminada
      }

      // console.log("Etiquetas de Spoonacular:", this.spoonacularLabels);

      // busqueda de recetas
      const results = await searchRecipes(this.spoonacularLabels[0], {
        number: 1,
      });

      if (results.length > 0) {
        // detalles de la receta
        this.recipe = await getRecipeDetails(results[0].id);

        // Fallback para propiedades faltantes
        if (this.recipe) {
          this.recipe.title = this.recipe.title || "Today's Smothie";
          this.recipe.image =
            this.recipe.image || "src/assets/dummy-recipe.png";
        }

        console.log("Detalles de la receta seleccionada:", this.recipe);
      } else {
        this.error = "No se encontraron recetas.";
      }
    } catch (error) {
      console.error("Error en la llamada:", error);
      this.error = "Hubo un problema al cargar la receta.";
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style></style>
