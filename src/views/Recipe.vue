<template>
  <div class="recipe-container bg-[#0A0910] text-white p-20">
    <!-- Header -->
    <Header></Header>

    <!-- Content Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-20 mt-12">
      <!-- Left Column -->
      <div class="mb-12 flex justify-between items-start flex-col">
        <!-- Recipe Title and Details -->
        <div>
          <h2 class="text-sm uppercase font-bold text-gray-500 mb-2">Recipe</h2>
          <h1 class="text-5xl font-bold">{{ recipe.title }}</h1>
          <div class="flex items-center text-gray-400 space-x-6 mt-4 mb-4">
            <div class="flex items-center space-x-2">
              <span>⏱️</span>
              <span>{{ recipe.readyInMinutes }} minutes</span>
            </div>
            <div class="flex items-center space-x-2">
              <span>⚡</span>
              <span>{{ Math.round(recipe.pricePerServing) }} calories</span>
            </div>
            <div class="flex items-center space-x-2">
              <span>🍴</span>
              <span>{{ recipe.veryHealthy ? "Healthy" : "Beginner" }}</span>
            </div>
          </div>
        </div>

        <!-- Ingredients -->
        <div class="container">
          <h3 class="text-2xl font-semibold mt-4 font-exceptional p-6">
            Ingredients
          </h3>
          <div class="pl-6 pr-6 pb-6 rounded-lg grid grid-cols-2 gap-6">
            <ul class="list-disc space-y-2 pl-4 mb-4">
              <li
                v-for="(ingredient, index) in recipe.extendedIngredients.slice(
                  0,
                  Math.ceil(recipe.extendedIngredients.length / 2)
                )"
                :key="index">
                {{ ingredient.original }}
              </li>
            </ul>
            <ul class="list-disc space-y-2 pl-4">
              <li
                v-for="(ingredient, index) in recipe.extendedIngredients.slice(
                  Math.ceil(recipe.extendedIngredients.length / 2)
                )"
                :key="index">
                {{ ingredient.original }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Steps -->
        <div class="mt-6 mb-4">
          <h3 class="text-2xl font-semibold mb-4 font-exceptional">Steps</h3>
          <div class="space-y-4">
            <p
              v-for="(step, index) in recipe.analyzedInstructions?.[0]?.steps ||
              []"
              :key="index"
              class="text-gray-300 leading-relaxed">
              <span class="font-bold">Step {{ step.number }}:</span>
              {{ step.step }}
            </p>
          </div>
          <!-- Original Link -->
          <div class="mt-8">
            <a
              :href="recipe.sourceUrl"
              target="_blank"
              class="text-blue-500 hover:underline">
              View Original Recipe
            </a>
          </div>
        </div>
      </div>

      <!-- Right Column: Image -->
      <div>
        <div class="w-[576px] h-[576px] rounded-[18px] overflow-hidden">
          <img
            :src="recipe.image"
            :alt="recipe.title"
            class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRecipeStore } from "../stores/useRecipeStore.js";
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },
  computed: {
    recipe() {
      const recipeStore = useRecipeStore();
      return recipeStore.currentRecipe || {};
    },
  },
};
</script>

<style scoped>
.recipe-container {
}
</style>
