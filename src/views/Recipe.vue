<template>
  <div class="recipe-container p-6">
    <!-- Título -->
    <h1 class="text-2xl font-bold mb-4">{{ recipe.title }}</h1>

    <!-- Imagen -->
    <img
      :src="recipe.image"
      :alt="recipe.title"
      class="w-full h-auto rounded-lg mb-4" />

    <!-- Resumen -->
    <div
      class="recipe-summary text-gray-700 mb-4"
      v-html="recipe.summary"></div>

    <!-- Detalles -->
    <ul class="recipe-details mb-4">
      <li>
        <strong>Tiempo de preparación:</strong>
        {{ recipe.readyInMinutes }} minutos
      </li>
      <li><strong>Porciones:</strong> {{ recipe.servings }}</li>
      <li>
        <strong>Dieta:</strong> {{ recipe.diets.join(", ") || "Ninguna" }}
      </li>
      <li><strong>Puntuación:</strong> {{ recipe.spoonacularScore }}</li>
    </ul>

    <!-- Enlace a la receta original -->
    <a
      :href="recipe.sourceUrl"
      target="_blank"
      class="text-blue-500 hover:underline">
      Ver receta original
    </a>
  </div>
</template>

<script>
import { useRecipeStore } from "../stores/useRecipeStore.js";

export default {
  computed: {
    recipe() {
      const recipeStore = useRecipeStore();
      return recipeStore.currentRecipe;
    },
  },
};
</script>
