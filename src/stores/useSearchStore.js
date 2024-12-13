import { defineStore } from "pinia";
import {
  getUnsplashLabels,
  getSpoonacularLabels,
  searchImages,
  searchRecipes,
} from "/services/api.js";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    modelResponseTitle: "",
    modelResponseBody: "",
    unsplashLabels: [],
    spoonacularLabels: [],
    image: null,
    recipe: null,
  }),
  actions: {
    // Acción para actualizar el título y el cuerpo
    updateModelResponse(title, body) {
      this.modelResponseTitle = title;
      this.modelResponseBody = body;
      console.log("El store está funcionando", this.$state); // Log del estado actualizado
    },

    // Acción para generar etiquetas, buscar imágenes y recetas
    async generateSearchData(body) {
      console.log("BODY RECIBIDO:", body); // Verifica el valor de body
      try {
        // Generar etiquetas para Unsplash
        this.unsplashLabels = await getUnsplashLabels(body);
        console.log("Etiquetas para Unsplash:", this.unsplashLabels);

        // Generar etiquetas para Spoonacular
        this.spoonacularLabels = await getSpoonacularLabels(body);
        console.log("Etiquetas para Spoonacular:", this.spoonacularLabels);

        // Buscar una imagen en Unsplash
        if (this.unsplashLabels.length > 0) {
          const images = await searchImages(this.unsplashLabels[0]);
          this.image = images.length > 0 ? images[0] : null;
        }

        // Buscar una receta en Spoonacular
        if (this.spoonacularLabels.length > 0) {
          const recipes = await searchRecipes(this.spoonacularLabels[0]);
          this.recipe = recipes.length > 0 ? recipes[0] : null;
        }
      } catch (error) {
        console.error("Error generando datos de búsqueda:", error);
      }
    },
  },
});
